
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
      const { data, error } = await supabase
        .from('utm_analytics')
        .select('utm_source, utm_medium, utm_campaign')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const sourceData = utmData?.reduce((acc: any[], curr) => {
    const existingSource = acc.find(item => item.source === curr.utm_source);
    if (existingSource) {
      existingSource.count += 1;
    } else {
      acc.push({ source: curr.utm_source || 'Direct', count: 1 });
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
