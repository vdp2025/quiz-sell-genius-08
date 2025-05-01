
import React from 'react';
import { Download, RefreshCcw, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

interface DashboardHeaderProps {
  timeRange: '7d' | '30d' | 'all';
  onTimeRangeChange: (value: '7d' | '30d' | 'all') => void;
  onRefresh: () => void;
  onExportData: () => void;
  onClearData: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  timeRange,
  onTimeRangeChange,
  onRefresh,
  onExportData,
  onClearData
}) => {
  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <div>
          <h1 className="text-xl font-semibold text-[#432818]">Analytics Dashboard</h1>
          <Breadcrumb className="text-sm text-muted-foreground mt-1">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin/analytics">Analytics</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <Select value={timeRange} onValueChange={(value) => onTimeRangeChange(value as any)}>
            <SelectTrigger className="w-[130px] h-8 border-border/60 bg-background">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex items-center space-x-1">
            <Button variant="outline" size="icon" onClick={onRefresh} className="border-border/60 bg-background hover:bg-muted/80 h-8 w-8">
              <RefreshCcw className="h-4 w-4" />
            </Button>
            
            <Button variant="outline" size="icon" onClick={onExportData} className="border-border/60 bg-background hover:bg-muted/80 h-8 w-8">
              <Download className="h-4 w-4" />
            </Button>
            
            <Button variant="outline" size="icon" onClick={onClearData} className="border-border/60 bg-background hover:bg-muted/80 text-red-600 h-8 w-8">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
