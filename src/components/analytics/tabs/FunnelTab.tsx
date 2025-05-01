
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { Progress } from '@/components/ui/progress';

interface FunnelTabProps {
  metrics: any;
  funnelData: any[];
  chartConfig: ChartConfig;
  renderTooltipContent: (props: any) => JSX.Element | null;
  renderLegendContent: (props: any) => JSX.Element;
}

export const FunnelTab: React.FC<FunnelTabProps> = ({ 
  metrics, 
  funnelData, 
  chartConfig,
  renderTooltipContent,
  renderLegendContent
}) => {
  // Define colors with gradients for funnel steps
  const FUNNEL_COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444'];
  
  return (
    <div className="space-y-6">
      <Card className="border border-border/60">
        <CardHeader>
          <CardTitle>Funil de Conversão</CardTitle>
          <CardDescription>Visualize a performance do seu funil de conversão</CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="h-[400px]">
            <ChartContainer config={chartConfig}>
              <BarChart 
                data={funnelData} 
                layout="vertical"
                margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" horizontal={false} />
                <XAxis 
                  type="number" 
                  stroke="#888888"
                  tick={{ fill: '#888888', fontSize: 12 }}
                  tickLine={{ stroke: '#e0e0e0' }}
                />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  stroke="#888888"
                  tick={{ fill: '#888888', fontSize: 12 }}
                  tickLine={{ stroke: '#e0e0e0' }}
                  width={150}
                />
                <Tooltip content={renderTooltipContent} />
                <Legend content={renderLegendContent} />
                <Bar 
                  dataKey="value" 
                  radius={[0, 4, 4, 0]}
                  animationDuration={1500}
                  animationEasing="ease-out"
                >
                  {funnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={FUNNEL_COLORS[index % FUNNEL_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card className="border border-border/60">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Início → Conclusão</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <p className="text-2xl font-bold">{metrics?.completionRate.toFixed(1) || 0}%</p>
                  <p className="text-xs text-muted-foreground">de {metrics?.totalStarts || 0} inicios</p>
                </div>
                <Progress 
                  value={metrics?.completionRate || 0} 
                  indicatorClassName="bg-gradient-to-r from-blue-500 to-indigo-700" 
                  className="h-2 bg-muted/50"
                />
              </CardContent>
            </Card>
            
            <Card className="border border-border/60">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Conclusão → Visualização</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <p className="text-2xl font-bold">
                    {metrics?.totalCompletes ? ((metrics.totalResultViews / metrics.totalCompletes) * 100).toFixed(1) : 0}%
                  </p>
                  <p className="text-xs text-muted-foreground">de {metrics?.totalCompletes || 0} conclusões</p>
                </div>
                <Progress 
                  value={metrics?.totalCompletes ? (metrics.totalResultViews / metrics.totalCompletes) * 100 : 0} 
                  indicatorClassName="bg-gradient-to-r from-green-500 to-emerald-700" 
                  className="h-2 bg-muted/50"
                />
              </CardContent>
            </Card>
            
            <Card className="border border-border/60">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Visualização → Lead</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <p className="text-2xl font-bold">
                    {metrics?.totalResultViews ? ((metrics.totalLeads / metrics.totalResultViews) * 100).toFixed(1) : 0}%
                  </p>
                  <p className="text-xs text-muted-foreground">de {metrics?.totalResultViews || 0} visualizações</p>
                </div>
                <Progress 
                  value={metrics?.totalResultViews ? (metrics.totalLeads / metrics.totalResultViews) * 100 : 0} 
                  indicatorClassName="bg-gradient-to-r from-yellow-500 to-amber-700" 
                  className="h-2 bg-muted/50"
                />
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
