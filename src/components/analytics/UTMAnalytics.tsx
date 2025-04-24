
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

export const UTMAnalytics = () => {
  const { data: utmData, isLoading } = useQuery({
    queryKey: ['utm-analytics'],
    queryFn: async () => {
      try {
        // Using any to bypass TypeScript constraints for tables not in the schema
        const { data, error } = await (supabase as any)
          .from('utm_analytics')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        return data as Array<{
          id: string;
          utm_source: string | null;
          utm_medium: string | null;
          utm_campaign: string | null;
          created_at: string;
        }>;
      } catch (error) {
        console.error("Error fetching UTM data:", error);
        return [];
      }
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const sourceData = (utmData || []).reduce<Array<{source: string, count: number}>>((acc, curr) => {
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
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sourceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="source" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#B89B7A" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
