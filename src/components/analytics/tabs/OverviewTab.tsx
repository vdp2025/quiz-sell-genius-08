
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { MetricCard } from '../MetricCard';
import { ChartConfig, ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { Activity, Users, CheckCircle, MessageSquare } from 'lucide-react';
import { GridLayout } from '@/components/shared/GridLayout';

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
  // Calculate average values for reference lines
  const avgInicios = metrics?.totalStarts ? metrics.totalStarts / (chartData.length || 1) : 0;
  const avgConclusoes = metrics?.totalCompletes ? metrics.totalCompletes / (chartData.length || 1) : 0;

  return (
    <div className="space-y-4">
      <GridLayout columns={4} gap="md">
        <MetricCard 
          title="Total de Inicios" 
          value={metrics?.totalStarts || 0}
          icon={<Users className="h-4 w-4" />}
        />
        
        <MetricCard 
          title="Taxa de Conclusão" 
          value={`${metrics?.completionRate.toFixed(1) || 0}%`}
          subtitle={`${metrics?.totalCompletes || 0} conclusões`}
          trend={5.2}
          icon={<CheckCircle className="h-4 w-4" />}
        />
        
        <MetricCard 
          title="Taxa de Conversão" 
          value={`${metrics?.conversionRate.toFixed(1) || 0}%`}
          subtitle={`${metrics?.totalLeads || 0} leads gerados`}
          trend={-2.1}
          icon={<MessageSquare className="h-4 w-4" />}
        />
        
        <MetricCard 
          title="Taxa de Vendas" 
          value={`${metrics?.salesRate.toFixed(1) || 0}%`}
          subtitle={`${metrics?.totalSales || 0} vendas realizadas`}
          trend={8.4}
          icon={<Activity className="h-4 w-4" />}
        />
      </GridLayout>
      
      <Card className="border border-border/60">
        <CardHeader className="pb-2">
          <CardTitle>Tendências</CardTitle>
          <CardDescription>Acompanhe a evolução do funil de conversão</CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="h-[280px] w-full">
            <ChartContainer config={chartConfig}>
              <LineChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis 
                  dataKey="date" 
                  stroke="#888888"
                  tick={{ fill: '#888888', fontSize: 12 }}
                  tickLine={{ stroke: '#e0e0e0' }}
                />
                <YAxis 
                  stroke="#888888"
                  tick={{ fill: '#888888', fontSize: 12 }}
                  tickLine={{ stroke: '#e0e0e0' }}
                />
                <Tooltip content={renderTooltipContent} />
                <Legend content={renderLegendContent} verticalAlign="top" height={36} />
                
                {/* Reference lines for averages */}
                <ReferenceLine y={avgInicios} stroke="#4f46e5" strokeDasharray="3 3" label={{ value: 'Média Inicios', position: 'insideTopLeft', fill: '#4f46e5' }} />
                <ReferenceLine y={avgConclusoes} stroke="#10b981" strokeDasharray="3 3" label={{ value: 'Média Conclusões', position: 'insideTopLeft', fill: '#10b981', offset: 20 }} />
                
                {/* Enhanced lines with better styling */}
                <Line 
                  type="monotone" 
                  dataKey="inicios" 
                  stroke="#4f46e5" 
                  strokeWidth={2.5}
                  dot={{ r: 3, strokeWidth: 2 }}
                  activeDot={{ r: 5, strokeWidth: 0, fill: '#4f46e5' }} 
                  animationDuration={1500}
                  animationEasing="ease-in-out"
                />
                <Line 
                  type="monotone" 
                  dataKey="conclusoes" 
                  stroke="#10b981" 
                  strokeWidth={2.5} 
                  dot={{ r: 3, strokeWidth: 2 }}
                  activeDot={{ r: 5, strokeWidth: 0, fill: '#10b981' }}
                  animationDuration={1500}
                  animationEasing="ease-in-out"
                  animationBegin={300}
                />
                <Line 
                  type="monotone" 
                  dataKey="resultados" 
                  stroke="#f59e0b" 
                  strokeWidth={2.5} 
                  dot={{ r: 3, strokeWidth: 2 }}
                  activeDot={{ r: 5, strokeWidth: 0, fill: '#f59e0b' }}
                  animationDuration={1500}
                  animationEasing="ease-in-out"
                  animationBegin={600}
                />
                <Line 
                  type="monotone" 
                  dataKey="leads" 
                  stroke="#ef4444" 
                  strokeWidth={2.5} 
                  dot={{ r: 3, strokeWidth: 2 }}
                  activeDot={{ r: 5, strokeWidth: 0, fill: '#ef4444' }}
                  animationDuration={1500}
                  animationEasing="ease-in-out"
                  animationBegin={900}
                />
              </LineChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
