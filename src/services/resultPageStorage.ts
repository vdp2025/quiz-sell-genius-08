
import { ResultPageConfig } from '@/types/resultPageConfig';

export const resultPageStorage = {
  save: (config: ResultPageConfig): Promise<boolean> => {
    return new Promise((resolve) => {
      try {
        const key = `result-page-config-${config.styleType.toLowerCase()}`;
        localStorage.setItem(key, JSON.stringify(config));
        console.log(`Saved config for ${config.styleType}:`, config);
        resolve(true);
      } catch (error) {
        console.error('Error saving config:', error);
        resolve(false);
      }
    });
  },

  load: (styleType: string): ResultPageConfig | null => {
    try {
      const key = `result-page-config-${styleType.toLowerCase()}`;
      const savedConfig = localStorage.getItem(key);
      
      if (savedConfig) {
        const parsedConfig = JSON.parse(savedConfig);
        console.log(`Loaded config for ${styleType}:`, parsedConfig);
        return parsedConfig;
      }
      return null;
    } catch (error) {
      console.error('Error loading config:', error);
      return null;
    }
  },
  
  delete: (styleType: string): boolean => {
    try {
      const key = `result-page-config-${styleType.toLowerCase()}`;
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error deleting config:', error);
      return false;
    }
  }
};
