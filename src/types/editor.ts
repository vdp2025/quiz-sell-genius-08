
export type BlockType = 
  | 'header'
  | 'headline'
  | 'text'
  | 'image'
  | 'hero-section'
  | 'benefits'
  | 'testimonials'
  | 'pricing'
  | 'guarantee'
  | 'cta'
  | 'bonus-carousel'
  | 'products'
  | 'style-result'
  | 'secondary-styles'
  | 'spacer'
  | 'video'
  | 'two-column'
  | 'icon'
  | 'faq'
  | 'carousel'
  | 'custom-code'
  | 'animation-block';

export interface EditableContent {
  [key: string]: any;
  title?: string;
  subtitle?: string;
  text?: string;
  logo?: string;
  logoAlt?: string;
  buttonText?: string;
  items?: string[];
  heroImage?: string;
  heroImageAlt?: string;
  salePrice?: string;
  quote?: string;
  quoteAuthor?: string;
  textColor?: string;
  alignment?: 'left' | 'center' | 'right';
  bonusImages?: Array<{
    url: string;
    alt: string;
    title?: string;
  }>;
}

export interface Block {
  id: string;
  type: BlockType;
  content: EditableContent;
  order: number;
}

export type EditorBlock = Block;
