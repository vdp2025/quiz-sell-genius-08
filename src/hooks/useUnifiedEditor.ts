
import { useState, useCallback, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { useQuizBuilder } from './useQuizBuilder';
import { useResultPageEditor } from './useResultPageEditor';
import { StyleResult } from '@/types/quiz';

export type EditorMode = 'quiz' | 'result' | 'sales';

export const useUnifiedEditor = (primaryStyle: StyleResult) => {
  const [activeMode, setActiveMode] = useState<EditorMode>('quiz');
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  
  // Integrar com os hooks existentes
  const quizBuilder = useQuizBuilder();
  const resultPageEditor = useResultPageEditor(primaryStyle.category);
  
  const togglePreview = useCallback(() => {
    setIsPreviewing(prev => !prev);
  }, []);
  
  const saveAll = useCallback(async () => {
    try {
      let success = true;
      
      if (activeMode === 'quiz') {
        success = quizBuilder.saveCurrentState();
      } else if (activeMode === 'result') {
        success = await resultPageEditor.actions.handleSave();
      } else if (activeMode === 'sales') {
        // Implementar salvamento da página de vendas
        success = true;
      }
      
      if (success) {
        toast({
          title: "Alterações salvas",
          description: "Todas as alterações foram salvas com sucesso.",
        });
      }
      
      return success;
    } catch (error) {
      console.error('Error saving editor state:', error);
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar as alterações.",
        variant: "destructive"
      });
      return false;
    }
  }, [activeMode, quizBuilder, resultPageEditor]);
  
  const openTemplateModal = useCallback(() => {
    setIsTemplateModalOpen(true);
  }, []);
  
  const closeTemplateModal = useCallback(() => {
    setIsTemplateModalOpen(false);
  }, []);
  
  return {
    activeMode,
    isPreviewing,
    isDragging,
    isTemplateModalOpen,
    quizBuilder,
    resultPageEditor,
    setActiveMode,
    togglePreview,
    setIsDragging,
    saveAll,
    openTemplateModal,
    closeTemplateModal
  };
};
