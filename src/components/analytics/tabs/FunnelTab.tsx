
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';

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
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Funil de Conversão</CardTitle>
          <CardDescription>Visualize a performance do seu funil de conversão</CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="h-[400px]">
            <ChartContainer config={chartConfig}>
              <BarChart data={funnelData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip content={renderTooltipContent} />
                <Legend content={renderLegendContent} />
                <Bar dataKey="value" fill="#4f46e5" />
              </BarChart>
            </ChartContainer>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Início → Conclusão</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{metrics?.completionRate.toFixed(1) || 0}%</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Conclusão → Visualização</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  {metrics?.totalCompletes ? ((metrics.totalResultViews / metrics.totalCompletes) * 100).toFixed(1) : 0}%
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Visualização → Lead</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  {metrics?.totalResultViews ? ((metrics.totalLeads / metrics.totalResultViews) * 100).toFixed(1) : 0}%
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
