import { eq, desc, sql, and, gte, lte, like, or } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, 
  users, 
  leads, 
  InsertLead, 
  Lead,
  settings,
  InsertSetting,
  Setting,
  analyticsEvents,
  InsertAnalyticsEvent,
  affiliatePartners,
  affiliateClicks,
  InsertAffiliateClick,
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ============================================
// USER FUNCTIONS
// ============================================

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ============================================
// LEAD FUNCTIONS
// ============================================

export async function createLead(data: Omit<InsertLead, "id" | "createdAt" | "updatedAt" | "status">): Promise<Lead | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create lead: database not available");
    return null;
  }

  try {
    const result = await db.insert(leads).values({
      ...data,
      status: "new",
    });
    
    const insertId = result[0].insertId;
    const newLead = await db.select().from(leads).where(eq(leads.id, insertId)).limit(1);
    
return newLead[0] || null;
  } catch (error) {
    console.error("[Database] Failed to create lead:", error);
    throw error;
  }
}

export async function getLeads(options: {
  page: number;
  limit: number;
  status?: "new" | "contacted" | "qualified" | "converted" | "lost";
  search?: string;
}): Promise<{ leads: Lead[]; total: number }> {
  const db = await getDb();
  if (!db) {
    return { leads: [], total: 0 };
  }

  const { page, limit, status, search } = options;
  const offset = (page - 1) * limit;

  try {
    let whereConditions = [];
    
    if (status) {
      whereConditions.push(eq(leads.status, status));
    }
    
    if (search) {
      whereConditions.push(
        or(
          like(leads.email, `%${search}%`),
          like(leads.phone, `%${search}%`)
        )
      );
    }

    const whereClause = whereConditions.length > 0 ? and(...whereConditions) : undefined;

    const [leadsResult, countResult] = await Promise.all([
      db.select()
        .from(leads)
        .where(whereClause)
        .orderBy(desc(leads.createdAt))
        .limit(limit)
        .offset(offset),
      db.select({ count: sql<number>`count(*)` })
        .from(leads)
        .where(whereClause),
    ]);

    return {
      leads: leadsResult,
      total: Number(countResult[0]?.count || 0),
    };
  } catch (error) {
    console.error("[Database] Failed to get leads:", error);
    return { leads: [], total: 0 };
  }
}

export async function getLeadById(id: number): Promise<Lead | null> {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db.select().from(leads).where(eq(leads.id, id)).limit(1);
    return result[0] || null;
  } catch (error) {
    console.error("[Database] Failed to get lead:", error);
    return null;
  }
}

export async function updateLeadStatus(
  id: number, 
  status: "new" | "contacted" | "qualified" | "converted" | "lost",
  notes?: string
): Promise<void> {
  const db = await getDb();
  if (!db) return;

  try {
    const updateData: Partial<Lead> = { status };
    if (notes !== undefined) {
      updateData.notes = notes;
    }
    
    await db.update(leads).set(updateData).where(eq(leads.id, id));
  } catch (error) {
    console.error("[Database] Failed to update lead status:", error);
    throw error;
  }
}

export async function getLeadStats(): Promise<{
  total: number;
  byStatus: Record<string, number>;
  bySource: Record<string, number>;
  last7Days: number;
  last30Days: number;
  conversionRate: number;
}> {
  const db = await getDb();
  if (!db) {
    return {
      total: 0,
      byStatus: {},
      bySource: {},
      last7Days: 0,
      last30Days: 0,
      conversionRate: 0,
    };
  }

  try {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const [
      totalResult,
      statusResult,
      sourceResult,
      last7Result,
      last30Result,
      convertedResult,
    ] = await Promise.all([
      db.select({ count: sql<number>`count(*)` }).from(leads),
      db.select({ 
        status: leads.status, 
        count: sql<number>`count(*)` 
      }).from(leads).groupBy(leads.status),
      db.select({ 
        source: leads.utmSource, 
        count: sql<number>`count(*)` 
      }).from(leads).groupBy(leads.utmSource),
      db.select({ count: sql<number>`count(*)` })
        .from(leads)
        .where(gte(leads.createdAt, sevenDaysAgo)),
      db.select({ count: sql<number>`count(*)` })
        .from(leads)
        .where(gte(leads.createdAt, thirtyDaysAgo)),
      db.select({ count: sql<number>`count(*)` })
        .from(leads)
        .where(eq(leads.status, "converted")),
    ]);

    const total = Number(totalResult[0]?.count || 0);
    const converted = Number(convertedResult[0]?.count || 0);

    return {
      total,
      byStatus: Object.fromEntries(
        statusResult.map(r => [r.status, Number(r.count)])
      ),
      bySource: Object.fromEntries(
        sourceResult
          .filter(r => r.source)
          .map(r => [r.source || "direct", Number(r.count)])
      ),
      last7Days: Number(last7Result[0]?.count || 0),
      last30Days: Number(last30Result[0]?.count || 0),
      conversionRate: total > 0 ? (converted / total) * 100 : 0,
    };
  } catch (error) {
    console.error("[Database] Failed to get lead stats:", error);
    return {
      total: 0,
      byStatus: {},
      bySource: {},
      last7Days: 0,
      last30Days: 0,
      conversionRate: 0,
    };
  }
}

// ============================================
// SETTINGS FUNCTIONS
// ============================================

export async function getSetting(key: string): Promise<Setting | null> {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db.select().from(settings).where(eq(settings.key, key)).limit(1);
    return result[0] || null;
  } catch (error) {
    console.error("[Database] Failed to get setting:", error);
    return null;
  }
}

export async function getAllSettings(): Promise<Setting[]> {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db.select().from(settings).orderBy(settings.key);
  } catch (error) {
    console.error("[Database] Failed to get settings:", error);
    return [];
  }
}

