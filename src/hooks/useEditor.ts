import { useState, useEffect } from 'react';
import { EditorConfig } from '@/types/editor';
import { useEditorBlocks } from './editor/useEditorBlocks';
import { useEditorTheme } from './editor/useEditorTheme';
import { useEditorTemplates } from './editor/useEditorTemplates';
import { defaultConfig } from '@/utils/editorDefaults';

export const useEditor = () => {
  const [config, setConfig] = useState<EditorConfig>(() => {
    const savedConfig = localStorage.getItem('editorConfig');
    if (savedConfig) {
      try {
        return JSON.parse(savedConfig);
      } catch (e) {
        console.error('Error loading editor configuration:', e);
        return defaultConfig;
      }
    }
    return defaultConfig;
  });

  useEffect(() => {
    localStorage.setItem('editorConfig', JSON.stringify(config));
  }, [config]);

  const blockActions = useEditorBlocks(config, setConfig);
  const themeActions = useEditorTheme(config, setConfig);
  const templateActions = useEditorTemplates(config, setConfig);

  const clearEditor = () => setConfig(defaultConfig);

  const saveConfig = async () => {
    try {
      localStorage.setItem('editorConfig', JSON.stringify(config));
      return true;
    } catch (error) {
      console.error('Error saving editor configuration:', error);
      return false;
    }
  };

  return {
    config,
    updateConfig: setConfig,
    clearEditor,
    ...blockActions,
    ...themeActions,
    ...templateActions,
    saveConfig
  };
};
