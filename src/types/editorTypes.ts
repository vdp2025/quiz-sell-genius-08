
import { Block } from './editor';

export interface EditorState {
  blocks: Block[];
  selectedBlockId: string | null;
  isPreviewing: boolean;
  isGlobalStylesOpen: boolean;
}

export interface BlockManipulationActions {
  handleAddBlock: (type: Block['type']) => string;
  handleUpdateBlock: (id: string, content: any) => void;
  handleDeleteBlock: (id: string) => void;
  handleReorderBlocks: (sourceIndex: number, destinationIndex: number) => void;
}
