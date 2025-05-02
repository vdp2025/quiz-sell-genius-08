
import { Block } from './editor';

export interface ResultPageBlock extends Block {
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
  };
  blocks: ResultPageBlock[];
}

export interface ResultPageEditorState {
  blocks: ResultPageBlock[];
  selectedBlockId: string | null;
  isPreviewing: boolean;
  isGlobalStylesOpen: boolean;
}
