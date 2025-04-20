
import { useState, useEffect, useCallback } from 'react';
import { ResultPageConfig } from '@/types/resultPageConfig';
import { toast } from '@/components/ui/use-toast';
import { createDefaultConfig } from '@/utils/resultPageDefaults';
import { resultPageStorage } from '@/services/resultPageStorage';
import { set, get, merge } from 'lodash';

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

  const saveConfig = useCallback(async () => {
    try {
      await resultPageStorage.save(resultPageConfig);
      toast({
        title: 'Configuração salva',
        description: 'A configuração da página de resultados foi salva com sucesso',
      });
      return true;
    } catch (error) {
      console.error('Error saving config:', error);
      toast({
        title: 'Erro ao salvar configuração',
        description: 'Não foi possível salvar a configuração da página de resultados',
        variant: 'destructive'
      });
      return false;
    }
  }, [resultPageConfig]);

  const importConfig = useCallback((importedConfig: any) => {
    try {
      // Ensure the imported config has the correct styleType
      const configToImport = {
        ...importedConfig,
        styleType: styleType
      };
      
      setResultPageConfig(configToImport);
      return true;
    } catch (error) {
      console.error('Error importing config:', error);
      toast({
        title: 'Erro ao importar configuração',
        description: 'O formato da configuração importada não é válido',
        variant: 'destructive'
      });
      return false;
    }
  }, [styleType]);

  return {
    resultPageConfig,
    updateSection,
    resetConfig,
    saveConfig,
    importConfig,
    loading
  };
};
