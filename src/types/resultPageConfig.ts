
export interface StyleOptions {
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  backgroundColor?: string;
  padding?: string;
  margin?: string;
  width?: string;
  borderRadius?: string;
  textAlign?: 'left' | 'center' | 'right';
  fontFamily?: string;
}

export interface ImageOptions {
  url: string;
  alt: string;
  width?: string;
  height?: string;
  borderRadius?: string;
  objectFit?: 'cover' | 'contain' | 'fill';
}

export interface SectionContent {
  [key: string]: any;
  style?: StyleOptions;
  images?: ImageOptions[];
}

// Define a specific interface for offer content
export interface OfferContent {
  title?: string;
  subtitle?: string;
  price?: string;
  regularPrice?: string;
  ctaText?: string;
  ctaUrl?: string;
  heroImage?: string;
  heroImage2?: string;
  [key: string]: any;
}

export interface Section {
  visible: boolean;
  content: SectionContent;
  appearance?: Record<string, any>;
  style?: StyleOptions;
}

// Extend the Section to create an OfferSection
export interface OfferSection {
  hero: {
    visible: boolean;
    content: OfferContent; // Use the specific content type
    appearance?: Record<string, any>;
    style?: StyleOptions;
  };
  products: Section;
  pricing: Section;
  benefits: Section;
  testimonials: Section;
  guarantee: Section;
}

export interface ResultPageConfig {
  styleType: string;
  header: Section;
  mainContent: Section;
  secondaryStyles: Section;
  offer: OfferSection;
  globalStyles?: {
    primaryColor?: string;
    secondaryColor?: string;
    textColor?: string;
    backgroundColor?: string;
    fontFamily?: string;
  };
}

export interface ResultPageConfigsStore {
  configs: Record<string, ResultPageConfig>;
}
