
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
         'testimonials' | 'bonus-carousel' | 'spacer' | 'video' | 'two-column';
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
  height?: string;
  
  // Benefits
  items?: string[];
  icon?: string;
  iconColor?: string;
  useIcons?: boolean;
  
  // Pricing
  regularPrice?: string;
  salePrice?: string;
  buttonText?: string;
  ctaUrl?: string;
  urgencyText?: string;
  checkoutUrl?: string;
  
  // Guarantee
  image?: string;
  
  // Hero Section
  heroImage?: string;
  heroImage2?: string;
  heroImageAlt?: string;
  quote?: string;
  quoteAuthor?: string;
  
  // Products
  images?: {
    url: string;
    alt: string;
    title?: string;
  }[];
  
  // Testimonials
  testimonialsImage?: string;
  
  // Bonus Carousel
  bonusImages?: {
    url: string;
    alt: string;
    title: string;
  }[];
  
  // Video
  videoUrl?: string;
  videoTitle?: string;
  videoDescription?: string;
  videoThumbnail?: string;
  videoAutoplay?: boolean;
  videoControls?: boolean;
  
  // Two-Column
  leftColumn?: {
    content?: string;
    width?: string;
  };
  rightColumn?: {
    content?: string;
    width?: string;
  };
  columnGap?: string;
  
  // Spacer
  height?: string;
  
  // General properties
  description?: string;
  url?: string;
  ctaText?: string;
  price?: string;
  customImage?: string;
  
  // Styling
  style?: {
    textAlign?: 'left' | 'center' | 'right';
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
    objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  };
}
