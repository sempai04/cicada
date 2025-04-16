
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  description,
  trend,
  className,
}) => {
  return (
    <Card className={cn("border border-border/50 overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{title}</p>
            <h3 className="text-2xl font-bold mb-1">{value}</h3>
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
            {trend && (
              <div className="flex items-center mt-2">
                <span
                  className={cn(
                    "text-xs font-medium flex items-center",
                    trend.isPositive ? "text-cyber-success" : "text-cyber-error"
                  )}
                >
                  <span
                    className={cn(
                      "mr-1 text-lg",
                      trend.isPositive ? "text-cyber-success" : "text-cyber-error"
                    )}
                  >
                    {trend.isPositive ? "↑" : "↓"}
                  </span>
                  {trend.value}%
                </span>
                <span className="text-xs text-muted-foreground ml-2">since last scan</span>
              </div>
            )}
          </div>
          <div className="text-cyber p-2 rounded-md bg-muted/20">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
