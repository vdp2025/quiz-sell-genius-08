
import { useState, useEffect, useCallback, useRef } from 'react';

interface UseAutosaveProps<T> {
  data: T;
  onSave: (data: T) => Promise<boolean> | boolean;
  interval?: number;
  enabled?: boolean;
}

interface UseAutosaveReturn {
  isSaving: boolean;
  lastSaved: Date | null;
  saveNow: () => Promise<boolean>;
}

export const useAutosave = <T>({
  data,
  onSave,
  interval = 5000,
  enabled = true
}: UseAutosaveProps<T>): UseAutosaveReturn => {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const lastDataRef = useRef<T>(data);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasChanges = useRef(false);

  // Detect changes in data
  useEffect(() => {
    if (JSON.stringify(data) !== JSON.stringify(lastDataRef.current)) {
      hasChanges.current = true;
      lastDataRef.current = data;
    }
  }, [data]);

  const saveData = useCallback(async (): Promise<boolean> => {
    if (!hasChanges.current) {
      return true; // No changes to save
    }

    setIsSaving(true);
    try {
      const result = await onSave(data);
      if (result) {
        setLastSaved(new Date());
        hasChanges.current = false;
      }
      return result;
    } catch (error) {
      console.error('Error during autosave:', error);
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [data, onSave]);

  const saveNow = useCallback(async (): Promise<boolean> => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    return saveData();
  }, [saveData]);

  // Setup autosave timer
  useEffect(() => {
    if (!enabled) return;

    const setupTimeout = () => {
      timeoutRef.current = setTimeout(async () => {
        if (hasChanges.current) {
          await saveData();
        }
        setupTimeout();
      }, interval);
    };

    setupTimeout();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [enabled, interval, saveData]);

  return { isSaving, lastSaved, saveNow };
};
