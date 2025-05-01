
import { Block } from './editor';

export interface StyleOptions {
  primaryColor?: string;
  secondaryColor?: string;
  textColor?: string;
  backgroundColor?: string;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: 'normal' | 'bold' | 'light';
  lineHeight?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  borderRadius?: 'none' | 'small' | 'medium' | 'large';
  padding?: string;
  margin?: string;
  spacing?: 'compact' | 'comfortable' | 'spacious';
  [key: string]: any;
}

export interface ResultPageConfig {
  title: string;
  description: string;
  blocks: Block[];
  globalStyles?: Partial<StyleOptions>;
  styleType: string;
  createdAt: string;
  updatedAt: string;
  customCode?: string;
  scriptTags?: string[];
  metaTags?: Record<string, string>;
  offer?: OfferSection;
  header?: Section;
  mainContent?: Section;
  [key: string]: any;
}

export interface ResultPageTheme {
  id: string;
  name: string;
  previewImage?: string;
  config: ResultPageConfig;
  styleType?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Section {
  visible: boolean;
  content: Record<string, any>;
  style?: Partial<StyleOptions>;
  appearance?: Record<string, any>;
}

export interface OfferSection {
  visible?: boolean;
  hero?: {
    visible?: boolean;
    content: OfferContent;
    style?: Partial<StyleOptions>;
  };
  benefits?: {
    visible?: boolean;
    content: {
      items: Array<{
        title: string;
        description: string;
        icon?: string;
      }>;
    };
    style?: Partial<StyleOptions>;
  };
  testimonials?: {
    visible?: boolean;
    content: {
      items: Array<{
        name: string;
        role?: string;
        testimonialText: string;
        rating?: number;
        avatarUrl?: string;
      }>;
    };
    style?: Partial<StyleOptions>;
  };
  guarantee?: {
    visible?: boolean;
    content: {
      title: string;
      text: string;
      image?: string;
    };
    style?: Partial<StyleOptions>;
  };
  products?: {
    visible?: boolean;
    content: Record<string, any>;
    style?: Partial<StyleOptions>;
  };
  pricing?: {
    visible?: boolean;
    content: Record<string, any>;
    style?: Partial<StyleOptions>;
  };
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
  allProductsImage?: string;
  productTitle?: string;
  benefitItems?: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
  testimonials?: Array<{
    name: string;
    role?: string;
    testimonialText: string;
    rating?: number;
    avatarUrl?: string;
  }>;
  guaranteeText?: string;
  mentorImage?: string;
  bonusImage?: string;
}
