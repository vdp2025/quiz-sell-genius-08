
import { StyleOptions } from './resultPageConfig';

export type BlockType =
  | 'headline'
  | 'text'
  | 'image'
  | 'pricing'
  | 'benefits'
  | 'testimonials'
  | 'guarantee'
  | 'faq'
  | 'video'
  | 'divider'
  | 'spacer'
  | 'button'
  | 'form'
  | 'countdown';

export interface Block {
  id: string;
  type: BlockType;
  order: number;
  content: EditableContent;
}

export interface EditableContent {
  [key: string]: any;
  title?: string;
  subtitle?: string;
  text?: string;
  imageUrl?: string;
  imageAlt?: string;
  price?: string;
  regularPrice?: string;
  ctaText?: string;
  ctaUrl?: string;
  style?: Partial<StyleOptions>;
}

export interface EditorConfig {
  blocks: Block[];
}
