
import { useCallback } from 'react';
import { EditorBlock } from '@/types/editor';
import { useToast } from '@/components/ui/use-toast';
import { getDefaultContentForBlockType } from '@/utils/blockDefaults';
import { sanitizeBorderRadius } from '@/utils/styleUtils';
import { BorderRadiusType } from '@/types/resultPageConfig';

export const useEditorActions = (
  blocks: EditorBlock[],
  onBlocksChange: (blocks: EditorBlock[]) => void,
  addToHistory: (blocks: EditorBlock[]) => void
) => {
  const { toast } = useToast();

  const handleAddBlock = useCallback((type: EditorBlock['type']) => {
    const content = getDefaultContentForBlockType(type);
    
    // Ensure borderRadius is properly typed
    if (content.style && typeof content.style.borderRadius === 'string') {
      content.style.borderRadius = sanitizeBorderRadius(content.style.borderRadius);
    }
    
    const newBlock: EditorBlock = {
      id: `block-${Date.now()}`,
      type,
      content,
      order: blocks.length
    };
    
    const newBlocks: EditorBlock[] = [...blocks, newBlock];
    
    onBlocksChange(newBlocks);
    addToHistory(newBlocks);
  }, [blocks, onBlocksChange, addToHistory]);

  const handleUpdateBlock = useCallback((id: string, content: any) => {
    const newBlocks: EditorBlock[] = blocks.map(block => 
      block.id === id ? { ...block, content: { ...block.content, ...content } } : block
    );
    
    onBlocksChange(newBlocks);
    addToHistory(newBlocks);
  }, [blocks, onBlocksChange, addToHistory]);

  const handleDeleteBlock = useCallback((id: string) => {
    const newBlocks: EditorBlock[] = blocks.filter(block => block.id !== id)
      .map((block, index) => ({ ...block, order: index }));
    
    onBlocksChange(newBlocks);
    addToHistory(newBlocks);
  }, [blocks, onBlocksChange, addToHistory]);

  const handleSave = useCallback(() => {
    toast({
      title: "Alterações salvas",
      description: "Suas alterações foram salvas com sucesso."
    });
  }, [toast]);

  return {
    handleAddBlock,
    handleUpdateBlock,
    handleDeleteBlock,
    handleSave
  };
};
