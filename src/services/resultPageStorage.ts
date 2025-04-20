
import { ResultPageConfig, ResultPageStorageService } from '@/types/resultPageConfig';
import { createDefaultConfig } from '@/utils/resultPageDefaults';

const STORAGE_KEY = 'quiz_result_page_configs';

const getConfigsFromStorage = (): Record<string, ResultPageConfig> => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Error loading configs from storage:', error);
    return {};
  }
};

const saveConfigsToStorage = (configs: Record<string, ResultPageConfig>): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(configs));
  } catch (error) {
    console.error('Error saving configs to storage:', error);
  }
};

export const resultPageStorage: ResultPageStorageService = {
  save: async (config: ResultPageConfig): Promise<boolean> => {
    try {
      const configs = getConfigsFromStorage();
      configs[config.styleType] = config;
      saveConfigsToStorage(configs);
      return true;
    } catch (error) {
      console.error('Error saving config:', error);
      return false;
    }
  },

  load: (styleType: string): ResultPageConfig | null => {
    try {
      const configs = getConfigsFromStorage();
      return configs[styleType] || null;
    } catch (error) {
      console.error('Error loading config:', error);
      return null;
    }
  },

  delete: (styleType: string): void => {
    try {
      const configs = getConfigsFromStorage();
      delete configs[styleType];
      saveConfigsToStorage(configs);
    } catch (error) {
      console.error('Error deleting config:', error);
    }
  },

  getAll: (): Record<string, ResultPageConfig> => {
    return getConfigsFromStorage();
  }
};
