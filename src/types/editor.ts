export interface EditorConfig {
  blocks: EditorBlock[];
  globalStyles: {
    primaryColor: string;
    secondaryColor: string;
    textColor: string;
    backgroundColor: string;
    fontFamily: string;
  };
  theme: {
    primaryColor: string;
    secondaryColor: string;
    textColor: string;
    backgroundColor: string;
    fontFamily: string;
  };
}

export interface EditorBlock {
  id: string;
  type: 'header' | 'headline' | 'text' | 'image' | 'benefits' | 'pricing' | 'guarantee' | 
         'cta' | 'style-result' | 'secondary-styles' | 'hero-section' | 'products' | 
         'testimonials' | 'bonus-carousel' | 'spacer' | 'video' | 'two-column' | 'icon' |
         'faq' | 'carousel' | 'custom-code' | 'animation-block' | 'bonus' | 'urgency';
  content: EditableContent;
  order: number;
}

// Alias EditorBlock as Block for backward compatibility
export type Block = EditorBlock;

export interface EditableContent {
  // Header
  title?: string;
  subtitle?: string;
  logo?: string;
  logoAlt?: string;
  logoHeight?: number | string;
  logoWidth?: number | string;
  
  // Text
  text?: string;
  alignment?: 'left' | 'center' | 'right';
  textColor?: string;
  
  // Image
  imageUrl?: string;
  imageAlt?: string;
  width?: string;
  borderRadius?: string;
  
  // Pricing Block Properties
  regularPrice?: string;
  salePrice?: string;
  buttonText?: string;
  ctaUrl?: string;
  urgencyText?: string;
  installments?: {
    number: number;
    value: string;
  };
  paymentMethods?: string;
  guaranteeText?: string;

  // Hero Section Properties
  subtitle?: string;
  heroImage?: string;
  heroImage2?: string;
  heroImageAlt?: string;
  quote?: string;
  quoteAuthor?: string;
  primaryStyle?: string;

  // Benefits Section Properties
  items?: string[];
  icon?: string;
  iconColor?: string;
  useIcons?: boolean;
  
  // General properties
  description?: string;
  url?: string;
  ctaText?: string;
  price?: string;
  customImage?: string;
  
  // Styling
  style?: {
    textAlign?: 'left' | 'center' | 'right' | 'justify';
    color?: string;
    backgroundColor?: string;
    padding?: string;
    margin?: string;
    width?: string;
    height?: string;
    borderRadius?: string;
    fontSize?: string;
    fontWeight?: string;
    fontFamily?: string;
    lineHeight?: string;
    letterSpacing?: string;
    borderStyle?: string;
    borderWidth?: string;
    borderColor?: string;
    objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
    display?: string;
    flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
    justifyContent?: string;
    alignItems?: string;
    gap?: string;
    boxShadow?: string;
    maxWidth?: string;
    type?: string;
    animation?: string;
    transition?: string;
    transform?: string;
    opacity?: string;
    overflow?: string;
    position?: string;
    zIndex?: string;
  };
}
