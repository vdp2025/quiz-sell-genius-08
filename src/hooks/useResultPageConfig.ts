
import { useState, useEffect, useCallback } from 'react';
import { ResultPageConfig } from '@/types/resultPageConfig';
import { toast } from '@/components/ui/use-toast';
import { createDefaultConfig } from '@/utils/resultPageDefaults';
import { resultPageStorage } from '@/services/resultPageStorage';
import { set } from 'lodash';

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

  const updateSection = useCallback((path: string, newSection: any) => {
    setResultPageConfig(prevConfig => {
      const newConfig = { ...prevConfig };
      set(newConfig, path, newSection);
      return newConfig;
    });
  }, []);

  const resetConfig = useCallback((styleType: string) => {
    setResultPageConfig(createDefaultConfig(styleType));
  }, []);

  const saveConfig = useCallback(async () => {
    return await resultPageStorage.save(resultPageConfig);
  }, [resultPageConfig]);

  return {
    resultPageConfig,
    updateSection,
    resetConfig,
    saveConfig,
    loading
  };
};
