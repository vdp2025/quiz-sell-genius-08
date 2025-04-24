
import { Block } from "./editor";

export interface ResultPageConfig {
  id?: string;
  styleType: string;
  version: number;
  updatedAt: string;
  blocks: Block[];
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string;
  };
  general: {
    title: string;
    subtitle: string;
    logoUrl: string;
  };
  offerContent: OfferContent;
}

export interface OfferContent {
  title?: string;
  subtitle?: string;
  price?: string;
  regularPrice?: string;
  ctaText?: string;
  ctaUrl?: string;
  heroImage?: string;
  heroImage2?: string;
  benefitItems?: string[];
  testimonials?: {
    name: string;
    role: string;
    text: string;
  }[];
  guaranteeText?: string;
}
