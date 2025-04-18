
export interface EditableContent {
  title?: string;
  subtitle?: string;
  text?: string;
  imageUrl?: string;
  imageAlt?: string;
  items?: string[];
  backgroundColor?: string;
  textColor?: string;
  alignment?: 'left' | 'center' | 'right';
  fontSize?: string;
  padding?: string;
  margin?: string;
  // Properties for pricing block
  regularPrice?: string;
  salePrice?: string;
  buttonText?: string;
  checkoutUrl?: string;
  // Properties for CTA block
  url?: string;

  // Header block properties
  logo?: string;
  logoAlt?: string;

  // Hero section properties
  heroImage?: string;
  heroImageAlt?: string;
  quote?: string;
  quoteAuthor?: string;

  // Bonus carousel properties
  bonusImages?: Array<{
    url: string;
    alt: string;
    title?: string;
  }>;

  // Enhanced pricing properties
  originalPrices?: Array<{
    item: string;
    price: string;
  }>;
}

export interface EditorBlock {
  id: string;
  type: 'headline' | 'image' | 'text' | 'benefits' | 'testimonials' | 'pricing' | 
        'guarantee' | 'cta' | 'style-result' | 'secondary-styles' | 'bonus' |
        'header' | 'hero-section' | 'bonus-carousel';
  content: EditableContent;
  order: number;
}

export interface EditorConfig {
  blocks: EditorBlock[];
  theme: {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    textColor: string;
    fontFamily: string;
  };
}

// Alias for simpler naming in new components
export type Block = EditorBlock;
