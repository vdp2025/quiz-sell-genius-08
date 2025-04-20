
import { useEffect, useRef, useState } from 'react';
import { toast } from '@/components/ui/use-toast';

interface UseAutosaveOptions<T> {
  data: T;
  onSave: (data: T) => Promise<boolean>;
  interval?: number;
  enabled?: boolean;
}

export function useAutosave<T>({
  data,
  onSave,
  interval = 5000,
  enabled = true
}: UseAutosaveOptions<T>) {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastDataRef = useRef<T>(data);

  const save = async (showToast = false) => {
    if (!enabled) return;
    
    // Don't save if the data hasn't changed
    if (JSON.stringify(data) === JSON.stringify(lastDataRef.current)) {
      return;
    }
    
    setIsSaving(true);
    try {
      const success = await onSave(data);
      if (success) {
        lastDataRef.current = data;
        const now = new Date();
        setLastSaved(now);
        
        if (showToast) {
          toast({
            title: "Alterações salvas",
            description: `Suas alterações foram salvas às ${now.toLocaleTimeString()}`,
          });
        }
      }
    } catch (error) {
      console.error('Erro ao salvar:', error);
      if (showToast) {
        toast({
          title: "Erro ao salvar",
          description: "Suas alterações não puderam ser salvas. Tente novamente.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSaving(false);
    }
  };

  // Setup autosave
  useEffect(() => {
    if (!enabled) return;
    
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      save(false);
    }, interval);
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, enabled, interval]);

  // Save immediately when component unmounts
  useEffect(() => {
    return () => {
      if (enabled && JSON.stringify(data) !== JSON.stringify(lastDataRef.current)) {
        save(false);
      }
    };
  }, [data, enabled]);

  return {
    isSaving,
    lastSaved,
    saveNow: () => save(true),
  };
}
