
import { StyleOptions } from './resultPageConfig';

export type BlockType =
  | 'headline'
  | 'text'
  | 'image'
  | 'pricing'
  | 'benefits'
  | 'testimonials'
  | 'guarantee'
  | 'faq'
  | 'video'
  | 'divider'
  | 'spacer'
  | 'button'
  | 'form'
  | 'countdown'
  | 'header'
  | 'cta'
  | 'style-result'
  | 'secondary-styles'
  | 'hero-section'
  | 'products'
  | 'two-column'
  | 'icon'
  | 'carousel'
  | 'custom-code'
  | 'animation-block'
  | 'bonus-carousel'
  | 'countdown-timer'
  | 'feature-comparison'
  | 'testimonial-card';

export interface Block {
  id: string;
  type: BlockType;
  order: number;
  content: EditableContent;
}

// alias for components that were already using EditorBlock
export type EditorBlock = Block;

export interface EditableContent {
  title?: string;
  subtitle?: string;
  text?: string;
  imageUrl?: string;
  imageAlt?: string;
  price?: string;
  regularPrice?: string;
  ctaText?: string;
  ctaUrl?: string;
  style?: Partial<StyleOptions>;
  // Used for style-result and others
  description?: string;
  customImage?: string;
  // For benefits
  benefits?: string[];
  // For bonus carousel
  bonusImages?: Array<{url: string; alt: string; title?: string}>;
  // For feature comparison
  features?: Array<{name: string; included: boolean; premium: boolean}>;
  // For testimonial card
  name?: string;
  avatarUrl?: string;
  testimonialText?: string;
  rating?: number;
  role?: string;
  // For countdown timer
  endDate?: string;
  // Custom properties
  [key: string]: any;
}

export interface EditorConfig {
  blocks: Block[];
  globalStyles?: {
    primaryColor?: string;
    secondaryColor?: string;
    textColor?: string;
    backgroundColor?: string;
    fontFamily?: string;
  };
}
