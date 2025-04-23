
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import InlineQuizEditor from '@/components/unified-editor/InlineQuizEditor';
import QuizTemplateImporter from '@/components/quiz-builder/components/QuizTemplateImporter';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { LoadingState } from '@/components/ui/loading-state';

const UnifiedQuizEditorPage = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const [isTemplateImporterOpen, setIsTemplateImporterOpen] = useState<boolean>(false);
  
  const handleImportTemplate = (template) => {
    // Handle template import
    navigate(`/admin/quiz-editor/${template.id || 'new'}`);
    setIsTemplateImporterOpen(false);
  };
  
  if (!templateId) {
    return (
      <AdminLayout>
        <div className="h-full flex flex-col items-center justify-center bg-[#FAF9F7]">
          <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-sm text-center">
            <h1 className="text-2xl font-playfair text-[#432818] mb-6">Criar Novo Quiz</h1>
            <p className="text-gray-600 mb-8">
              Escolha como deseja começar a criação do seu quiz:
            </p>
            
            <div className="space-y-4">
              <Button 
                className="w-full bg-[#B89B7A] hover:bg-[#A38A69] py-6"
                onClick={() => setIsTemplateImporterOpen(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Usar um Template
              </Button>
              
              <Button 
                className="w-full bg-white text-[#432818] border border-[#B89B7A] hover:bg-[#FAF9F7] py-6"
                onClick={() => navigate('/admin/quiz-editor/new')}
              >
                <Plus className="w-4 h-4 mr-2" />
                Criar do Zero
              </Button>
            </div>
          </div>
          
          <QuizTemplateImporter
            isOpen={isTemplateImporterOpen}
            onClose={() => setIsTemplateImporterOpen(false)}
            onImportTemplate={handleImportTemplate}
          />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="h-full">
        <InlineQuizEditor
          templateId={templateId === 'new' ? null : templateId}
          onBack={() => navigate('/admin/quizzes')}
        />
      </div>
    </AdminLayout>
  );
};

export default UnifiedQuizEditorPage;
