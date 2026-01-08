import { Card, CardContent } from "@/components/ui/card";

export function CalculatorSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Hero skeleton */}
      <div className="h-32 bg-muted rounded-lg" />
      
      {/* Form skeleton */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="h-10 bg-muted rounded" />
          <div className="h-10 bg-muted rounded" />
          <div className="h-10 bg-muted rounded" />
          <div className="h-12 bg-primary/20 rounded" />
        </CardContent>
      </Card>
    </div>
  );
}

export function ResultsSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Summary cards skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="h-4 bg-muted rounded mb-2" />
              <div className="h-8 bg-muted rounded" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart skeleton */}
      <Card>
        <CardContent className="p-6">
          <div className="h-[300px] bg-muted rounded" />
        </CardContent>
      </Card>
    </div>
  );
}

export function LeadFormSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-10 bg-muted rounded" />
      <div className="h-10 bg-muted rounded" />
      <div className="h-10 bg-muted rounded" />
      <div className="h-12 bg-primary/20 rounded" />
    </div>
  );
}
