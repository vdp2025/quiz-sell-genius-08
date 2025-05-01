
import { StyleOptions } from './resultPageConfig';

export interface Block {
  id: string;
  type: string;
  content: Record<string, any>;
  styles?: StyleOptions;
  parentId?: string;
  order: number;
  children?: Block[];
}

export interface EditorState {
  blocks: Block[];
  selectedBlockId: string | null;
  isDragging: boolean;
}

export interface EditorConfig {
  allowedBlockTypes: string[];
  maxDepth: number;
}

export interface EditorProps {
  selectedStyle: {
    category: string;
    score?: number;
    percentage?: number;
  };
}
