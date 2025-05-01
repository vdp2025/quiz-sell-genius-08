
import { useState, useCallback, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { useQuizBuilder } from './useQuizBuilder';
import { useResultPageEditor } from './useResultPageEditor';
import { useSalesPageEditor } from './useSalesPageEditor';
import { StyleResult } from '@/types/quiz';
import { EditorTab } from '@/components/unified-editor/UnifiedVisualEditor';

export const useUnifiedEditor = (primaryStyle: StyleResult) => {
  const [activeMode, setActiveMode] = useState<EditorTab>('quiz');
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  
  // Integrar com os hooks existentes
  const quizBuilder = useQuizBuilder();
  const resultPageEditor = useResultPageEditor(primaryStyle.category);
  const salesPageEditor = useSalesPageEditor(primaryStyle.category);
  
  // Inicialização sincronizada
  useEffect(() => {
    console.info('useUnifiedEditor inicializado com estilo:', primaryStyle.category);
  }, [primaryStyle.category]);
  
  const togglePreview = useCallback(() => {
    setIsPreviewing(prev => !prev);
  }, []);
  
  const saveAll = useCallback(async () => {
    try {
      let success = true;
      
      if (activeMode === 'quiz' && quizBuilder) {
        success = quizBuilder.saveCurrentState();
        console.info('Quiz salvo:', success);
      } else if (activeMode === 'result' && resultPageEditor) {
        success = await resultPageEditor.actions.handleSave();
        console.info('Página de resultado salva:', success);
      } else if (activeMode === 'sales' && salesPageEditor) {
        success = await salesPageEditor.handleSave();
        console.info('Página de vendas salva:', success);
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

  const loadTemplateForCurrentEditor = useCallback((templateData: any) => {
    try {
      let success = false;
      
      if (activeMode === 'quiz' && quizBuilder) {
        // Carregar template para quiz
        if (templateData.stages && templateData.components) {
          quizBuilder.initializeStages(templateData.stages);
          quizBuilder.initializeComponents(templateData.components);
          success = true;
        } else if (quizBuilder.stages && quizBuilder.stages.length > 0) {
          // Se não tiver stages no template, mas o quiz builder já tiver stages, considera como sucesso
          success = true;
        }
      } else if (activeMode === 'result' && resultPageEditor) {
        // Carregar template para página de resultado
        if (resultPageEditor.actions.importConfig) {
          resultPageEditor.actions.importConfig(templateData);
          success = true;
        }
      } else if (activeMode === 'sales' && salesPageEditor) {
        // Carregar template para página de vendas
        if (templateData.blocks && Array.isArray(templateData.blocks)) {
          success = salesPageEditor.loadTemplate(templateData.blocks);
        }
      }
      
      if (!success) {
        console.warn('Não foi possível carregar o template para o editor atual:', activeMode);
        toast({
          title: "Aviso",
          description: `Formato de template incompatível com o editor de ${activeMode === 'quiz' ? 'Quiz' : activeMode === 'result' ? 'Resultado' : 'Vendas'}.`,
          variant: "default"
        });
      }
      
      return success;
    } catch (error) {
      console.error('Erro ao carregar template:', error);
      toast({
        title: "Erro ao carregar template",
        description: "Não foi possível aplicar o template selecionado.",
        variant: "destructive"
      });
      return false;
    }
  }, [activeMode, quizBuilder, resultPageEditor, salesPageEditor]);
  
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
    closeTemplateModal,
    loadTemplateForCurrentEditor
  };
};
