
import { useState, useCallback } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Block } from '@/types/editor';

export const useInlineEdit = (block: Block, onUpdate: (content: any) => void) => {
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const handleStartEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleSave = useCallback((newContent: any) => {
    onUpdate(newContent);
    setIsEditing(false);
    toast({
      title: "Alterações salvas",
      description: "As alterações foram salvas com sucesso",
    });
  }, [onUpdate]);

  const handleCancel = useCallback(() => {
    setIsEditing(false);
  }, []);

  return {
    isEditing,
    handleStartEdit,
    handleSave,
    handleCancel
  };
};
