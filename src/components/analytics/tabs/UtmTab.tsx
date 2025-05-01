
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
  utmData: UtmData[];
  chartConfig: ChartConfig;
  renderTooltipContent: (props: any) => JSX.Element | null;
}

export const UtmTab: React.FC<UtmTabProps> = ({
  utmData,
  chartConfig,
  renderTooltipContent
}) => {
  // Group data by source for pie chart
  const sourceData = utmData.reduce((acc, item) => {
    const existingSource = acc.find(s => s.name === item.source);
    if (existingSource) {
      existingSource.value += item.users;
    } else {
      acc.push({ name: item.source || 'direct', value: item.users });
    }
    return acc;
  }, [] as { name: string; value: number; }[]);

  // Colors for the pie chart
  const COLORS = ['#8B5CF6', '#10b981', '#f59e0b', '#ef4444', '#0ea5e9', '#ec4899'];

  return (
    <div className="space-y-4">
      <GridLayout columns={2} gap="md">
        <Card className="border border-border/60">
          <CardHeader className="pb-2">
            <CardTitle>Traffic by Source</CardTitle>
            <CardDescription>Distribution of users by UTM source</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[250px]">
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
            <CardTitle>Conversion by Campaign</CardTitle>
            <CardDescription>Conversion rates by marketing campaign</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[250px]">
              <ChartContainer config={chartConfig}>
                <BarChart
                  data={utmData.filter(d => d.campaign && d.campaign !== 'none')}
                  margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="campaign"
                    tick={{ fill: '#888888', fontSize: 11 }}
                    tickLine={{ stroke: '#e0e0e0' }}
                  />
                  <YAxis 
                    label={{ value: 'Conversion %', angle: -90, position: 'insideLeft', fill: '#888888', fontSize: 12 }}
                    tick={{ fill: '#888888', fontSize: 11 }}
                  />
                  <Tooltip content={renderTooltipContent} />
                  <Legend />
                  <Bar 
                    dataKey="conversionRate" 
                    name="Conversion Rate (%)" 
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
          <CardTitle>UTM Details</CardTitle>
          <CardDescription>Detailed breakdown of UTM parameters and performance</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="rounded-md border border-border/60 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Source</TableHead>
                  <TableHead>Medium</TableHead>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Users</TableHead>
                  <TableHead>Conversions</TableHead>
                  <TableHead>Conversion Rate</TableHead>
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
                      No UTM data available.
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
