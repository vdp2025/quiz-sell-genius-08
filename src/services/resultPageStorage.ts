
import { ResultPageConfig } from '@/types/resultPageConfig';

const STORAGE_PREFIX = 'quiz_result_config_';

export const resultPageStorage = {
  /**
   * Salva a configuração da página de resultado
   */
  save: (config: ResultPageConfig): boolean => {
    try {
      const key = `${STORAGE_PREFIX}${config.styleType}`;
      localStorage.setItem(key, JSON.stringify(config));
      return true;
    } catch (error) {
      console.error('Erro ao salvar configuração da página de resultado:', error);
      return false;
    }
  },
  
  /**
   * Carrega a configuração da página de resultado
   */
  load: (styleType: string): ResultPageConfig | null => {
    try {
      const key = `${STORAGE_PREFIX}${styleType}`;
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error('Erro ao carregar configuração da página de resultado:', error);
      return null;
    }
  },
  
  /**
   * Remove a configuração da página de resultado
   */
  remove: (styleType: string): boolean => {
    try {
      const key = `${STORAGE_PREFIX}${styleType}`;
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Erro ao remover configuração da página de resultado:', error);
      return false;
    }
  },
  
  /**
   * Lista todas as configurações de página de resultado salvas
   */
  listAll: (): { styleType: string, config: ResultPageConfig }[] => {
    try {
      const results: { styleType: string, config: ResultPageConfig }[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(STORAGE_PREFIX)) {
          const styleType = key.replace(STORAGE_PREFIX, '');
          const config = JSON.parse(localStorage.getItem(key) || '{}');
          results.push({ styleType, config });
        }
      }
      return results;
    } catch (error) {
      console.error('Erro ao listar configurações de página de resultado:', error);
      return [];
    }
  }
};
