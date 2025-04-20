
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
  | 'authorInfo';

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
  [key: string]: any;
}

export interface Block {
  id: string;
  type: BlockType;
  content: EditableContent;
  order: number;
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
