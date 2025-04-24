
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { supabase } from '@/integrations/supabase/client';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';

export const QuizMetrics = () => {
  const { data: participantsData, isLoading: isLoadingParticipants, error: participantsError } = useQuery({
    queryKey: ['participants-metrics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('quiz_participants')
        .select('*')
        .order('created_at', { ascending: false });

      console.log('Participants Data:', data);
      console.log('Participants Error:', error);

      if (error) throw error;
      return data;
    },
  });

  const { data: analyticsData, isLoading: isLoadingAnalytics, error: analyticsError } = useQuery({
    queryKey: ['quiz-analytics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('quiz_analytics')
        .select('*')
        .order('created_at', { ascending: true });

      console.log('Analytics Data:', data);
      console.log('Analytics Error:', error);

      if (error) throw error;
      return data;
    },
  });

  if (isLoadingParticipants || isLoadingAnalytics) {
    console.log('Loading metrics...');
    return <div className="p-4">Carregando métricas...</div>;
  }

  if (participantsError || analyticsError) {
    console.error('Error fetching metrics:', participantsError || analyticsError);
    return <div className="p-4 text-red-500">Erro ao carregar métricas</div>;
  }

  const completionRate = participantsData ? {
    total: participantsData.length,
    completed: participantsData.filter(p => p.completed).length,
    rate: participantsData.length > 0 
      ? ((participantsData.filter(p => p.completed).length / participantsData.length) * 100).toFixed(1)
      : 0
  } : { total: 0, completed: 0, rate: 0 };

  const progressData = participantsData ? 
    participantsData.reduce((acc: any[], participant) => {
      const existingProgress = acc.find(p => p.progress === participant.progress_percentage);
      if (existingProgress) {
        existingProgress.count += 1;
      } else {
        acc.push({ progress: participant.progress_percentage || 0, count: 1 });
      }
      return acc.sort((a, b) => a.progress - b.progress);
    }, []) : [];

  return (
    <div className="space-y-8">
      {/* Taxa de Conclusão */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-medium text-[#432818] mb-4">Visão Geral</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#FAF9F7] p-4 rounded-lg">
            <p className="text-sm text-[#8F7A6A]">Total de Participantes</p>
            <p className="text-2xl font-bold text-[#432818]">{completionRate.total}</p>
          </div>
          <div className="bg-[#FAF9F7] p-4 rounded-lg">
            <p className="text-sm text-[#8F7A6A]">Completaram o Quiz</p>
            <p className="text-2xl font-bold text-[#432818]">{completionRate.completed}</p>
          </div>
          <div className="bg-[#FAF9F7] p-4 rounded-lg">
            <p className="text-sm text-[#8F7A6A]">Taxa de Conclusão</p>
            <p className="text-2xl font-bold text-[#432818]">{completionRate.rate}%</p>
          </div>
        </div>
      </div>

      {/* Gráfico de Progresso */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-medium text-[#432818] mb-4">Distribuição de Progresso</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="progress" label={{ value: 'Progresso (%)', position: 'bottom' }} />
              <YAxis label={{ value: 'Participantes', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#B89B7A" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Lista de Participantes Recentes */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-medium text-[#432818] mb-4">Participantes Recentes</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Progresso</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Início</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {participantsData?.slice(0, 10).map((participant) => (
                <TableRow key={participant.id}>
                  <TableCell>{participant.name}</TableCell>
                  <TableCell>{participant.email || '-'}</TableCell>
                  <TableCell>{participant.progress_percentage || 0}%</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      participant.completed 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {participant.completed ? 'Completado' : 'Em Progresso'}
                    </span>
                  </TableCell>
                  <TableCell>
                    {new Date(participant.started_at).toLocaleDateString('pt-BR')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
