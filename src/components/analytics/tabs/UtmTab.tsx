
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { GridLayout } from '@/components/shared/GridLayout';

type UtmData = {
  source: string;
  medium: string;
  campaign: string;
  users: number;
  conversions: number;
  conversionRate: number;
};

interface UtmTabProps {
  analyticsData: any;
  loading: boolean;
}

export const UtmTab: React.FC<UtmTabProps> = ({
  analyticsData,
  loading
}) => {
  // Sample UTM data - in a real app this would come from the analytics
  const utmData = React.useMemo(() => {
    if (!analyticsData) return [];
    
    // Placeholder - in real application, this would analyze UTM params from events
    return [
      { source: 'google', medium: 'cpc', campaign: 'brand', users: 250, conversions: 42, conversionRate: 16.8 },
      { source: 'facebook', medium: 'social', campaign: 'retargeting', users: 180, conversions: 27, conversionRate: 15.0 },
      { source: 'instagram', medium: 'social', campaign: 'influencer', users: 120, conversions: 15, conversionRate: 12.5 },
      { source: 'direct', medium: 'none', campaign: 'none', users: 350, conversions: 22, conversionRate: 6.3 },
      { source: 'email', medium: 'email', campaign: 'newsletter', users: 85, conversions: 19, conversionRate: 22.3 }
    ];
  }, [analyticsData]);

  // Group data by source for pie chart
  const sourceData = React.useMemo(() => {
    return utmData.reduce((acc, item) => {
      const existingSource = acc.find(s => s.name === item.source);
      if (existingSource) {
        existingSource.value += item.users;
      } else {
        acc.push({ name: item.source || 'direct', value: item.users });
      }
      return acc;
    }, [] as { name: string; value: number; }[]);
  }, [utmData]);

  // Colors for the pie chart
  const COLORS = ['#8B5CF6', '#10b981', '#f59e0b', '#ef4444', '#0ea5e9', '#ec4899'];

  // Chart configuration
  const chartConfig: ChartConfig = {
    conversionRate: { 
      label: 'Taxa de Conversão (%)',
      theme: { light: '#8B5CF6', dark: '#A78BFA' }
    }
  };
  
  // Custom tooltip renderer
  const renderTooltipContent = (props: any) => {
    if (!props.active || !props.payload?.[0]) {
      return null;
    }
    
    const data = props.payload[0];
    
    return (
      <div className="bg-white p-3 border border-gray-100 shadow-lg rounded-md">
        <p className="text-xs font-medium mb-1">
          {data.name === 'value' ? props.label : data.name}
        </p>
        <p className="text-sm font-semibold">
          {data.value} {data.name === 'conversionRate' ? '%' : ''}
        </p>
      </div>
    );
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <p className="text-muted-foreground">Carregando dados de campanha...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <GridLayout columns={2} gap="md">
        <Card className="border border-border/60">
          <CardHeader className="pb-2">
            <CardTitle>Tráfego por Fonte</CardTitle>
            <CardDescription>Distribuição de usuários por fonte UTM</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sourceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={renderTooltipContent} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/60">
          <CardHeader className="pb-2">
            <CardTitle>Conversão por Campanha</CardTitle>
            <CardDescription>Taxas de conversão por campanha de marketing</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[220px]">
              <ChartContainer config={chartConfig}>
                <BarChart
                  data={utmData.filter(d => d.campaign && d.campaign !== 'none')}
                  margin={{ top: 15, right: 15, left: 15, bottom: 15 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="campaign"
                    tick={{ fill: '#888888', fontSize: 11 }}
                    tickLine={{ stroke: '#e0e0e0' }}
                  />
                  <YAxis 
                    label={{ value: 'Conversão %', angle: -90, position: 'insideLeft', fill: '#888888', fontSize: 12 }}
                    tick={{ fill: '#888888', fontSize: 11 }}
                  />
                  <Tooltip content={renderTooltipContent} />
                  <Legend />
                  <Bar 
                    dataKey="conversionRate" 
                    name="Taxa de Conversão (%)" 
                    radius={[4, 4, 0, 0]}
                    fill="#8B5CF6"
                  />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </GridLayout>

      <Card className="border border-border/60">
        <CardHeader className="pb-2">
          <CardTitle>Detalhes UTM</CardTitle>
          <CardDescription>Detalhamento dos parâmetros UTM e performance</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="rounded-md border border-border/60 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fonte</TableHead>
                  <TableHead>Meio</TableHead>
                  <TableHead>Campanha</TableHead>
                  <TableHead>Usuários</TableHead>
                  <TableHead>Conversões</TableHead>
                  <TableHead>Taxa de Conversão</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {utmData.length > 0 ? (
                  utmData.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell>{item.source || 'direct'}</TableCell>
                      <TableCell>{item.medium || 'none'}</TableCell>
                      <TableCell>{item.campaign || 'none'}</TableCell>
                      <TableCell>{item.users}</TableCell>
                      <TableCell>{item.conversions}</TableCell>
                      <TableCell>{item.conversionRate.toFixed(1)}%</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                      Nenhum dado UTM disponível.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
