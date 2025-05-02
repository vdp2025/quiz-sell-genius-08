
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { MetricsGrid } from '../MetricsGrid';
import { ChartConfig, ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { Activity, Users, CheckCircle, MessageSquare } from 'lucide-react';
import { GridLayout } from '@/components/shared/GridLayout';

interface OverviewTabProps {
  analyticsData: any;
  loading: boolean;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ analyticsData, loading }) => {
  const metrics = analyticsData?.metrics;
  
  // Prepare chart data
  const chartData = React.useMemo(() => {
    if (!analyticsData?.metrics?.eventsByDay) return [];
    
    return Object.entries(analyticsData.metrics.eventsByDay).map(([date, counts]: [string, any]) => {
      return {
        date: new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
        inicios: counts.quiz_start || 0,
        conclusoes: counts.quiz_complete || 0,
        resultados: counts.result_view || 0,
        leads: counts.lead_generated || 0
      };
    });
  }, [analyticsData]);
  
  // Chart configuration
  const chartConfig: ChartConfig = {
    inicios: { 
      label: 'Inícios',
      theme: { light: '#4f46e5', dark: '#818cf8' }
    },
    conclusoes: { 
      label: 'Conclusões',
      theme: { light: '#10b981', dark: '#34d399' }
    },
    resultados: { 
      label: 'Resultados',
      theme: { light: '#f59e0b', dark: '#fbbf24' }
    },
    leads: { 
      label: 'Leads',
      theme: { light: '#ef4444', dark: '#f87171' }
    }
  };

  // Custom tooltip renderer
  const renderTooltipContent = (props: any) => {
    if (!props.active || !props.payload) {
      return null;
    }
    return (
      <div className="bg-white p-3 border border-gray-100 shadow-lg rounded-md">
        <p className="text-xs font-medium mb-1">{props.label}</p>
        {props.payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between text-xs">
            <span style={{ color: entry.color }}>{entry.name}: </span>
            <span className="font-semibold ml-2">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };
  
  const renderLegendContent = (props: any) => {
    const { payload } = props;
    
    return (
      <div className="flex flex-wrap justify-center gap-4 text-xs">
        {payload.map((entry: any, index: number) => (
          <div key={`legend-${index}`} className="flex items-center">
            <div 
              className="w-3 h-3 rounded-sm mr-1"
              style={{ backgroundColor: entry.color }}
            />
            <span>{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  // Calculate average values for reference lines
  const avgInicios = metrics?.totalStarts ? metrics.totalStarts / (chartData.length || 1) : 0;
  const avgConclusoes = metrics?.totalCompletes ? metrics.totalCompletes / (chartData.length || 1) : 0;

  return (
    <div className="space-y-4">
      <MetricsGrid 
        metrics={metrics} 
        loading={loading}
        timeRange={analyticsData?.timeRange || '7d'} 
      />
      
      <Card className="border border-border/60">
        <CardHeader className="pb-2">
          <CardTitle>Tendências</CardTitle>
          <CardDescription>Acompanhe a evolução do funil de conversão</CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="h-[220px] w-full">
            <ChartContainer config={chartConfig}>
              <LineChart data={chartData} margin={{ top: 15, right: 15, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis 
                  dataKey="date" 
                  stroke="#888888"
                  tick={{ fill: '#888888', fontSize: 11 }}
                  tickLine={{ stroke: '#e0e0e0' }}
                />
                <YAxis 
                  stroke="#888888"
                  tick={{ fill: '#888888', fontSize: 11 }}
                  tickLine={{ stroke: '#e0e0e0' }}
                />
                <Tooltip content={renderTooltipContent} />
                <Legend content={renderLegendContent} verticalAlign="top" height={30} />
                
                {/* Reference lines for averages */}
                <ReferenceLine 
                  y={avgInicios} 
                  stroke="#4f46e5" 
                  strokeDasharray="3 3" 
                  ifOverflow="extendDomain"
                />
                <ReferenceLine 
                  y={avgConclusoes} 
                  stroke="#10b981" 
                  strokeDasharray="3 3" 
                  ifOverflow="extendDomain"
                />
                
                {/* Enhanced lines with better styling */}
                <Line 
                  type="monotone" 
                  dataKey="inicios" 
                  stroke="#4f46e5" 
                  strokeWidth={2}
                  dot={{ r: 2, strokeWidth: 1 }}
                  activeDot={{ r: 4, strokeWidth: 0, fill: '#4f46e5' }} 
                  animationDuration={1500}
                  animationEasing="ease-in-out"
                />
                <Line 
                  type="monotone" 
                  dataKey="conclusoes" 
                  stroke="#10b981" 
                  strokeWidth={2} 
                  dot={{ r: 2, strokeWidth: 1 }}
                  activeDot={{ r: 4, strokeWidth: 0, fill: '#10b981' }}
                  animationDuration={1500}
                  animationEasing="ease-in-out"
                  animationBegin={300}
                />
                <Line 
                  type="monotone" 
                  dataKey="resultados" 
                  stroke="#f59e0b" 
                  strokeWidth={2} 
                  dot={{ r: 2, strokeWidth: 1 }}
                  activeDot={{ r: 4, strokeWidth: 0, fill: '#f59e0b' }}
                  animationDuration={1500}
                  animationEasing="ease-in-out"
                  animationBegin={600}
                />
                <Line 
                  type="monotone" 
                  dataKey="leads" 
                  stroke="#ef4444" 
                  strokeWidth={2} 
                  dot={{ r: 2, strokeWidth: 1 }}
                  activeDot={{ r: 4, strokeWidth: 0, fill: '#ef4444' }}
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
