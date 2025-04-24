
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { LoadingState } from '@/components/ui/loading-state';

export const UTMAnalytics = () => {
  const { data: utmData, isLoading, error } = useQuery({
    queryKey: ['utm-analytics'],
    queryFn: async () => {
      console.log('Fetching UTM data...');
      try {
        // Using any to bypass TypeScript constraints for tables not in the schema
        const { data, error } = await (supabase as any)
          .from('utm_analytics')
          .select('*')
          .order('created_at', { ascending: false });

        console.log('UTM Query Response:', { data, error });

        if (error) {
          console.error('UTM fetch error:', error);
          throw error;
        }
        
        console.log(`UTM data loaded: ${data?.length || 0} records`);
        return data as Array<{
          id: string;
          utm_source: string | null;
          utm_medium: string | null;
          utm_campaign: string | null;
          created_at: string;
        }> || [];
      } catch (err) {
        console.error('Exception in UTM fetch:', err);
        throw err;
      }
    },
  });

  if (isLoading) {
    return <LoadingState message="Carregando dados UTM..." />;
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <div className="text-red-500 mb-4">Erro ao carregar dados UTM</div>
        <div className="text-sm text-gray-500">
          {(error as Error)?.message || 'Erro desconhecido'}
        </div>
      </div>
    );
  }

  // Se não houver dados UTM
  if (!utmData || utmData.length === 0) {
    return (
      <div className="p-8 text-center bg-white rounded-lg shadow-sm">
        <h2 className="text-lg font-medium text-[#432818] mb-4">Nenhum dado UTM disponível</h2>
        <p className="text-[#8F7A6A]">
          Não encontramos dados UTM para análise.
          Quando os usuários acessarem o quiz com parâmetros UTM, os dados aparecerão aqui.
        </p>
      </div>
    );
  }

  const sourceData = utmData.reduce<Array<{source: string, count: number}>>((acc, curr) => {
    const source = curr.utm_source || 'Direct';
    const existingSource = acc.find(item => item.source === source);
    
    if (existingSource) {
      existingSource.count += 1;
    } else {
      acc.push({ source, count: 1 });
    }
    return acc;
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-medium text-[#432818] mb-4">Fontes de Tráfego</h2>
        <div className="h-[400px]">
          {sourceData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sourceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="source" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#B89B7A" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-[#8F7A6A]">
              Não há fontes de tráfego suficientes para gerar o gráfico
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
