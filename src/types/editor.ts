
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
    style?: any;
  };
  rightColumn?: {
    content?: string;
    width?: string;
    style?: any;
  };
  columnGap?: string;
  
  // Spacer
  height?: string;
  
  // Icon Block
  size?: string;
  color?: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
  
  // FAQ Block
  faqItems?: {
    question: string;
    answer: string;
  }[];
  defaultOpen?: boolean;
  
  // Carousel Block
  carouselImages?: {
    url: string;
    alt: string;
    caption?: string;
  }[];
  autoPlay?: boolean;
  interval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  
  // Custom Code Block
  code?: string;
  
  // Animation Block
  animationType?: 'fade-in' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'zoom-in' | 'zoom-out';
  animationDuration?: string;
  animationDelay?: string;
  animationTrigger?: 'onLoad' | 'onScroll' | 'onHover';
  children?: EditableContent;
  
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
