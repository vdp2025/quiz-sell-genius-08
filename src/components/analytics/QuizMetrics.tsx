
import React, { useEffect } from 'react';
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
import { LoadingState } from '@/components/ui/loading-state';

export const QuizMetrics = () => {
  // Verificar a conexão com o Supabase primeiro
  useEffect(() => {
    const checkSupabaseConnection = async () => {
      try {
        const { data, error } = await supabase.from('quiz_participants').select('count');
        console.log('Supabase connection test:', { data, error });
        
        if (error) {
          console.error('Supabase connection error:', error);
        } else {
          console.log('Supabase connection successful');
        }
      } catch (error) {
        console.error('Supabase connection exception:', error);
      }
    };
    
    checkSupabaseConnection();
  }, []);

  const { data: participantsData, isLoading: isLoadingParticipants, error: participantsError } = useQuery({
    queryKey: ['participants-metrics'],
    queryFn: async () => {
      console.log('Fetching participants data...');
      try {
        const { data, error } = await supabase
          .from('quiz_participants')
          .select('*')
          .order('created_at', { ascending: false });

        console.log('Participants Query Response:', { data, error });

        if (error) {
          console.error('Participants fetch error:', error);
          throw error;
        }
        
        console.log(`Participants data loaded: ${data?.length || 0} records`);
        return data || [];
      } catch (err) {
        console.error('Exception in participants fetch:', err);
        throw err;
      }
    },
  });

  const { data: analyticsData, isLoading: isLoadingAnalytics, error: analyticsError } = useQuery({
    queryKey: ['quiz-analytics'],
    queryFn: async () => {
      console.log('Fetching analytics data...');
      try {
        const { data, error } = await supabase
          .from('quiz_analytics')
          .select('*')
          .order('created_at', { ascending: true });

        console.log('Analytics Query Response:', { data, error });

        if (error) {
          console.error('Analytics fetch error:', error);
          throw error;
        }
        
        console.log(`Analytics data loaded: ${data?.length || 0} records`);
        return data || [];
      } catch (err) {
        console.error('Exception in analytics fetch:', err);
        throw err;
      }
    },
  });

  if (isLoadingParticipants || isLoadingAnalytics) {
    console.log('Loading metrics...', { 
      participantsLoading: isLoadingParticipants, 
      analyticsLoading: isLoadingAnalytics 
    });
    return <LoadingState message="Carregando métricas..." />;
  }

  if (participantsError || analyticsError) {
    console.error('Error fetching metrics:', { participantsError, analyticsError });
    return (
      <div className="p-8 text-center">
        <div className="text-red-500 mb-4">Erro ao carregar métricas</div>
        <div className="text-sm text-gray-500">
          {(participantsError as Error)?.message || (analyticsError as Error)?.message || 'Erro desconhecido'}
        </div>
      </div>
    );
  }

  console.log('Rendering metrics with data:', {
    participantsCount: participantsData?.length || 0,
    analyticsCount: analyticsData?.length || 0
  });

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

  // Se não houver dados, exibir uma mensagem informativa
  if ((participantsData?.length || 0) === 0) {
    return (
      <div className="p-8 text-center bg-white rounded-lg shadow-sm">
        <h2 className="text-lg font-medium text-[#432818] mb-4">Nenhum dado disponível</h2>
        <p className="text-[#8F7A6A] mb-4">
          Não encontramos dados de participantes do quiz.
          Quando os usuários começarem a responder o quiz, os dados aparecerão aqui.
        </p>
      </div>
    );
  }

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
          {progressData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="progress" label={{ value: 'Progresso (%)', position: 'bottom' }} />
                <YAxis label={{ value: 'Participantes', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#B89B7A" />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-[#8F7A6A]">
              Não há dados suficientes para gerar o gráfico
            </div>
          )}
        </div>
      </div>

      {/* Lista de Participantes Recentes */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-medium text-[#432818] mb-4">Participantes Recentes</h2>
        {participantsData && participantsData.length > 0 ? (
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
                {participantsData.slice(0, 10).map((participant) => (
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
        ) : (
          <div className="p-4 text-center text-[#8F7A6A]">
            Nenhum participante registrado ainda
          </div>
        )}
      </div>
    </div>
  );
};
