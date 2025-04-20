
import { ResultPageConfig } from '@/types/resultPageConfig';
import { toast } from '@/components/ui/use-toast';

const LOCAL_STORAGE_KEY = 'result_page_configs';

export const resultPageStorage = {
  load: (styleType: string): ResultPageConfig | null => {
    try {
      const configsJson = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (configsJson) {
        const configs = JSON.parse(configsJson);
        return configs[styleType] || null;
      }
      return null;
    } catch (error) {
      console.error('Error loading result page config:', error);
      return null;
    }
  },

  save: async (config: ResultPageConfig): Promise<boolean> => {
    try {
      const configsJson = localStorage.getItem(LOCAL_STORAGE_KEY);
      let configs = {};
      
      if (configsJson) {
        configs = JSON.parse(configsJson);
      }
      
      configs = {
        ...configs,
        [config.styleType]: config
      };
      
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(configs));
      return true;
    } catch (error) {
      console.error('Error saving result page config:', error);
      toast({
        title: 'Erro ao salvar configuração',
        description: 'Não foi possível salvar a configuração da página de resultados',
        variant: 'destructive'
      });
      return false;
    }
  }
};
