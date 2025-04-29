
export type BlockType =
  | 'headline'
  | 'text'
  | 'image'
  | 'header'
  | 'hero-section'
  | 'benefits'
  | 'testimonials'
  | 'pricing'
  | 'guarantee'
  | 'cta'
  | 'style-result'
  | 'secondary-styles'
  | 'bonus'
  | 'bonus-carousel'
  | 'columns';

export type ResponsiveSettings = {
  hideOnMobile?: boolean;
  hideOnTablet?: boolean;
  hideOnDesktop?: boolean;
  mobileWidth?: 'full' | 'auto' | '3/4' | '1/2' | '1/3';
  tabletWidth?: 'full' | 'auto' | '3/4' | '1/2' | '1/3';
};

export type StyleOptions = {
  backgroundColor?: string;
  color?: string;
  padding?: string;
  margin?: string;
  textAlign?: 'left' | 'center' | 'right';
  width?: string;
  borderRadius?: string;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
};

export type EditableContent = {
  title?: string;
  subtitle?: string;
  text?: string;
  imageUrl?: string;
  imageAlt?: string;
  caption?: string;
  buttonText?: string;
  buttonUrl?: string;
  items?: Array<any>;
  style?: StyleOptions;
  responsive?: ResponsiveSettings;
  [key: string]: any;
};

export interface Block {
  id: string;
  type: BlockType;
  order: number;
  content: EditableContent;
}

export interface EditorConfig {
  blocks: Block[];
  globalStyles?: StyleOptions;
}
