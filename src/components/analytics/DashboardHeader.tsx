
import React from 'react';
import { Download, Filter, RefreshCcw, Trash2 } from 'lucide-react';
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
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#432818]">Dashboard de Analytics</h1>
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
        
        <div className="flex flex-wrap items-center gap-3">
          <Select value={timeRange} onValueChange={(value) => onTimeRangeChange(value as any)}>
            <SelectTrigger className="w-[180px] border-border/60 bg-card">
              <SelectValue placeholder="Selecionar período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Últimos 7 dias</SelectItem>
              <SelectItem value="30d">Últimos 30 dias</SelectItem>
              <SelectItem value="all">Todo o período</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="sm" onClick={onRefresh} className="border-border/60 bg-card hover:bg-muted/80">
            <RefreshCcw className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
          
          <Button variant="outline" size="sm" onClick={onExportData} className="border-border/60 bg-card hover:bg-muted/80">
            <Download className="h-4 w-4 mr-2" />
            Exportar CSV
          </Button>
          
          <Button variant="destructive" size="sm" onClick={onClearData}>
            <Trash2 className="h-4 w-4 mr-2" />
            Limpar Dados
          </Button>
        </div>
      </div>
    </div>
  );
};
