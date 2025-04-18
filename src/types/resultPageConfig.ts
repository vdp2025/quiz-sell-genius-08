
export interface Section {
  visible: boolean;
  content: Record<string, any>;
  appearance?: Record<string, any>;
}

export interface OfferSection {
  hero: Section;
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
}

export interface ResultPageConfigsStore {
  configs: Record<string, ResultPageConfig>;
}
