
import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface TrackingConfig {
  facebook_pixel_id: string;
  google_analytics_id: string;
  active: boolean;
}

export const TrackingConfigForm = () => {
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors } } = useForm<TrackingConfig>();

  const onSubmit = async (data: TrackingConfig) => {
    try {
      const { error } = await supabase
        .from('tracking_config')
        .upsert({ 
          facebook_pixel_id: data.facebook_pixel_id,
          google_analytics_id: data.google_analytics_id,
          active: data.active,
          updated_at: new Date().toISOString()
        });

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
    }
  };

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
