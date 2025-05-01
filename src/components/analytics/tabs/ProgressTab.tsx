
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { Progress } from '@/components/ui/progress';

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
    // Gradient from blue to red based on position
    const hue = 240 - (index / (total - 1) * 160);
    return `hsl(${hue}, 80%, 60%)`;
  };

  return (
    <div className="space-y-6">
      <Card className="border border-border/60">
        <CardHeader>
          <CardTitle>Progresso por Questão</CardTitle>
          <CardDescription>Análise de quantos usuários chegam a cada questão do quiz</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ChartContainer config={chartConfig}>
              <BarChart 
                data={userProgressData}
                margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
                <XAxis 
                  dataKey="questionId" 
                  label={{ value: 'Questão', position: 'insideBottom', offset: -15, fill: '#888888' }}
                  stroke="#888888"
                  tick={{ fill: '#888888', fontSize: 12 }}
                  tickLine={{ stroke: '#e0e0e0' }}
                />
                <YAxis 
                  label={{ value: 'Usuários', angle: -90, position: 'insideLeft', offset: 10, fill: '#888888' }}
                  stroke="#888888"
                  tick={{ fill: '#888888', fontSize: 12 }}
                  tickLine={{ stroke: '#e0e0e0' }}
                />
                <Tooltip content={renderTooltipContent} />
                <Legend />
                <Bar 
                  dataKey="uniqueUsers" 
                  name="Usuários Únicos"
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

          <div className="mt-6 rounded-md border border-border/60">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Questão</TableHead>
                  <TableHead>Usuários Únicos</TableHead>
                  <TableHead>Total de Respostas</TableHead>
                  <TableHead>Taxa de Completude</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userProgressData.map((item, index) => (
                  <TableRow key={item.questionId}>
                    <TableCell className="font-medium">
                      Questão {index + 1} ({item.questionId})
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
                    <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                      Nenhum dado de progresso disponível.
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
