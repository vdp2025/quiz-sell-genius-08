
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
         'testimonials' | 'bonus-carousel';
  content: EditableContent;
  order: number;
}

export interface EditableContent {
  // Header
  title?: string;
  subtitle?: string;
  logo?: string;
  logoAlt?: string;
  
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
  }[];
  
  // Testimonials
  testimonialsImage?: string;
  
  // Bonus Carousel
  bonusImages?: {
    url: string;
    alt: string;
    title: string;
  }[];
}
