
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { Progress } from '@/components/ui/progress';
import { GridLayout } from '@/components/shared/GridLayout';

interface ProgressTabProps {
  userProgressData: any[];
  chartConfig: ChartConfig;
  renderTooltipContent: (props: any) => JSX.Element | null;
}

export const ProgressTab: React.FC<ProgressTabProps> = ({
  userProgressData,
  chartConfig,
  renderTooltipContent
}) => {
  // Color gradient for progress bars
  const getBarColor = (index: number, total: number) => {
    // Generate colors from purple to green
    const hue = 260 - (index / (total - 1) * 100);
    return `hsl(${hue}, 70%, 60%)`;
  };

  return (
    <div className="space-y-4">
      <GridLayout columns={1} gap="md">
        <Card className="border border-border/60">
          <CardHeader className="pb-2">
            <CardTitle>Progress by Question</CardTitle>
            <CardDescription>Analysis of how many users reach each question in the quiz</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[220px] mb-4">
              <ChartContainer config={chartConfig}>
                <BarChart 
                  data={userProgressData}
                  margin={{ top: 15, right: 15, left: 15, bottom: 15 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
                  <XAxis 
                    dataKey="questionId" 
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
                  <Legend wrapperStyle={{ fontSize: '12px', marginTop: '5px' }} />
                  <Bar 
                    dataKey="uniqueUsers" 
                    name="Unique Users"
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                    animationEasing="ease-out"
                  >
                    {userProgressData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={getBarColor(index, userProgressData.length)}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ChartContainer>
            </div>

            <div className="rounded-md border border-border/60 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Question</TableHead>
                    <TableHead className="w-[80px]">Users</TableHead>
                    <TableHead className="w-[90px]">Answers</TableHead>
                    <TableHead>Completion Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userProgressData.map((item, index) => (
                    <TableRow key={item.questionId}>
                      <TableCell className="font-medium py-2">
                        Q{index + 1}
                      </TableCell>
                      <TableCell className="py-2">{item.uniqueUsers}</TableCell>
                      <TableCell className="py-2">{item.totalAnswers}</TableCell>
                      <TableCell className="py-2">
                        <div className="flex items-center gap-2">
                          <Progress 
                            value={item.completionRate} 
                            className="h-2 w-[60px]"
                            indicatorClassName={`bg-[${getBarColor(index, userProgressData.length)}]`}
                          />
                          <span className="text-xs">{item.completionRate.toFixed(1)}%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {userProgressData.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                        No progress data available.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </GridLayout>
    </div>
  );
};
