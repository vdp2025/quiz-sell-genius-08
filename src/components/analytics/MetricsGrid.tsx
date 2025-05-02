
import React from 'react';
import { MetricCard } from './MetricCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Users, ArrowUpRight, Share2, ShoppingCart, Activity, Clock, BarChart3, Target } from 'lucide-react';

interface MetricsGridProps {
  metrics: {
    totalStarts: number;
    totalCompletes: number;
    totalResultViews: number;
    totalLeads: number;
    totalSales: number;
    completionRate: number;
    conversionRate: number;
    salesRate: number;
  } | null;
  loading?: boolean;
  timeRange: '7d' | '30d' | 'all';
}

export const MetricsGrid: React.FC<MetricsGridProps> = ({ metrics, loading = false, timeRange }) => {
  const timeRangeLabel = timeRange === '7d' ? '7 days' : timeRange === '30d' ? '30 days' : 'all time';
  
  if (loading || !metrics) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array(8).fill(0).map((_, i) => (
          <div key={i} className="bg-card rounded-lg border border-border/40 p-6">
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-8 w-16 mb-1" />
            <Skeleton className="h-3 w-32" />
          </div>
        ))}
      </div>
    );
  }
  
  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };
  
  const formatPercent = (num: number): string => {
    return num.toFixed(1) + '%';
  };
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard 
        title="Quiz Starts" 
        value={formatNumber(metrics.totalStarts)}
        subtitle={`Total quiz starts in ${timeRangeLabel}`}
        icon={<Activity size={16} />}
      />
      
      <MetricCard 
        title="Completion Rate" 
        value={formatPercent(metrics.completionRate)}
        subtitle={`${metrics.totalCompletes} of ${metrics.totalStarts} quizzes completed`}
        icon={<Target size={16} />}
      />
      
      <MetricCard 
        title="Results Viewed" 
        value={formatNumber(metrics.totalResultViews)}
        subtitle={`People who viewed their results`}
        icon={<BarChart3 size={16} />}
      />
      
      <MetricCard 
        title="Leads Generated" 
        value={formatNumber(metrics.totalLeads)}
        subtitle={`Total leads captured`}
        icon={<Users size={16} />}
      />
      
      <MetricCard 
        title="Conversion Rate" 
        value={formatPercent(metrics.conversionRate)}
        subtitle={`Lead conversion from quiz starts`}
        icon={<ArrowUpRight size={16} />}
      />
      
      <MetricCard 
        title="Sales" 
        value={formatNumber(metrics.totalSales)}
        subtitle={`Total purchases made`}
        icon={<ShoppingCart size={16} />}
      />
      
      <MetricCard 
        title="Sales Rate" 
        value={formatPercent(metrics.salesRate)}
        subtitle={`Purchase rate from leads`}
        icon={<Share2 size={16} />}
      />
      
      <MetricCard 
        title="Avg. Completion Time" 
        value="3:27"
        subtitle={`Average time to complete quiz`}
        icon={<Clock size={16} />}
      />
    </div>
  );
};
