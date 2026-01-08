import { COOKIE_NAME } from "@shared/const";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import {
  createLead,
  getLeads,
  getLeadById,
  updateLeadStatus,
  getLeadStats,
  getSetting,
  upsertSetting,
  getAllSettings,
  createAnalyticsEvent,
  getAnalyticsStats,
  getAffiliatePartners,
  createAffiliateClick,
  getAffiliateStats,
} from "./db";

// Validation schemas
const leadSchema = z.object({
  email: z.string().email("Email invalide"),
  phone: z.string().min(10, "Numéro de téléphone invalide").max(20),
  montantEmprunte: z.number().positive("Montant invalide"),
  dureeAns: z.number().min(5).max(30),
  revenusNets: z.number().positive("Revenus invalides"),
  apport: z.number().min(0).optional(),
  mensualite: z.number().optional(),
  tauxUtilise: z.string().optional(),
  consentementRgpd: z.boolean(),
  apportPersonnel: z.number().optional(),
  zoneGeographique: z.string().optional(),
  typeBien: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  utmContent: z.string().optional(),
});

const analyticsEventSchema = z.object({
  eventName: z.string(),
  eventData: z.string().optional(),
  sessionId: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  referrer: z.string().optional(),
  pageUrl: z.string().optional(),
});

// Admin procedure - requires admin role
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Accès réservé aux administrateurs" });
  }
  return next({ ctx });
});

export const appRouter = router({
  system: systemRouter,
  
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // Public routes for lead capture
  leads: router({
    // Create a new lead (public - conversion form)
    create: publicProcedure
      .input(leadSchema)
      .mutation(async ({ input, ctx }) => {
        if (!input.consentementRgpd) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Le consentement RGPD est obligatoire",
          });
        }

        const userAgent = ctx.req.headers["user-agent"] || "";
        const ipAddress = ctx.req.headers["x-forwarded-for"]?.toString().split(",")[0] || 
                         ctx.req.socket?.remoteAddress || "";

        const lead = await createLead({
          ...input,
          tauxUtilise: input.tauxUtilise || null,
          apport: input.apport || 0,
          userAgent,
          ipAddress,
        });

        return { success: true, leadId: lead?.id };
      }),

    // Admin: List all leads with pagination
    list: adminProcedure
      .input(z.object({
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(100).default(20),
        status: z.enum(["new", "contacted", "qualified", "converted", "lost"]).optional(),
        search: z.string().optional(),
      }))
      .query(async ({ input }) => {
        return getLeads(input);
      }),

    // Admin: Get single lead
    get: adminProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const lead = await getLeadById(input.id);
        if (!lead) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Lead non trouvé" });
        }
        return lead;
      }),

    // Admin: Update lead status
    updateStatus: adminProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["new", "contacted", "qualified", "converted", "lost"]),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await updateLeadStatus(input.id, input.status, input.notes);
        return { success: true };
      }),

    // Admin: Get lead statistics
    stats: adminProcedure.query(async () => {
      return getLeadStats();
    }),

    // Admin: Export leads as CSV
    export: adminProcedure
      .input(z.object({
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        status: z.enum(["new", "contacted", "qualified", "converted", "lost"]).optional(),
      }))
      .query(async ({ input }) => {
        const { leads } = await getLeads({ page: 1, limit: 10000, status: input.status });
        
        // Generate CSV
        const headers = [
          "ID", "Email", "Téléphone", "Montant", "Durée", "Revenus", "Apport",
          "Mensualité", "Taux", "Status", "Source UTM", "Date création"
        ];
        
        const rows = leads.map(lead => [
          lead.id,
          lead.email,
          lead.phone,
          lead.montantEmprunte,
          lead.dureeAns,
          lead.revenusNets,
          lead.apport || 0,
          lead.mensualite || "",
          lead.tauxUtilise || "",
          lead.status,
          lead.utmSource || "",
          lead.createdAt.toISOString(),
        ]);
        
        const csv = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
        return { csv, count: leads.length };
      }),
  }),

  // Settings management (admin only)
  settings: router({
    // Get a specific setting (public for rates display)
    get: publicProcedure
      .input(z.object({ key: z.string() }))
      .query(async ({ input }) => {
        return getSetting(input.key);
      }),

    // Get all settings (admin)
    list: adminProcedure.query(async () => {
      return getAllSettings();
    }),

    // Update a setting (admin)
    update: adminProcedure
      .input(z.object({
        key: z.string(),
        value: z.string(),
        description: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        await upsertSetting(input.key, input.value, input.description, ctx.user.id);
        return { success: true };
      }),

    // Get default interest rates
    getRates: publicProcedure.query(async () => {
      const rates = await getAllSettings();
      const rateSettings = rates.filter((s: { key: string }) => s.key.startsWith("taux_"));
      
      return {
        taux_10ans: rateSettings.find((s: { key: string; value: string }) => s.key === "taux_10ans")?.value || "3.15",
        taux_15ans: rateSettings.find((s: { key: string; value: string }) => s.key === "taux_15ans")?.value || "3.35",
        taux_20ans: rateSettings.find((s: { key: string; value: string }) => s.key === "taux_20ans")?.value || "3.50",
        taux_25ans: rateSettings.find((s: { key: string; value: string }) => s.key === "taux_25ans")?.value || "3.65",
      };
    }),
  }),

  // Analytics tracking
  analytics: router({
    // Track an event (public)
    track: publicProcedure
      .input(analyticsEventSchema)
      .mutation(async ({ input, ctx }) => {
        const userAgent = ctx.req.headers["user-agent"] || "";
        const ipAddress = ctx.req.headers["x-forwarded-for"]?.toString().split(",")[0] || 
                         ctx.req.socket?.remoteAddress || "";

        await createAnalyticsEvent({
          ...input,
          userAgent,
          ipAddress,
        });

        return { success: true };
      }),

    // Admin: Get analytics stats
    stats: adminProcedure
      .input(z.object({
        startDate: z.string().optional(),
        endDate: z.string().optional(),
      }))
      .query(async ({ input }) => {
        return getAnalyticsStats(input.startDate, input.endDate);
      }),
  }),

  // Affiliate management
  affiliates: router({
    // Get active partners (public - for display)
    list: publicProcedure.query(async () => {
      return getAffiliatePartners();
    }),

    // Track affiliate click (public)
    trackClick: publicProcedure
      .input(z.object({
        partnerId: z.number(),
        leadId: z.number().optional(),
        sessionId: z.string().optional(),
        utmSource: z.string().optional(),
        utmMedium: z.string().optional(),
        utmCampaign: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const userAgent = ctx.req.headers["user-agent"] || "";
        const ipAddress = ctx.req.headers["x-forwarded-for"]?.toString().split(",")[0] || 
                         ctx.req.socket?.remoteAddress || "";

        await createAffiliateClick({
          ...input,
          userAgent,
          ipAddress,
        });

        return { success: true };
      }),

    // Admin: Get affiliate stats
    stats: adminProcedure.query(async () => {
      return getAffiliateStats();
    }),
  }),
});

export type AppRouter = typeof appRouter;
