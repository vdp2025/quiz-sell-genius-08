
import { Block } from "./editor";
import { StyleResult } from "./quiz";

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
  handleReorderBlocks?: (sourceIndex: number, destinationIndex: number) => void;
}

export interface EditableBlockProps {
  block: Block;
  isSelected: boolean;
  onClick: () => void;
  isPreviewMode: boolean;
  primaryStyle?: StyleResult;
  secondaryStyles?: StyleResult[];
  onReorderBlocks?: (sourceIndex: number, destinationIndex: number) => void;
}

export interface QuizResultProps {
  primaryStyle: StyleResult;
  secondaryStyles: StyleResult[];
}
