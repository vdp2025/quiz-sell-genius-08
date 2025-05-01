import { useState, useEffect, useCallback } from 'react';
import { toast } from '@/components/ui/use-toast';
import { ResultPageConfig } from '@/types/resultPageConfig';
import { Block } from '@/types/editor';
import { getDefaultGlobalStyles } from '@/utils/editorDefaults';
import { createDefaultConfig } from '@/utils/resultPageDefaults';

export const useResultPageEditor = (styleType: string) => {
  const [resultPageConfig, setResultPageConfig] = useState<ResultPageConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [isGlobalStylesOpen, setIsGlobalStylesOpen] = useState(false);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [blocks, setBlocks] = useState<Block[]>([]);
  
  const configKey = `result_page_config_${styleType}`;
  
  // Load config from localStorage
  useEffect(() => {
    const loadConfig = () => {
      try {
        setLoading(true);
        
        const savedConfig = localStorage.getItem(configKey);
        let config: ResultPageConfig;
        
        if (savedConfig) {
          config = JSON.parse(savedConfig);
        } else {
          // Create default config using the helper function
          config = createDefaultConfig(styleType);
          // Save default config
          localStorage.setItem(configKey, JSON.stringify(config));
        }
        
        setResultPageConfig(config);
        if (config.blocks) {
          setBlocks(config.blocks);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error loading result page config:', error);
        toast({
          title: "Erro ao carregar configurações",
          description: "Não foi possível carregar as configurações salvas",
          variant: "destructive"
        });
        setLoading(false);
      }
    };
    
    loadConfig();
  }, [styleType, configKey]);
  
  // Save config to localStorage
  const saveConfig = useCallback(() => {
    if (!resultPageConfig) return;
    
    try {
      localStorage.setItem(configKey, JSON.stringify(resultPageConfig));
      console.log('Result page config saved:', resultPageConfig);
      return true;
    } catch (error) {
      console.error('Error saving result page config:', error);
      toast({
        title: "Erro ao salvar configurações",
        description: "Não foi possível salvar as configurações",
        variant: "destructive"
      });
      return false;
    }
  }, [resultPageConfig, configKey]);
  
  // Update a specific section of the config
  const updateSection = useCallback((section: keyof ResultPageConfig, data: any) => {
    setResultPageConfig(prev => {
      if (!prev) return prev;
      return { ...prev, [section]: data };
    });
    
    // If updating blocks, also update the blocks state
    if (section === 'blocks') {
      setBlocks(data);
    }
  }, []);
  
  // Save config and show toast
  const handleSave = useCallback(() => {
    if (saveConfig()) {
      toast({
        title: "Alterações salvas",
        description: "As alterações foram salvas com sucesso",
      });
      return true;
    }
    return false;
  }, [saveConfig]);
  
  // Reset config to default
  const handleReset = useCallback(() => {
    if (confirm('Tem certeza que deseja resetar todas as configurações? Esta ação não pode ser desfeita.')) {
      // Use the helper function to create a default config
      const defaultConfig = createDefaultConfig(styleType);
      
      setResultPageConfig(defaultConfig);
      setBlocks(defaultConfig.blocks || []);
      localStorage.setItem(configKey, JSON.stringify(defaultConfig));
      
      toast({
        title: "Configurações resetadas",
        description: "As configurações foram resetadas com sucesso",
      });
      
      return true;
    }
    return false;
  }, [styleType, configKey]);
  
  // Import config
  const importConfig = useCallback((config: ResultPageConfig) => {
    setResultPageConfig(config);
    if (config.blocks) {
      setBlocks(config.blocks);
    }
  }, []);
  
  // Toggle preview mode
  const togglePreview = useCallback(() => {
    setIsPreviewing(prev => !prev);
  }, []);
  
  // Toggle global styles editor
  const toggleGlobalStyles = useCallback(() => {
    setIsGlobalStylesOpen(prev => !prev);
  }, []);
  
  // Handle block operations
  const handleAddBlock = useCallback((type: Block['type']) => {
    const newBlock: Block = {
      id: `block-${Date.now()}`,
      type,
      order: blocks.length,
      content: {}
    };
    
    const newBlocks = [...blocks, newBlock];
    setBlocks(newBlocks);
    updateSection('blocks', newBlocks);
    setSelectedBlockId(newBlock.id);
    
    toast({
      title: "Bloco adicionado",
      description: `Um bloco do tipo ${type} foi adicionado`,
    });
    
    return newBlock.id;
  }, [blocks, updateSection]);
  
  const handleUpdateBlock = useCallback((id: string, content: any) => {
    const newBlocks = blocks.map(block => 
      block.id === id ? { ...block, content: { ...block.content, ...content } } : block
    );
    
    setBlocks(newBlocks);
    updateSection('blocks', newBlocks);
  }, [blocks, updateSection]);
  
  const handleDeleteBlock = useCallback((id: string) => {
    const newBlocks = blocks
      .filter(block => block.id !== id)
      .map((block, index) => ({ ...block, order: index }));
    
    setBlocks(newBlocks);
    updateSection('blocks', newBlocks);
    
    if (selectedBlockId === id) {
      setSelectedBlockId(null);
    }
    
    toast({
      title: "Bloco removido",
      description: "O bloco foi removido com sucesso",
    });
  }, [blocks, selectedBlockId, updateSection]);
  
  const handleReorderBlocks = useCallback((sourceIndex: number, destinationIndex: number) => {
    const result = Array.from(blocks);
    const [removed] = result.splice(sourceIndex, 1);
    result.splice(destinationIndex, 0, removed);
    
    const reorderedBlocks = result.map((block, index) => ({
      ...block,
      order: index
    }));
    
    setBlocks(reorderedBlocks);
    updateSection('blocks', reorderedBlocks);
  }, [blocks, updateSection]);
  
  return {
    resultPageConfig,
    loading,
    isPreviewing,
    isGlobalStylesOpen,
    selectedBlockId,
    blocks,
    selectBlock: setSelectedBlockId,
    actions: {
      handleSave,
      handleReset,
      togglePreview,
      toggleGlobalStyles,
      updateSection,
      importConfig,
      handleAddBlock,
      handleUpdateBlock,
      handleDeleteBlock,
      handleReorderBlocks
    }
  };
};
