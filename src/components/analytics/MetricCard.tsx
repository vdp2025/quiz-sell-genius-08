
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: number;
  icon?: React.ReactNode;
}

export const MetricCard: React.FC<MetricCardProps> = ({ title, value, subtitle, trend, icon }) => {
  return (
    <Card className="hover:shadow-md transition-shadow overflow-hidden border border-border/60 relative">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-muted/30 opacity-30" />
      
      <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0 relative z-10">
        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
          {icon && <div className="text-primary">{icon}</div>}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="flex items-baseline space-x-2">
          <p className="text-2xl font-bold tracking-tight">{value}</p>
          {trend !== undefined && (
            <span 
              className={`flex items-center text-xs font-medium px-1.5 py-0.5 rounded-full ${
                trend >= 0 
                  ? 'text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900/30' 
                  : 'text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/30'
              }`}
            >
              {trend >= 0 ? <ArrowUp className="h-3 w-3 mr-0.5" /> : <ArrowDown className="h-3 w-3 mr-0.5" />}
              {Math.abs(trend)}%
            </span>
          )}
        </div>
        {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
      </CardContent>
    </Card>
  );
};
