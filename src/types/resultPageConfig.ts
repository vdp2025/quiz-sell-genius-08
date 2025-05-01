
import { Block } from './editor';

export interface StyleOptions {
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
  borderRadius?: number | string;
  borderStyle?: string;
  borderWidth?: number | string;
  borderColor?: string;
  paddingX?: number | string;
  paddingY?: number | string;
  marginX?: number | string;
  marginY?: number | string;
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  padding?: string;
  margin?: string;
  width?: string;
  height?: string;
  textAlign?: string;
  fontFamily?: string;
  
  // Additional properties needed for styling
  lineHeight?: string;
  letterSpacing?: string;
  display?: string;
  flexDirection?: string;
  justifyContent?: string;
  alignItems?: string;
  gap?: string;
  boxShadow?: string;
  objectFit?: string;
  type?: string;
  
  // Additional global styles properties
  primaryColor?: string;
  secondaryColor?: string;
  spacing?: 'compact' | 'comfortable' | 'spacious';
}

export type BorderRadiusType = 'none' | 'sm' | 'md' | 'lg' | 'full' | 'custom';

export interface GlobalStyles extends StyleOptions {
  fontFamily?: string;
  primaryColor?: string;
  secondaryColor?: string;
  borderRadiusType?: BorderRadiusType;
  customBorderRadius?: number;
  spacing?: 'compact' | 'comfortable' | 'spacious';
  lineHeight?: string;
}

export interface Section {
  visible: boolean;
  content: Record<string, any>;
  style?: StyleOptions;
  appearance?: Record<string, any>; // Add this to fix SectionEditor errors
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
  productTitle?: string;
  allProductsImage?: string;
  mentorImage?: string;
  bonusImage?: string;
  guaranteeText?: string;
  benefitItems?: Array<{title: string; description: string}>;
  testimonials?: Array<{
    name: string;
    role?: string;
    testimonialText: string;
    rating?: number;
    avatarUrl?: string;
  }>;
}

export interface OfferSection {
  hero: Section;
  products?: Section;
  benefits?: Section;
  pricing?: Section;
  testimonials?: Section;
  guarantee?: Section;
}

export interface ResultPageConfig {
  title?: string;
  subtitle?: string;
  resultTitle?: string;
  showPercentages?: boolean;
  showDescriptions?: boolean;
  callToAction?: string;
  accentColor?: string;
  backgroundColor?: string;
  textColor?: string;
  styleType?: string;
  
  // Extended properties
  globalStyles?: GlobalStyles;
  blocks?: Block[];
  header?: Section;
  mainContent?: Section;
  secondaryStyles?: Section;
  offer?: OfferSection;
  
  // Optional metadata
  version?: string;
  lastUpdated?: string;
  author?: string;
}
