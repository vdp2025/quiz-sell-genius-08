
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MetricCard } from '../MetricCard';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { Activity, Users, CheckCircle, MessageSquare } from 'lucide-react';

interface OverviewTabProps {
  metrics: any;
  chartData: any[];
  chartConfig: ChartConfig;
  renderTooltipContent: (props: any) => JSX.Element | null;
  renderLegendContent: (props: any) => JSX.Element;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ 
  metrics, 
  chartData, 
  chartConfig,
  renderTooltipContent,
  renderLegendContent
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Total de Inicios" 
          value={metrics?.totalStarts || 0}
          icon={<Users className="h-4 w-4" />}
        />
        
        <MetricCard 
          title="Taxa de Conclusão" 
          value={`${metrics?.completionRate.toFixed(1) || 0}%`}
          subtitle={`${metrics?.totalCompletes || 0} conclusões`}
          trend={5.2} // Example trend value
          icon={<CheckCircle className="h-4 w-4" />}
        />
        
        <MetricCard 
          title="Taxa de Conversão" 
          value={`${metrics?.conversionRate.toFixed(1) || 0}%`}
          subtitle={`${metrics?.totalLeads || 0} leads gerados`}
          trend={-2.1} // Example trend value
          icon={<MessageSquare className="h-4 w-4" />}
        />
        
        <MetricCard 
          title="Taxa de Vendas" 
          value={`${metrics?.salesRate.toFixed(1) || 0}%`}
          subtitle={`${metrics?.totalSales || 0} vendas realizadas`}
          trend={8.4} // Example trend value
          icon={<Activity className="h-4 w-4" />}
        />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Tendências</CardTitle>
          <CardDescription>Acompanhe a evolução do funil de conversão</CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="h-[300px]">
            <ChartContainer config={chartConfig}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip content={renderTooltipContent} />
                <Legend content={renderLegendContent} />
                <Line type="monotone" dataKey="inicios" stroke="#4f46e5" strokeWidth={2} />
                <Line type="monotone" dataKey="conclusoes" stroke="#10b981" strokeWidth={2} />
                <Line type="monotone" dataKey="resultados" stroke="#f59e0b" strokeWidth={2} />
                <Line type="monotone" dataKey="leads" stroke="#ef4444" strokeWidth={2} />
              </LineChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
