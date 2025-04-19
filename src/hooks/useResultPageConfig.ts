
import { useState, useEffect, useCallback } from 'react';
import { ResultPageConfig } from '@/types/resultPageConfig';
import { toast } from '@/components/ui/use-toast';
import { createDefaultConfig } from '@/utils/resultPageDefaults';
import { resultPageStorage } from '@/services/resultPageStorage';
import { set, get } from 'lodash';

export const useResultPageConfig = (styleType: string) => {
  const [resultPageConfig, setResultPageConfig] = useState<ResultPageConfig>(createDefaultConfig(styleType));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadConfig = async () => {
      setLoading(true);
      try {
        const savedConfig = resultPageStorage.load(styleType);
        if (savedConfig) {
          setResultPageConfig(savedConfig);
        } else {
          setResultPageConfig(createDefaultConfig(styleType));
        }
      } catch (error) {
        console.error('Error loading result page config:', error);
        toast({
          title: 'Erro ao carregar configuração',
          description: 'Não foi possível carregar a configuração da página de resultados',
          variant: 'destructive'
        });
        setResultPageConfig(createDefaultConfig(styleType));
      } finally {
        setLoading(false);
      }
    };
    
    loadConfig();
  }, [styleType]);

  const updateSection = useCallback((path: string, newContent: any) => {
    setResultPageConfig(prevConfig => {
      const newConfig = { ...prevConfig };
      set(newConfig, path, newContent);
      return newConfig;
    });
  }, []);

  const resetConfig = useCallback((styleType: string) => {
    setResultPageConfig(createDefaultConfig(styleType));
  }, []);

  // Modified to return Promise<void> instead of Promise<boolean>
  const saveConfig = useCallback(async (): Promise<void> => {
    try {
      await resultPageStorage.save(resultPageConfig);
      toast({
        title: "Configuração salva",
        description: "As alterações foram salvas com sucesso",
        variant: "default"
      });
    } catch (error) {
      console.error('Error saving result page config:', error);
      toast({
        title: 'Erro ao salvar configuração',
        description: 'Não foi possível salvar a configuração da página de resultados',
        variant: 'destructive'
      });
    }
  }, [resultPageConfig]);

  return {
    resultPageConfig,
    updateSection,
    resetConfig,
    saveConfig,
    loading
  };
};
