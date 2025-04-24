
export type EditorSection = 'quiz' | 'result';

export interface EditorState {
  selectedBlockId: string | null;
  isPreviewing: boolean;
  isGlobalStylesOpen: boolean;
  isDraggingBlock: boolean;
  currentEditingSection: EditorSection;
}

export interface VisualEditorProps {
  initialData?: any;
  onSave: (data: any) => void;
  onPreview: () => void;
  onClose: () => void;
}

export interface EditableBlockProps {
  id: string;
  type: string;
  content: any;
  isSelected: boolean;
  isPreview: boolean;
  onSelect: (id: string) => void;
  onChange: (content: any) => void;
}