export async function upsertSetting(
  key: string, 
  value: string, 
  description?: string,
  updatedBy?: number
): Promise<void> {
  const db = await getDb();
  if (!db) return;

  try {
    await db.insert(settings).values({
      key,
      value,
      description: description || null,
      updatedBy: updatedBy || null,
    }).onDuplicateKeyUpdate({
      set: {
        value,
        description: description || null,
        updatedBy: updatedBy || null,
      },
    });
  } catch (error) {
    console.error("[Database] Failed to upsert setting:", error);
    throw error;
  }
}

// ============================================
// ANALYTICS FUNCTIONS
// ============================================

export async function createAnalyticsEvent(
  data: Omit<InsertAnalyticsEvent, "id" | "createdAt">
): Promise<void> {
  const db = await getDb();
  if (!db) return;

  try {
    await db.insert(analyticsEvents).values(data);
  } catch (error) {
    console.error("[Database] Failed to create analytics event:", error);
  }
}

export async function getAnalyticsStats(
  startDate?: string,
  endDate?: string
): Promise<{
  totalEvents: number;
  eventsByName: Record<string, number>;
  eventsBySource: Record<string, number>;
  uniqueSessions: number;
}> {
  const db = await getDb();
  if (!db) {
    return {
      totalEvents: 0,
      eventsByName: {},
      eventsBySource: {},
      uniqueSessions: 0,
    };
  }

  try {
    let whereConditions = [];
    
    if (startDate) {
      whereConditions.push(gte(analyticsEvents.createdAt, new Date(startDate)));
    }
    if (endDate) {
      whereConditions.push(lte(analyticsEvents.createdAt, new Date(endDate)));
    }

    const whereClause = whereConditions.length > 0 ? and(...whereConditions) : undefined;

    const [totalResult, byNameResult, bySourceResult, sessionsResult] = await Promise.all([
      db.select({ count: sql<number>`count(*)` })
        .from(analyticsEvents)
        .where(whereClause),
      db.select({ 
        name: analyticsEvents.eventName, 
        count: sql<number>`count(*)` 
      })
        .from(analyticsEvents)
        .where(whereClause)
        .groupBy(analyticsEvents.eventName),
      db.select({ 
        source: analyticsEvents.utmSource, 
        count: sql<number>`count(*)` 
      })
        .from(analyticsEvents)
        .where(whereClause)
        .groupBy(analyticsEvents.utmSource),
      db.select({ count: sql<number>`count(distinct ${analyticsEvents.sessionId})` })
        .from(analyticsEvents)
        .where(whereClause),
    ]);

    return {
      totalEvents: Number(totalResult[0]?.count || 0),
      eventsByName: Object.fromEntries(
        byNameResult.map(r => [r.name, Number(r.count)])
      ),
      eventsBySource: Object.fromEntries(
        bySourceResult
          .filter(r => r.source)
          .map(r => [r.source || "direct", Number(r.count)])
      ),
      uniqueSessions: Number(sessionsResult[0]?.count || 0),
    };
  } catch (error) {
    console.error("[Database] Failed to get analytics stats:", error);
    return {
      totalEvents: 0,
      eventsByName: {},
      eventsBySource: {},
      uniqueSessions: 0,
    };
  }
}

// ============================================
// AFFILIATE FUNCTIONS
// ============================================

export async function getAffiliatePartners() {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db.select()
      .from(affiliatePartners)
      .where(eq(affiliatePartners.isActive, true))
      .orderBy(desc(affiliatePartners.priority));
  } catch (error) {
    console.error("[Database] Failed to get affiliate partners:", error);
    return [];
  }
}

export async function createAffiliateClick(
  data: Omit<InsertAffiliateClick, "id" | "createdAt">
): Promise<void> {
  const db = await getDb();
  if (!db) return;

  try {
    await db.insert(affiliateClicks).values(data);
  } catch (error) {
    console.error("[Database] Failed to create affiliate click:", error);
  }
}

export async function getAffiliateStats(): Promise<{
  totalClicks: number;
  clicksByPartner: Record<string, number>;
  last7Days: number;
  last30Days: number;
}> {
  const db = await getDb();
  if (!db) {
    return {
      totalClicks: 0,
      clicksByPartner: {},
      last7Days: 0,
      last30Days: 0,
    };
  }

  try {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const [totalResult, byPartnerResult, last7Result, last30Result] = await Promise.all([
      db.select({ count: sql<number>`count(*)` }).from(affiliateClicks),
      db.select({ 
        partnerId: affiliateClicks.partnerId, 
        count: sql<number>`count(*)` 
      }).from(affiliateClicks).groupBy(affiliateClicks.partnerId),
      db.select({ count: sql<number>`count(*)` })
        .from(affiliateClicks)
        .where(gte(affiliateClicks.createdAt, sevenDaysAgo)),
      db.select({ count: sql<number>`count(*)` })
        .from(affiliateClicks)
        .where(gte(affiliateClicks.createdAt, thirtyDaysAgo)),
    ]);

    // Get partner names
    const partners = await getAffiliatePartners();
    const partnerMap = new Map(partners.map(p => [p.id, p.name]));

    return {
      totalClicks: Number(totalResult[0]?.count || 0),
      clicksByPartner: Object.fromEntries(
        byPartnerResult.map(r => [
          partnerMap.get(r.partnerId) || `Partner ${r.partnerId}`,
          Number(r.count)
        ])
      ),
      last7Days: Number(last7Result[0]?.count || 0),
      last30Days: Number(last30Result[0]?.count || 0),
    };
  } catch (error) {
    console.error("[Database] Failed to get affiliate stats:", error);
    return {
      totalClicks: 0,
      clicksByPartner: {},
      last7Days: 0,
      last30Days: 0,
    };
  }
}
