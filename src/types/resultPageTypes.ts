
// Instead of importing and extending Block from editor.ts, 
// we'll define our own base structure to avoid type conflicts

export type BlockType = 
  | 'headline' 
  | 'text' 
  | 'image' 
  | 'primaryStyle' 
  | 'secondaryStyles' 
  | 'offer' 
  | 'testimonial' 
  | 'beforeAfter' 
  | 'cta'
  | 'icon'
  | 'divider'
  | 'spacer'
  | 'button'
  | 'form'
  | 'countdown'
  | 'header'
  | 'pricing'
  | 'benefits'
  | 'testimonials'
  | 'guarantee'
  | 'faq'
  | 'video'
  | 'style-result'
  | 'secondary-styles'
  | 'hero-section'
  | 'products'
  | 'two-column'
  | 'carousel'
  | 'custom-code'
  | 'animation-block'
  | 'bonus-carousel';

export interface ResultPageBlock {
  id: string;
  type: BlockType;
  order?: number;
  content?: any;
  style?: ResultPageBlockStyle;
}

export interface ResultPageBlockStyle {
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  backgroundColor?: string;
  textColor?: string;
  padding?: string;
  paddingY?: string;
  paddingX?: string;
  margin?: string;
  width?: string;
  height?: string;
  borderRadius?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  fontFamily?: string;
  lineHeight?: string;
  letterSpacing?: string;
  display?: string;
  flexDirection?: string;
  justifyContent?: string;
  alignItems?: string;
  gap?: string;
  boxShadow?: string;
  borderWidth?: string;
  borderStyle?: string;
  borderColor?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  [key: string]: any;
}

export interface ResultPageConfig {
  styleType: string;
  globalStyles?: {
    primaryColor?: string;
    secondaryColor?: string;
    textColor?: string;
    backgroundColor?: string;
    fontFamily?: string;
    logoUrl?: string;
    logoHeight?: string;
    logoAlt?: string;
    userName?: string;
  };
  blocks: ResultPageBlock[];
}

export interface ResultPageEditorState {
  blocks: ResultPageBlock[];
  selectedBlockId: string | null;
  isPreviewing: boolean;
  isGlobalStylesOpen: boolean;
}
