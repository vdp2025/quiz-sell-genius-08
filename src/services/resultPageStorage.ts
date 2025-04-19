
import { ResultPageConfig } from '@/types/resultPageConfig';
import { createDefaultConfig } from '@/utils/resultPageDefaults';

// In memory storage for development - would be replaced with actual API calls
let resultPageConfigs: Record<string, ResultPageConfig> = {};

export const resultPageStorage = {
  // Save result page config
  save: async (config: ResultPageConfig): Promise<void> => {
    // In a real implementation, this would be an API call
    resultPageConfigs[config.styleType] = {...config};
    
    // Save to localStorage for persistence through refreshes
    localStorage.setItem(`resultPage_${config.styleType}`, JSON.stringify(config));
    
    // Artificial delay to simulate network
    await new Promise(resolve => setTimeout(resolve, 300));
  },
  
  // Load result page config by style type
  load: (styleType: string): ResultPageConfig | null => {
    // First check our in-memory cache
    if (resultPageConfigs[styleType]) {
      return resultPageConfigs[styleType];
    }
    
    // Then check localStorage
    const storedConfig = localStorage.getItem(`resultPage_${styleType}`);
    if (storedConfig) {
      const config = JSON.parse(storedConfig) as ResultPageConfig;
      resultPageConfigs[styleType] = config; // Update in-memory cache
      return config;
    }
    
    // If no saved config exists, create and save a default one
    const defaultConfig = createDefaultConfig(styleType);
    resultPageConfigs[styleType] = defaultConfig;
    localStorage.setItem(`resultPage_${styleType}`, JSON.stringify(defaultConfig));
    
    return defaultConfig;
  },
  
  // Delete result page config
  delete: async (styleType: string): Promise<void> => {
    // In a real implementation, this would be an API call
    delete resultPageConfigs[styleType];
    localStorage.removeItem(`resultPage_${styleType}`);
    
    // Artificial delay to simulate network
    await new Promise(resolve => setTimeout(resolve, 300));
  },
  
  // Reset result page config to default
  reset: async (styleType: string): Promise<void> => {
    const defaultConfig = createDefaultConfig(styleType);
    resultPageConfigs[styleType] = defaultConfig;
    localStorage.setItem(`resultPage_${styleType}`, JSON.stringify(defaultConfig));
    
    // Artificial delay to simulate network
    await new Promise(resolve => setTimeout(resolve, 300));
  }
};
