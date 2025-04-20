
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

  // Load last saved timestamp when the component mounts
  useEffect(() => {
    const storedData = localStorage.getItem('quiz_builder_state');
    if (storedData) {
      try {
        const { lastSaved } = JSON.parse(storedData);
        if (lastSaved) {
          setLastSaved(new Date(lastSaved));
        }
      } catch (error) {
        console.error('Error loading last saved timestamp:', error);
      }
    }
  }, []);

  const saveToLocalStorage = useCallback(async () => {
    if (isSaving || !steps.length) return;

    try {
      setIsSaving(true);
      const now = new Date();
      const saveData = {
        steps,
        currentStepIndex,
        lastSaved: now.toISOString()
      };
      
      localStorage.setItem('quiz_builder_state', JSON.stringify(saveData));
      console.log('Quiz builder state saved:', saveData);
      
      setLastSaved(now);
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

  // Save when steps change after a short delay
  useEffect(() => {
    if (!steps.length) return;
    
    console.log('Steps changed, scheduling autosave');
    const debounceTimeout = setTimeout(() => {
      console.log('Executing autosave');
      saveToLocalStorage();
    }, 2000);
    
    return () => {
      console.log('Clearing previous autosave timeout');
      clearTimeout(debounceTimeout);
    };
  }, [steps, saveToLocalStorage]);

  return {
    lastSaved,
    isSaving,
    saveToLocalStorage
  };
};
