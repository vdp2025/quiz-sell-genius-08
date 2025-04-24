
import React from 'react';
import { useParams } from 'react-router-dom';
import UnifiedEditor from '@/components/editors/UnifiedEditor';
import { getTemplateById } from '@/services/templates/templateService';
import { LoadingState } from '@/components/ui/loading-state';

const UnifiedEditorPage = () => {
  const { id } = useParams<{ id?: string }>();
  const [loading, setLoading] = React.useState(true);
  const [template, setTemplate] = React.useState<any>(null);
  
  React.useEffect(() => {
    const loadTemplate = async () => {
      setLoading(true);
      
      try {
        if (id) {
          const loadedTemplate = getTemplateById(id);
          setTemplate(loadedTemplate || {
            questions: [],
            name: 'Novo Quiz',
            resultPageSettings: {
              primaryStyle: { category: 'Natural', score: 100, percentage: 100 }
            }
          });
        } else {
          // Default template for new quiz
          setTemplate({
            questions: [],
            name: 'Novo Quiz',
            resultPageSettings: {
              primaryStyle: { category: 'Natural', score: 100, percentage: 100 }
            }
          });
        }
      } catch (error) {
        console.error('Erro ao carregar template:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadTemplate();
  }, [id]);
  
  if (loading) {
    return <LoadingState />;
  }
  
  return (
    <UnifiedEditor 
      initialQuizQuestions={template?.questions || []}
      initialResultStyle={template?.resultPageSettings?.primaryStyle}
      onSave={(data) => {
        // Aqui você pode salvar os dados completos
        console.log('Salvando template completo:', data);
      }}
    />
  );
};

export default UnifiedEditorPage;
