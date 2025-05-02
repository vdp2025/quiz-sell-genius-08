
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { Progress } from '@/components/ui/progress';
import { GridLayout } from '@/components/shared/GridLayout';

interface FunnelTabProps {
  analyticsData: any;
  loading: boolean;
}

export const FunnelTab: React.FC<FunnelTabProps> = ({ analyticsData, loading }) => {
  const metrics = analyticsData?.metrics;
  
  // Prepare funnel data
  const funnelData = React.useMemo(() => {
    if (!metrics) return [];
    
    return [
      { name: 'Início do Quiz', value: metrics.totalStarts, text: 'Usuários iniciaram o quiz' },
      { name: 'Quiz Completo', value: metrics.totalCompletes, text: 'Usuários completaram o quiz' },
      { name: 'Visualizou Resultado', value: metrics.totalResultViews, text: 'Usuários viram seus resultados' },
      { name: 'Lead Gerado', value: metrics.totalLeads, text: 'Leads capturados' },
      { name: 'Venda', value: metrics.totalSales, text: 'Compras realizadas' }
    ];
  }, [metrics]);
  
  // Chart configuration
  const chartConfig: ChartConfig = {
    value: { 
      label: 'Valor',
      theme: { light: '#4f46e5', dark: '#818cf8' }
    }
  };
  
  // Define colors with gradients for funnel steps
  const FUNNEL_COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];
  
  // Custom tooltip renderer
  const renderTooltipContent = (props: any) => {
    if (!props.active || !props.payload) {
      return null;
    }
    
    const data = props.payload[0].payload;
    
    return (
      <div className="bg-white p-2 border border-gray-100 shadow-lg rounded-md">
        <p className="text-xs font-medium mb-0.5">{data.name}</p>
        <p className="text-xs font-semibold">{data.value} usuários</p>
        <p className="text-[10px] text-gray-500 mt-0.5">{data.text}</p>
      </div>
    );
  };
  
  const renderLegendContent = (props: any) => {
    return null; // Hide default legend
  };
  
  if (loading || !metrics) {
    return (
      <div className="flex justify-center items-center py-12">
        <p className="text-muted-foreground">Carregando dados do funil...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="border border-border/40 shadow-sm">
        <CardHeader className="pb-1.5">
          <CardTitle>Funil de Conversão</CardTitle>
          <CardDescription className="text-xs">Visualize a performance do seu funil de conversão</CardDescription>
        </CardHeader>
        <CardContent className="pt-1.5">
          <div className="h-[110px]">
            <ChartContainer config={chartConfig}>
              <BarChart 
                data={funnelData} 
                layout="vertical"
                margin={{ top: 8, right: 8, left: 40, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" horizontal={false} />
                <XAxis 
                  type="number" 
                  stroke="#888888"
                  tick={{ fill: '#888888', fontSize: 9 }}
                  tickLine={{ stroke: '#e0e0e0' }}
                />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  stroke="#888888"
                  tick={{ fill: '#888888', fontSize: 9 }}
                  tickLine={{ stroke: '#e0e0e0' }}
                  width={40}
                />
                <Tooltip content={renderTooltipContent} />
                <Legend content={renderLegendContent} />
                <Bar 
                  dataKey="value" 
                  radius={[0, 3, 3, 0]}
                  animationDuration={1200}
                  animationEasing="ease-out"
                >
                  {funnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={FUNNEL_COLORS[index % FUNNEL_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </div>
          
          <GridLayout columns={3} gap="md" className="mt-4">
            <Card className="border border-border/60">
              <CardHeader className="pb-1.5 pt-2.5">
                <CardTitle className="text-sm font-medium">Início → Conclusão</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1.5 pt-0 pb-2.5">
                <div className="flex justify-between items-baseline">
                  <p className="text-base font-bold">{metrics?.completionRate.toFixed(1) || 0}%</p>
                  <p className="text-xs text-muted-foreground">de {metrics?.totalStarts || 0} inícios</p>
                </div>
                <Progress 
                  value={metrics?.completionRate || 0} 
                  indicatorClassName="bg-gradient-to-r from-blue-500 to-indigo-700" 
                  className="h-1.5 bg-muted/50"
                />
              </CardContent>
            </Card>
            
            <Card className="border border-border/60">
              <CardHeader className="pb-1.5 pt-2.5">
                <CardTitle className="text-sm font-medium">Conclusão → Visualização</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1.5 pt-0 pb-2.5">
                <div className="flex justify-between items-baseline">
                  <p className="text-base font-bold">
                    {metrics?.totalCompletes ? ((metrics.totalResultViews / metrics.totalCompletes) * 100).toFixed(1) : 0}%
                  </p>
                  <p className="text-xs text-muted-foreground">de {metrics?.totalCompletes || 0} conclusões</p>
                </div>
                <Progress 
                  value={metrics?.totalCompletes ? (metrics.totalResultViews / metrics.totalCompletes) * 100 : 0} 
                  indicatorClassName="bg-gradient-to-r from-green-500 to-emerald-700" 
                  className="h-1.5 bg-muted/50"
                />
              </CardContent>
            </Card>
            
            <Card className="border border-border/60">
              <CardHeader className="pb-1.5 pt-2.5">
                <CardTitle className="text-sm font-medium">Visualização → Lead</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1.5 pt-0 pb-2.5">
                <div className="flex justify-between items-baseline">
                  <p className="text-base font-bold">
                    {metrics?.totalResultViews ? ((metrics.totalLeads / metrics.totalResultViews) * 100).toFixed(1) : 0}%
                  </p>
                  <p className="text-xs text-muted-foreground">de {metrics?.totalResultViews || 0} visualizações</p>
                </div>
                <Progress 
                  value={metrics?.totalResultViews ? (metrics.totalLeads / metrics.totalResultViews) * 100 : 0} 
                  indicatorClassName="bg-gradient-to-r from-yellow-500 to-amber-700" 
                  className="h-1.5 bg-muted/50"
                />
              </CardContent>
            </Card>
          </GridLayout>
        </CardContent>
      </Card>
    </div>
  );
};
