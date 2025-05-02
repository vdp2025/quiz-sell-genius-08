
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { Progress } from '@/components/ui/progress';
import { GridLayout } from '@/components/shared/GridLayout';
import { getUserProgressData } from '@/utils/analyticsHelpers';

interface ProgressTabProps {
  analyticsData: any;
  loading: boolean;
}

export const ProgressTab: React.FC<ProgressTabProps> = ({
  analyticsData,
  loading
}) => {
  const userProgressData = React.useMemo(() => {
    if (!analyticsData?.events) return [];
    return getUserProgressData(analyticsData.events);
  }, [analyticsData]);
  
  // Chart configuration
  const chartConfig: ChartConfig = {
    uniqueUsers: { 
      label: 'Usuários Únicos',
      theme: { light: '#8B5CF6', dark: '#A78BFA' }
    }
  };
  
  // Color gradient for progress bars
  const getBarColor = (index: number, total: number) => {
    // Generate colors from purple to green
    const hue = 260 - (index / Math.max(1, total - 1) * 100);
    return `hsl(${hue}, 70%, 60%)`;
  };
  
  // Custom tooltip renderer
  const renderTooltipContent = (props: any) => {
    if (!props.active || !props.payload?.[0]) {
      return null;
    }
    
    const data = props.payload[0].payload;
    
    return (
      <div className="bg-white p-2 border border-gray-100 shadow-lg rounded-md">
        <p className="text-xs font-medium mb-0.5">Questão {data.questionId}</p>
        <p className="text-xs font-semibold">{data.uniqueUsers} usuários</p>
        <p className="text-[10px] text-gray-500 mt-0.5">{data.completionRate.toFixed(1)}% taxa de conclusão</p>
      </div>
    );
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <p className="text-muted-foreground">Carregando dados de progresso...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <GridLayout columns={1} gap="md">
        <Card className="border border-border/40 shadow-sm">
          <CardHeader className="pb-1.5">
            <CardTitle>Progresso por Questão</CardTitle>
            <CardDescription className="text-xs">Análise de quantos usuários alcançam cada pergunta no quiz</CardDescription>
          </CardHeader>
          <CardContent className="pt-1.5">
            <div className="h-[110px] mb-3">
              <ChartContainer config={chartConfig}>
                <BarChart 
                  data={userProgressData}
                  margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
                  <XAxis 
                    dataKey="questionId" 
                    stroke="#888888"
                    tick={{ fill: '#888888', fontSize: 9 }}
                    tickLine={{ stroke: '#e0e0e0' }}
                  />
                  <YAxis 
                    stroke="#888888"
                    tick={{ fill: '#888888', fontSize: 9 }}
                    tickLine={{ stroke: '#e0e0e0' }}
                  />
                  <Tooltip content={renderTooltipContent} />
                  <Legend wrapperStyle={{ fontSize: '10px', marginTop: '2px' }} />
                  <Bar 
                    dataKey="uniqueUsers" 
                    name="Usuários Únicos"
                    radius={[3, 3, 0, 0]}
                    animationDuration={1200}
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

            <div className="rounded-md border border-border/40 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Questão</TableHead>
                    <TableHead className="w-[80px]">Usuários</TableHead>
                    <TableHead className="w-[90px]">Respostas</TableHead>
                    <TableHead>Taxa de Conclusão</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userProgressData.map((item, index) => (
                    <TableRow key={item.questionId}>
                      <TableCell className="font-medium py-1.5 text-xs">
                        Q{index + 1}
                      </TableCell>
                      <TableCell className="py-1.5 text-xs">{item.uniqueUsers}</TableCell>
                      <TableCell className="py-1.5 text-xs">{item.totalAnswers}</TableCell>
                      <TableCell className="py-1.5">
                        <div className="flex items-center gap-2">
                          <Progress 
                            value={item.completionRate} 
                            className="h-1.5 w-[50px]"
                            indicatorClassName={`bg-[${getBarColor(index, userProgressData.length)}]`}
                          />
                          <span className="text-xs">{item.completionRate.toFixed(1)}%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {userProgressData.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-3 text-muted-foreground text-sm">
                        Nenhum dado de progresso disponível.
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
