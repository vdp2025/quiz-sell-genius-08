
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
  
  // Initialize the individual editors
  const quizBuilder = useQuizBuilder();
  const resultPageEditor = useResultPageEditor(primaryStyle.category);
  
  // Simplified mock for salesPageEditor if it doesn't exist yet
  const salesPageEditor = {
    handleSave: async () => { 
      toast({
        title: "Funcionalidade em desenvolvimento",
        description: "O editor de página de vendas está em construção."
      });
      return true; 
    },
    loadTemplate: (blocks: any[]) => {
      toast({
        title: "Templates em desenvolvimento",
        description: "O carregamento de templates para a página de vendas estará disponível em breve."
      });
      return true;
    }
  };
  
  // Initialization log
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
        // Save quiz state if implemented
        if (typeof quizBuilder.saveCurrentState === 'function') {
          success = quizBuilder.saveCurrentState();
          console.info('Quiz salvo:', success);
        } else {
          console.warn('Método saveCurrentState não encontrado no quizBuilder');
        }
      } else if (activeMode === 'result' && resultPageEditor) {
        // Save result page state
        if (resultPageEditor.actions?.handleSave) {
          success = await resultPageEditor.actions.handleSave();
          console.info('Página de resultado salva:', success);
        } else {
          console.warn('Método handleSave não encontrado no resultPageEditor');
        }
      } else if (activeMode === 'sales') {
        // Save sales page state if implemented
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
        // Load quiz template if implemented
        if (templateData.stages && templateData.components &&
            typeof quizBuilder.initializeStages === 'function' &&
            typeof quizBuilder.initializeComponents === 'function') {
          quizBuilder.initializeStages(templateData.stages);
          quizBuilder.initializeComponents(templateData.components);
          success = true;
        } else {
          console.warn('Não foi possível carregar o template para o quiz');
        }
      } else if (activeMode === 'result' && resultPageEditor) {
        // Load result page template
        if (resultPageEditor.actions?.importConfig) {
          resultPageEditor.actions.importConfig(templateData);
          success = true;
        } else {
          console.warn('Método importConfig não encontrado no resultPageEditor');
        }
      } else if (activeMode === 'sales') {
        // Load sales page template if implemented
        if (templateData.blocks && Array.isArray(templateData.blocks)) {
          success = salesPageEditor.loadTemplate(templateData.blocks);
        } else {
          console.warn('Template incompatível para a página de vendas');
        }
      }
      
      if (!success) {
        toast({
          title: "Aviso",
          description: `Formato de template incompatível com o editor de ${activeMode === 'quiz' ? 'Quiz' : activeMode === 'result' ? 'Resultado' : 'Vendas'}.`,
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
