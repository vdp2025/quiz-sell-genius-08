
export type BlockType = 
  | 'header'
  | 'text'
  | 'image'
  | 'benefits'
  | 'testimonial'
  | 'pricing'
  | 'guarantee'
  | 'divider'
  | 'styleResult'
  | 'headline'
  | 'cta'
  | 'style-result'
  | 'secondary-styles'
  | 'hero-section'
  | 'products'
  | 'testimonials'
  | 'spacer'
  | 'video'
  | 'two-column'
  | 'icon'
  | 'faq'
  | 'carousel'
  | 'custom-code'
  | 'animation-block'
  | 'bonus-carousel'
  | 'hero';

export interface Block {
  id: string;
  type: BlockType;
  content: any;
  order: number;
}

// Aliases for backward compatibility with existing components
export type EditorBlock = Block;
export type EditableContent = any;

export interface EditorConfig {
  blocks: EditorBlock[];
  globalStyles?: {
    primaryColor?: string;
    secondaryColor?: string;
    textColor?: string;
    backgroundColor?: string;
    fontFamily?: string;
  };
  theme?: Record<string, any>;
}
