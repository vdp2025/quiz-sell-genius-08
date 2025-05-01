
import { Block } from './editor';

export interface StyleOptions {
  primaryColor?: string;
  secondaryColor?: string;
  textColor?: string;
  backgroundColor?: string;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: 'normal' | 'bold' | 'light';
  lineHeight?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  borderRadius?: string | 'none' | 'small' | 'medium' | 'large';
  padding?: number;
  margin?: number;
  spacing?: 'compact' | 'comfortable' | 'spacious';
  [key: string]: any;
}

export interface ResultPageConfig {
  title: string;
  description: string;
  blocks: Block[];
  globalStyles?: Partial<StyleOptions>;
  styleType: string;
  createdAt: string;
  updatedAt: string;
  customCode?: string;
  scriptTags?: string[];
  metaTags?: Record<string, string>;
  [key: string]: any;
}

export interface ResultPageTheme {
  id: string;
  name: string;
  previewImage?: string;
  config: ResultPageConfig;
  styleType?: string;
  createdAt: string;
  updatedAt: string;
}
