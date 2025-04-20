
export type BlockType = 
  | 'header'
  | 'hero'
  | 'styleResult'
  | 'secondaryStyles'
  | 'benefitsList'
  | 'testimonials'
  | 'pricing'
  | 'guarantee'
  | 'callToAction'
  | 'authorInfo'
  // Additional block types used in editor components
  | 'headline'
  | 'text'
  | 'image'
  | 'benefits'
  | 'cta'
  | 'hero-section'
  | 'bonus-carousel'
  | 'products'
  | 'style-result'
  | 'secondary-styles'
  | 'spacer'
  | 'video'
  | 'two-column'
  | 'icon'
  | 'faq'
  | 'carousel'
  | 'custom-code'
  | 'animation-block';

export interface EditableContent {
  title?: string;
  subtitle?: string;
  text?: string;
  imageUrl?: string;
  backgroundColor?: string;
  textColor?: string;
  description?: string;
  customImage?: string;
  price?: string;
  regularPrice?: string;
  ctaText?: string;
  ctaUrl?: string;
  // Additional properties for extended block types
  imageAlt?: string;
  items?: string[];
  height?: string;
  style?: any;
  videoUrl?: string;
  videoTitle?: string;
  videoDescription?: string;
  videoThumbnail?: string;
  videoAutoplay?: boolean;
  videoControls?: boolean;
  leftColumn?: { 
    content?: string; 
    width?: string; 
    style?: any; 
  };
  rightColumn?: { 
    content?: string; 
    width?: string; 
    style?: any; 
  };
  columnGap?: string;
  faqItems?: { 
    question: string; 
    answer: string; 
  }[];
  defaultOpen?: boolean;
  carouselImages?: { 
    url: string; 
    alt: string; 
    caption?: string; 
  }[];
  autoPlay?: boolean;
  interval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  code?: string;
  animationType?: "zoom-in" | "zoom-out" | "fade-in" | "slide-up" | "slide-down" | "slide-left" | "slide-right";
  animationDuration?: string;
  animationDelay?: string;
  animationTrigger?: "onLoad" | "onScroll" | "onHover";
  children?: any;
  [key: string]: any;
}

export interface Block {
  id: string;
  type: BlockType;
  content: EditableContent;
  order: number;
}

// Create an alias to ensure backward compatibility with existing imports
export type EditorBlock = Block;

export interface EditorConfig {
  blocks: EditorBlock[];
  theme?: {
    fontFamily?: string;
    primaryColor?: string;
    secondaryColor?: string;
    backgroundColor?: string;
    textColor?: string;
    headingColor?: string;
    [key: string]: any;
  };
  globalStyles?: {
    fontFamily?: string;
    primaryColor?: string;
    secondaryColor?: string;
    backgroundColor?: string;
    textColor?: string;
    headingColor?: string;
    [key: string]: any;
  };
}

export interface EditorState {
  selectedBlockId: string | null;
  isPreviewing: boolean;
  blocks: Block[];
  isGlobalStylesOpen: boolean;
}

export interface BlockManipulationActions {
  handleAddBlock: (type: BlockType) => string;
  handleUpdateBlock: (id: string, content: Partial<EditableContent>) => void;
  handleDeleteBlock: (id: string) => void;
  handleReorderBlocks: (sourceIndex: number, destinationIndex: number) => void;
}

export interface EditorProps {
  selectedStyle: {
    category: 'Natural' | 'Clássico' | 'Contemporâneo' | 'Elegante' | 'Romântico' | 'Sexy' | 'Dramático' | 'Criativo';
    score: number;
    percentage: number;
  };
  onShowTemplates?: () => void;
}
