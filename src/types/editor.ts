
export interface EditableContent {
  title?: string;
  subtitle?: string;
  text?: string;
  imageUrl?: string;
  imageAlt?: string;
  items?: string[];
  regularPrice?: string;
  salePrice?: string;
  buttonText?: string;
  ctaUrl?: string;
  urgencyText?: string;
  url?: string;
  logo?: string;
  logoAlt?: string;
  description?: string;
  customImage?: string;
  heroImage?: string;
  heroImage2?: string;
  heroImageAlt?: string;
  price?: string;
  ctaText?: string;
  images?: Array<{url: string; alt: string; title?: string}>;
  testimonialsImage?: string;
  width?: string;
  height?: string;
  borderRadius?: string;
  textColor?: string;
  alignment?: 'left' | 'center' | 'right';
  image?: string;
  style?: {
    textAlign?: 'left' | 'center' | 'right';
    color?: string;
    backgroundColor?: string;
    padding?: string;
    margin?: string;
    width?: string;
    borderRadius?: string;
    fontSize?: string;
    fontWeight?: string;
    fontFamily?: string;
  };
  // Additional properties needed for specific block types
  bonusImages?: Array<{url: string; alt: string; title?: string}>;
  quote?: string;
  quoteAuthor?: string;
  checkoutUrl?: string;
}

export interface Block {
  id: string;
  type: 'header' | 'headline' | 'text' | 'image' | 'benefits' | 'pricing' | 'guarantee' | 'cta' | 'style-result' | 'secondary-styles' | 'hero-section' | 'products' | 'testimonials' | 'bonus-carousel';
  content: EditableContent;
  order: number;
}

export interface EditorBlock {
  id: string;
  type: 'header' | 'headline' | 'text' | 'image' | 'benefits' | 'pricing' | 'guarantee' | 'cta' | 'style-result' | 'secondary-styles' | 'hero-section' | 'products' | 'testimonials' | 'bonus-carousel';
  content: EditableContent;
  order?: number;
}

export interface EditorConfig {
  blocks: EditorBlock[];
  globalStyles?: {
    primaryColor?: string;
    secondaryColor?: string;
    textColor?: string;
    backgroundColor?: string;
    fontFamily?: string;
  };
  theme?: {
    primaryColor?: string;
    secondaryColor?: string;
    textColor?: string;
    backgroundColor?: string;
    fontFamily?: string;
  };
}

export interface EditorState {
  blocks: EditorBlock[];
}
