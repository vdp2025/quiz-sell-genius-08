
import { ResultPageConfig } from '@/types/resultPageConfig';
import { Block } from '@/types/editor';
import { createDefaultConfig } from '@/utils/resultPageDefaults';

export const resultPageStorage = {
  saveConfig: (styleType: string, config: ResultPageConfig): boolean => {
    try {
      const key = `result_page_config_${styleType}`;
      localStorage.setItem(key, JSON.stringify({
        ...config,
        updatedAt: new Date().toISOString()
      }));
      return true;
    } catch (error) {
      console.error('Failed to save result page config:', error);
      return false;
    }
  },

  loadConfig: (styleType: string): ResultPageConfig | null => {
    try {
      const key = `result_page_config_${styleType}`;
      const saved = localStorage.getItem(key);
      
      if (saved) {
        return JSON.parse(saved);
      }
      
      return null;
    } catch (error) {
      console.error('Failed to load result page config:', error);
      return null;
    }
  },

  ensureConfig: (styleType: string): ResultPageConfig => {
    const config = resultPageStorage.loadConfig(styleType);
    
    if (config) {
      return config;
    }
    
    const defaultConfig = createDefaultConfig(styleType);
    resultPageStorage.saveConfig(styleType, defaultConfig);
    return defaultConfig;
  },

  getAllConfigs: (): Record<string, ResultPageConfig> => {
    const configs: Record<string, ResultPageConfig> = {};
    
    // Load all result page configs from localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      
      if (key?.startsWith('result_page_config_')) {
        try {
          const styleType = key.replace('result_page_config_', '');
          const config = JSON.parse(localStorage.getItem(key) || '');
          configs[styleType] = config;
        } catch (error) {
          console.error(`Failed to parse config for ${key}:`, error);
        }
      }
    }
    
    return configs;
  },

  deleteConfig: (styleType: string): boolean => {
    try {
      const key = `result_page_config_${styleType}`;
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Failed to delete result page config:', error);
      return false;
    }
  },

  exportAllConfigs: (): string => {
    const configs = resultPageStorage.getAllConfigs();
    return JSON.stringify(configs, null, 2);
  },

  importAllConfigs: (configsJson: string): boolean => {
    try {
      const configs: Record<string, ResultPageConfig> = JSON.parse(configsJson);
      
      Object.entries(configs).forEach(([styleType, config]) => {
        resultPageStorage.saveConfig(styleType, config);
      });
      
      return true;
    } catch (error) {
      console.error('Failed to import configs:', error);
      return false;
    }
  }
};
