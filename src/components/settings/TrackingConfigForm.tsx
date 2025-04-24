
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

interface TrackingConfig {
  facebook_pixel_id: string;
  google_analytics_id: string;
  active: boolean;
}

export const TrackingConfigForm = () => {
  const { toast } = useToast();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<TrackingConfig>();

  const { data: configData, isLoading } = useQuery({
    queryKey: ['tracking-config'],
    queryFn: async () => {
      try {
        // Using any to bypass TypeScript constraints for tables not in the schema
        const { data, error } = await (supabase as any)
          .from('tracking_config')
          .select('*')
          .limit(1)
          .single();

        if (error && error.code !== 'PGRST116') throw error;
        
        return data as {
          id: string;
          facebook_pixel_id: string | null;
          google_analytics_id: string | null;
          active: boolean | null;
        } | null;
      } catch (error) {
        console.error("Error fetching tracking config:", error);
        return null;
      }
    },
  });

  useEffect(() => {
    if (configData) {
      reset({
        facebook_pixel_id: configData.facebook_pixel_id || '',
        google_analytics_id: configData.google_analytics_id || '',
        active: configData.active || false
      });
    }
  }, [configData, reset]);

  const onSubmit = async (data: TrackingConfig) => {
    try {
      // Using any to bypass TypeScript constraints for tables not in the schema
      const { error } = await (supabase as any)
        .from('tracking_config')
        .upsert({
          id: configData?.id,
          facebook_pixel_id: data.facebook_pixel_id,
          google_analytics_id: data.google_analytics_id,
          active: data.active,
          updated_at: new Date().toISOString()
        }, { onConflict: 'id' });

      if (error) throw error;

      toast({
        title: "Configurações salvas",
        description: "As configurações de tracking foram atualizadas com sucesso."
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível salvar as configurações.",
        variant: "destructive"
      });
      console.error("Error saving tracking config:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-[#432818]">Facebook Pixel ID</label>
          <Input
            {...register('facebook_pixel_id')}
            placeholder="Insira o Facebook Pixel ID"
            className="mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-[#432818]">Google Analytics ID</label>
          <Input
            {...register('google_analytics_id')}
            placeholder="Insira o Google Analytics ID"
            className="mt-1"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch {...register('active')} id="active" />
          <label htmlFor="active" className="text-sm font-medium text-[#432818]">
            Ativar tracking
          </label>
        </div>
      </div>

      <Button type="submit" className="bg-[#B89B7A] hover:bg-[#8F7A6A]">
        Salvar configurações
      </Button>
    </form>
  );
};
