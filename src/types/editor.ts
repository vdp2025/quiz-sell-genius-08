
export interface EditorBlock {
  id: string;
  type: 'header' | 'hero-section' | 'bonus-carousel' | 'headline' | 'text' | 'image' | 'benefits' | 
        'pricing' | 'guarantee' | 'cta' | 'style-result' | 'secondary-styles' | 'products' | 'testimonials';
  content: EditableContent;
  order: number;
}

export type BlockType = EditorBlock['type'];

export type EditableContent = {
  [key: string]: any;
  title?: string;
  subtitle?: string;
  text?: string;
  imageUrl?: string;
  imageAlt?: string;
  items?: string[] | any[];
  logo?: string;
  logoAlt?: string;
  heroImage?: string;
  heroImageAlt?: string;
  quote?: string;
  quoteAuthor?: string;
  salePrice?: string;
  regularPrice?: string;
  buttonText?: string;
  alignment?: 'left' | 'center' | 'right';
  textColor?: string;
  backgroundColor?: string;
  bonusImages?: Array<{ url: string; alt: string; title?: string }>;
};

export interface EditorConfig {
  blocks: EditorBlock[];
  settings: {
    theme: string;
    layout: string;
    fontFamily: string;
  };
  theme?: {
    primaryColor?: string;
    secondaryColor?: string;
    textColor?: string;
    backgroundColor?: string;
    fontFamily?: string;
  };
  globalStyles?: {
    primaryColor?: string;
    secondaryColor?: string;
    textColor?: string;
    backgroundColor?: string;
    fontFamily?: string;
    logoHeight?: number;
    logo?: string;
    logoAlt?: string;
  };
}

// Alias Block to EditorBlock for compatibility
export type Block = EditorBlock;

