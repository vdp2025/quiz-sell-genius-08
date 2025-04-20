
import { useState, useEffect, useCallback } from 'react';
import { QuizStep } from '@/types/quizBuilder';
import { toast } from '@/components/ui/use-toast';

interface AutosaveProps {
  steps: QuizStep[];
  currentStepIndex: number;
}

export const useQuizAutosave = ({ steps, currentStepIndex }: AutosaveProps) => {
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const saveToLocalStorage = useCallback(async () => {
    if (isSaving) return;

    try {
      setIsSaving(true);
      localStorage.setItem('quiz_builder_state', JSON.stringify({
        steps,
        currentStepIndex,
        lastSaved: new Date().toISOString()
      }));
      
      setLastSaved(new Date());
      toast({
        title: "Alterações salvas",
        description: "O quiz foi salvo automaticamente",
      });
    } catch (error) {
      console.error('Error saving quiz:', error);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as alterações",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  }, [steps, currentStepIndex, isSaving]);

  // Auto-save every minute and when steps change
  useEffect(() => {
    const saveTimeout = setTimeout(saveToLocalStorage, 60000);
    return () => clearTimeout(saveTimeout);
  }, [steps, saveToLocalStorage]);

  // Save when steps change after a short delay
  useEffect(() => {
    const debounceTimeout = setTimeout(saveToLocalStorage, 2000);
    return () => clearTimeout(debounceTimeout);
  }, [steps, saveToLocalStorage]);

  return {
    lastSaved,
    isSaving,
    saveToLocalStorage
  };
};
