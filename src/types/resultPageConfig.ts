
import { Block } from './editor';

export type BorderRadiusType = 'none' | 'small' | 'medium' | 'large';
export type SpacingType = 'compact' | 'comfortable' | 'spacious';

export interface StyleOptions {
  // Colors
  primaryColor?: string;
  secondaryColor?: string;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
  buttonColor?: string;
  buttonTextColor?: string;

  // Typography
  fontFamily?: string;
  fontSize?: string;
  lineHeight?: string;
  fontWeight?: string;
  letterSpacing?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  
  // Spacing and Layout
  paddingX?: string;
  paddingY?: string;
  margin?: string;
  padding?: string;
  spacing?: SpacingType;
  gap?: string;
  
  // Visual properties
  borderRadius?: BorderRadiusType;
  borderWidth?: string;
  borderStyle?: string;
  borderColor?: string;
  boxShadow?: string;
  
  // Display
  display?: string;
  width?: string;
  height?: string;
  objectFit?: string;
  
  // Flex properties
  flexDirection?: string;
  justifyContent?: string;
  alignItems?: string;
  
  // Other
  color?: string;
  opacity?: string;
  transition?: string;
  transform?: string;
  
  // Custom properties
  [key: string]: any;
}

export interface SectionConfig {
  content: Record<string, any>;
  style?: Partial<StyleOptions>;
  visible?: boolean;
}

export interface ResultPageConfig {
  // Added properties that were missing
  title?: string;
  description?: string;
  styleType?: string;
  version?: string;
  createdAt?: string;
  updatedAt?: string;
  templateName?: string;
  
  // Core properties
  globalStyles: Partial<StyleOptions>;
  blocks: Block[];
  
  // Section configurations
  header?: SectionConfig;
  mainContent?: SectionConfig;
  secondaryStyles?: SectionConfig;
  offer?: {
    hero?: SectionConfig;
    benefits?: SectionConfig;
    testimonials?: SectionConfig;
    guarantee?: SectionConfig;
    products?: SectionConfig;
    pricing?: SectionConfig;
    content?: Record<string, any>;
    style?: Partial<StyleOptions>;
    visible?: boolean;
  };
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
