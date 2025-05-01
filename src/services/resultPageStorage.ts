
import { ResultPageConfig } from '@/types/resultPageConfig';

export const resultPageStorage = {
  saveConfig: (styleType: string, config: ResultPageConfig) => {
    try {
      localStorage.setItem(`result_page_${styleType.toLowerCase()}`, JSON.stringify(config));
      return true;
    } catch (error) {
      console.error('Error saving result page config:', error);
      return false;
    }
  },
  
  loadConfig: (styleType: string): ResultPageConfig | null => {
    try {
      const stored = localStorage.getItem(`result_page_${styleType.toLowerCase()}`);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Error loading result page config:', error);
      return null;
    }
  },
  
  deleteConfig: (styleType: string) => {
    try {
      localStorage.removeItem(`result_page_${styleType.toLowerCase()}`);
      return true;
    } catch (error) {
      console.error('Error deleting result page config:', error);
      return false;
    }
  }
};
