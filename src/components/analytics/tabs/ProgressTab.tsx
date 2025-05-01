
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
            <div className="h-[260px]">
              <ChartContainer config={chartConfig}>
                <BarChart 
                  data={userProgressData}
                  margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
                  <XAxis 
                    dataKey="questionId" 
                    label={{ value: 'Question', position: 'insideBottom', offset: -10, fill: '#888888' }}
                    stroke="#888888"
                    tick={{ fill: '#888888', fontSize: 12 }}
                    tickLine={{ stroke: '#e0e0e0' }}
                  />
                  <YAxis 
                    label={{ value: 'Users', angle: -90, position: 'insideLeft', offset: 5, fill: '#888888' }}
                    stroke="#888888"
                    tick={{ fill: '#888888', fontSize: 12 }}
                    tickLine={{ stroke: '#e0e0e0' }}
                  />
                  <Tooltip content={renderTooltipContent} />
                  <Legend />
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

            <div className="mt-4 rounded-md border border-border/60 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[150px]">Question</TableHead>
                    <TableHead>Unique Users</TableHead>
                    <TableHead>Total Answers</TableHead>
                    <TableHead>Completion Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userProgressData.map((item, index) => (
                    <TableRow key={item.questionId}>
                      <TableCell className="font-medium">
                        Q{index + 1} ({item.questionId})
                      </TableCell>
                      <TableCell>{item.uniqueUsers}</TableCell>
                      <TableCell>{item.totalAnswers}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress 
                            value={item.completionRate} 
                            className="h-2 w-[60px]"
                            indicatorClassName={`bg-[${getBarColor(index, userProgressData.length)}]`}
                          />
                          <span>{item.completionRate.toFixed(1)}%</span>
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
