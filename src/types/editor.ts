
import { StyleOptions } from './resultPageConfig';

// Basic types for block styling and configuration
export interface EditableContent {
  [key: string]: any;
  title?: string;
  subtitle?: string;
  text?: string;
  imageUrl?: string;
  imageAlt?: string;
  caption?: string;
  items?: string[];
  buttonText?: string;
  salePrice?: string;
  regularPrice?: string;
  quote?: string;
  quoteAuthor?: string;
  heroImage?: string;
  heroImageAlt?: string;
  logo?: string;
  logoAlt?: string;
  endDate?: string;
  rating?: number;
  avatarUrl?: string;
  name?: string;
  testimonialText?: string;
  role?: string;
  textColor?: string;
  alignment?: 'left' | 'center' | 'right';
  style?: StyleOptions;
  bonusImages?: Array<{url: string; alt: string; title?: string}>;
  features?: Array<{name: string; included: boolean; premium: boolean}>;
  basicPlanName?: string;
  premiumPlanName?: string;
}

export type BlockType = 
  | 'header'
  | 'headline'
  | 'text'
  | 'image'
  | 'benefits'
  | 'testimonials'
  | 'pricing'
  | 'guarantee'
  | 'cta'
  | 'style-result'
  | 'secondary-styles'
  | 'products'
  | 'hero-section'
  | 'bonus-carousel'
  | 'countdown-timer'
  | 'feature-comparison'
  | 'testimonial-card'
  | 'spacer'
  | 'video'
  | 'two-column'
  | 'icon'
  | 'faq'
  | 'carousel'
  | 'custom-code'
  | 'animation-block';

export interface Block {
  id: string;
  type: BlockType; 
  content: Record<string, any>;
  styles?: StyleOptions;
  parentId?: string;
  order: number;
  children?: Block[];
}

export interface EditorBlock {
  id: string;
  type: BlockType;
  content: EditableContent;
  order: number;
  parentId?: string;
  children?: EditorBlock[];
}

export interface EditorState {
  blocks: Block[];
  selectedBlockId: string | null;
  isDragging: boolean;
}

export interface EditorConfig {
  allowedBlockTypes: string[];
  maxDepth: number;
  blocks: EditorBlock[];
  globalStyles?: any; // Global styles configuration
}

export interface EditorProps {
  selectedStyle: {
    category: string;
    score?: number;
    percentage?: number;
  };
}
