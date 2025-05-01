
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';

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
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Progresso por Questão</CardTitle>
          <CardDescription>Análise de quantos usuários chegam a cada questão do quiz</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ChartContainer config={chartConfig}>
              <BarChart data={userProgressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="questionId" label={{ value: 'Questão', position: 'insideBottom', offset: -5 }} />
                <YAxis label={{ value: 'Número de Usuários', angle: -90, position: 'insideLeft' }} />
                <Tooltip content={renderTooltipContent} />
                <Legend />
                <Bar dataKey="uniqueUsers" fill="#4f46e5" name="Usuários Únicos" />
              </BarChart>
            </ChartContainer>
          </div>

          <div className="mt-6 rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Questão</TableHead>
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
                    <TableCell>{item.completionRate.toFixed(1)}%</TableCell>
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
