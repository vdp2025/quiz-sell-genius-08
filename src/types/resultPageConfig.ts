
import { Block } from './editor';
import { StyleResult } from './quiz';

export interface StyleOptions {
  backgroundColor?: string;
  textColor?: string;
  padding?: string;
  textAlign?: 'left' | 'center' | 'right';
  borderRadius?: string;
  boxShadow?: string;
  margin?: string;
  [key: string]: any;
}

export interface SectionConfig {
  visible: boolean;
  content: Record<string, any>;
  style: StyleOptions;
}

export interface Section extends SectionConfig {
  title: string;
  description?: string;
}

export interface OfferContent {
  title?: string;
  subtitle?: string;
  price?: string;
  regularPrice?: string;
  ctaText?: string;
  ctaUrl?: string;
  heroImage?: string;
  heroImage2?: string;
  [key: string]: any;
}

export interface OfferSection extends SectionConfig {
  content: OfferContent;
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
