
import { StyleResult } from './quiz';
import { Block } from './editor';
import { ResultPageConfig } from './resultPageConfig';

export interface EditorProps {
  selectedStyle: StyleResult;
  onShowTemplates?: () => void;
}

export interface EditorState {
  selectedBlockId: string | null;
  isPreviewing: boolean;
  blocks: Block[];
  isGlobalStylesOpen: boolean;
}

export interface BlockManipulationActions {
  handleAddBlock: (type: Block['type']) => string;
  handleUpdateBlock: (id: string, content: any) => void;
  handleDeleteBlock: (id: string) => void;
  handleReorderBlocks: (sourceIndex: number, destinationIndex: number) => void;
}

export interface EditorActions extends BlockManipulationActions {
  handleSave: () => Promise<void>;
  handleReset: () => void;
  toggleGlobalStyles: () => void;
}
