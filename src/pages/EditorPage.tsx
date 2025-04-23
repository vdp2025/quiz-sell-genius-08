
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { EditorLayout } from '@/components/editor/EditorLayout';
import { PageEditor } from '@/components/editor/PageEditor';
import { defaultResultTemplate } from '@/config/resultPageTemplates';
import { useToast } from '@/components/ui/use-toast';

const EditorPage: React.FC = () => {
  const { style } = useParams<{ style: string }>();
  const { toast } = useToast();
  const [editorData, setEditorData] = useState(defaultResultTemplate);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulação de carregamento de dados
    setLoading(true);
    setTimeout(() => {
      // Aqui você carregaria dados reais do servidor
      console.log("Editor carregado para estilo:", style);
      
      // Dados fictícios
      setEditorData({
        ...defaultResultTemplate,
        header: {
          ...defaultResultTemplate.header,
          content: {
            ...defaultResultTemplate.header.content,
            title: `Estilo ${style || 'Personalizado'}`,
          }
        }
      });
      
      setLoading(false);
    }, 1000);
  }, [style]);

  return (
    <EditorLayout>
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">Carregando editor...</p>
        </div>
      ) : (
        <PageEditor initialData={editorData} />
      )}
    </EditorLayout>
  );
};

export default EditorPage;
