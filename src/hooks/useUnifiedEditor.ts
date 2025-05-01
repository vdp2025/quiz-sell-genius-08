
import { useState, useCallback, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { useQuizBuilder } from './useQuizBuilder';
import { useResultPageEditor } from './useResultPageEditor';
import { useSalesPageEditor } from './useSalesPageEditor';
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
  const salesPageEditor = useSalesPageEditor(primaryStyle.category);
  
  // Inicialização sincronizada
  useEffect(() => {
    console.info('useUnifiedEditor inicializado');
    // Podemos fazer carregamentos adicionais aqui se necessário
  }, [primaryStyle.category]);
  
  const togglePreview = useCallback(() => {
    setIsPreviewing(prev => !prev);
  }, []);
  
  const saveAll = useCallback(async () => {
    try {
      let success = true;
      
      if (activeMode === 'quiz' && quizBuilder) {
        success = quizBuilder.saveCurrentState();
      } else if (activeMode === 'result' && resultPageEditor) {
        success = await resultPageEditor.actions.handleSave();
      } else if (activeMode === 'sales' && salesPageEditor) {
        // Salva a página de vendas
        success = await salesPageEditor.handleSave();
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
  }, [activeMode, quizBuilder, resultPageEditor, salesPageEditor]);
  
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
    salesPageEditor,
    setActiveMode,
    togglePreview,
    setIsDragging,
    saveAll,
    openTemplateModal,
    closeTemplateModal
  };
};
