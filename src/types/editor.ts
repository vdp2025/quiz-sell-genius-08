export interface EditorConfig {
  blocks: EditorBlock[];
  globalStyles?: {
    primaryColor: string;
    secondaryColor: string;
    textColor: string;
    backgroundColor: string;
    fontFamily: string;
  };
  theme?: {
    primaryColor: string;
    secondaryColor: string;
    textColor: string;
    backgroundColor: string;
    fontFamily: string;
  };
  meta?: {
    title: string;
    description: string;
  };
}

export interface EditorBlock {
  id: string;
  type: 'header' | 'headline' | 'text' | 'image' | 'benefits' | 'pricing' | 'guarantee' | 
         'cta' | 'style-result' | 'secondary-styles' | 'hero-section' | 'products' | 
         'testimonials' | 'bonus-carousel' | 'spacer' | 'video' | 'two-column' | 'icon' |
         'faq' | 'carousel' | 'custom-code' | 'animation-block' | 'bonus' | 'urgency' | 'mentor' |
         'style-hero' | 'offer';
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
  heroImage?: string;
  heroImage2?: string;
  heroImageAlt?: string;
  quote?: string;
  quoteAuthor?: string;
  primaryStyle?: string;

  // Benefits Section Properties
  items?: string[];
  useIcons?: boolean;
  iconColor?: string;
  
  // Icon Properties
  icon?: string;
  size?: string;
  color?: string;
  // Updating position to match what IconBlockPreview expects
  position?: 'left' | 'right' | 'bottom' | 'top';
  
  // Video Properties 
  videoUrl?: string;
  videoTitle?: string;
  videoDescription?: string;
  videoThumbnail?: string;
  videoAutoplay?: boolean;
  videoControls?: boolean;
  
  // Two Column Block
  leftColumn?: any;
  rightColumn?: any;
  columnGap?: string;
  
  // Carousel & Products Properties 
  carouselImages?: Array<{url: string; alt: string; caption?: string}>;
  bonusImages?: Array<{url: string; alt: string; title: string}>;
  images?: Array<{url: string; alt: string; title?: string}>;
  autoPlay?: boolean;
  interval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  
  // Testimonials Block Properties
  testimonials?: Array<{
    text: string;
    author: string;
    position?: string;
  }>;
  title?: string;
  image?: string;
  imageAlt?: string;
  
  // Guarantee Block Properties
  days?: number;
  guaranteeText?: string;
  guaranteeImage?: string;
  guaranteeDescription?: string;
  
  // Style Properties
  style?: {
    textAlign?: 'left' | 'center' | 'right' | 'justify';
    color?: string;
    backgroundColor?: string;
    padding?: string;
    margin?: string;
    marginLeft?: string;
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

  // Animation Properties
  animationType?: 'fade-in' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'zoom-in' | 'zoom-out';
  animationDuration?: string;
  animationDelay?: string;
  animationTrigger?: 'onLoad' | 'onScroll' | 'onHover';
  
  // Additional properties
  code?: string;
  faqItems?: Array<{ question: string; answer: string }>;
  defaultOpen?: boolean;
  image?: string;
  height?: string;
  checkoutUrl?: string;

  // Style Hero and Offer Block Properties
  styleType?: string;
  features?: string[];
  productImage?: string;
  mainImage?: string;
}
