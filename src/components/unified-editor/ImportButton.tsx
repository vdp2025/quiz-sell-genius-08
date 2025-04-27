import React, { useRef } from 'react';
import { useQuizBuilder } from '@/hooks/useQuizBuilder';
import { useToast } from '@/components/ui/use-toast';

interface ImportButtonProps {
  className?: string;
}

export const ImportButton: React.FC<ImportButtonProps> = ({ className = '' }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { initializeComponents, initializeStages, setActiveStage } = useQuizBuilder();
  const { toast } = useToast();

  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const importedData = JSON.parse(content);
        
        // Validar a estrutura básica dos dados importados
        if (!importedData.components || !importedData.stages) {
          throw new Error('Formato de arquivo inválido');
        }
        
        // Atualizar o estado do quiz com os dados importados
        initializeComponents(importedData.components);
        initializeStages(importedData.stages);
        
        // Definir o primeiro estágio como ativo, se existir
        if (importedData.stages && importedData.stages.length > 0) {
          setActiveStage(importedData.stages[0].id);
        }
        
        // Limpar o campo de input para permitir importar o mesmo arquivo novamente
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        
        // Feedback para o usuário
        toast({
          title: "Quiz importado com sucesso",
          description: "Todas as configurações foram aplicadas.",
          variant: "default"
        });
      } catch (error) {
        console.error('Erro ao importar arquivo:', error);
        toast({
          title: "Erro ao importar arquivo",
          description: "Verifique se o formato do arquivo é válido.",
          variant: "destructive"
        });
      }
    };
    
    reader.readAsText(file);
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json"
        style={{ display: 'none' }}
      />
      <button
        onClick={handleImportClick}
        className={`px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${className}`}
      >
        Importar JSON
      </button>
    </>
  );
};

export default ImportButton; 