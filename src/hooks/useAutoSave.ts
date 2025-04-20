
import { useState, useEffect, useCallback } from 'react';
import { toast } from '@/components/ui/use-toast';

interface AutoSaveOptions {
  onSave: () => Promise<boolean>;
  interval?: number;
  debounce?: number;
}

export const useAutoSave = ({ onSave, interval = 60000, debounce = 2000 }: AutoSaveOptions) => {
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [pendingChanges, setPendingChanges] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const save = useCallback(async (showToast = true) => {
    if (isSaving) return;
    
    setIsSaving(true);
    try {
      const success = await onSave();
      if (success) {
        setLastSaved(new Date());
        setPendingChanges(false);
        
        if (showToast) {
          toast({
            title: "Alterações salvas",
            description: "Todas as alterações foram salvas automaticamente",
            duration: 3000,
          });
        }
      }
    } catch (error) {
      console.error('Auto-save error:', error);
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar. Tente salvar manualmente.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSaving(false);
    }
  }, [isSaving, onSave]);

  // Schedule a save
  const scheduleSave = useCallback(() => {
    setPendingChanges(true);
    
    // Clear existing timer
    if (timer) {
      clearTimeout(timer);
    }
    
    // Create new timer for debounced save
    const newTimer = setTimeout(() => {
      save(false);
    }, debounce);
    
    setTimer(newTimer);
    
    return () => {
      if (newTimer) {
        clearTimeout(newTimer);
      }
    };
  }, [timer, debounce, save]);

  // Set up interval for periodic saving
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (pendingChanges && !isSaving) {
        save(false);
      }
    }, interval);

    return () => {
      clearInterval(intervalId);
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [pendingChanges, isSaving, interval, save, timer]);

  return {
    save,
    scheduleSave,
    lastSaved,
    isSaving,
    pendingChanges
  };
};
