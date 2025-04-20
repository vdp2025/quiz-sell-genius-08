
import { Block } from './editor';
import { StyleResult } from './quiz';

export interface SectionConfig {
  visible: boolean;
  content: Record<string, any>;
  style: Record<string, any>;
}

export interface OfferConfig {
  hero: SectionConfig;
  products: SectionConfig;
  benefits: SectionConfig;
  pricing: SectionConfig;
  testimonials: SectionConfig;
  guarantee: SectionConfig;
}

export interface ResultPageConfig {
  styleType: string;
  header: SectionConfig;
  mainContent: SectionConfig;
  secondaryStyles: SectionConfig;
  offer: OfferConfig;
  blocks: Block[];
  globalStyles: {
    fontFamily?: string;
    primaryColor?: string;
    secondaryColor?: string;
    backgroundColor?: string;
    textColor?: string;
    headingColor?: string;
    [key: string]: any;
  };
}

export interface ResultPageStorageService {
  save: (config: ResultPageConfig) => Promise<boolean>;
  load: (styleType: string) => ResultPageConfig | null;
  delete: (styleType: string) => void;
  getAll: () => Record<string, ResultPageConfig>;
}
