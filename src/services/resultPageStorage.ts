
import { ResultPageConfig, ResultPageConfigsStore } from '@/types/resultPageConfig';

// Save result page configuration
export const resultPageStorage = {
  saveConfig: (styleType: string, config: ResultPageConfig): boolean => {
    try {
      let configs: Record<string, ResultPageConfig> = {};
      
      const savedConfigs = localStorage.getItem('result_page_configs');
      if (savedConfigs) {
        configs = JSON.parse(savedConfigs);
      }
      
      configs[styleType] = config;
      
      localStorage.setItem('result_page_configs', JSON.stringify(configs));
      return true;
    } catch (error) {
      console.error('Error saving result page config:', error);
      return false;
    }
  },
  
  loadConfig: (styleType: string): ResultPageConfig | null => {
    try {
      const savedConfigs = localStorage.getItem('result_page_configs');
      if (savedConfigs) {
        const configs = JSON.parse(savedConfigs);
        return configs[styleType] || null;
      }
      return null;
    } catch (error) {
      console.error('Error loading result page config:', error);
      return null;
    }
  },
  
  getAllConfigs: (): Record<string, ResultPageConfig> => {
    try {
      const savedConfigs = localStorage.getItem('result_page_configs');
      if (savedConfigs) {
        return JSON.parse(savedConfigs);
      }
      return {};
    } catch (error) {
      console.error('Error loading all result page configs:', error);
      return {};
    }
  },
  
  deleteConfig: (styleType: string): boolean => {
    try {
      const savedConfigs = localStorage.getItem('result_page_configs');
      if (savedConfigs) {
        const configs = JSON.parse(savedConfigs);
        if (configs[styleType]) {
          delete configs[styleType];
          localStorage.setItem('result_page_configs', JSON.stringify(configs));
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Error deleting result page config:', error);
      return false;
    }
  }
};
