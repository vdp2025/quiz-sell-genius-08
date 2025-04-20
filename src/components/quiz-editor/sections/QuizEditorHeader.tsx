
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, ArrowLeft } from 'lucide-react';
import { QuizTemplate } from '@/types/quizTemplate';

interface QuizEditorHeaderProps {
  currentTemplate: QuizTemplate | null;
  onBackToTemplates: () => void;
  onSaveChanges: () => void;
}

const QuizEditorHeader: React.FC<QuizEditorHeaderProps> = ({
  currentTemplate,
  onBackToTemplates,
  onSaveChanges
}) => {
  return (
    <div className="p-4 border-b flex justify-between items-center">
      <div className="flex items-center gap-3">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onBackToTemplates}
          className="rounded-full"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-2xl font-playfair text-[#432818]">
          {currentTemplate?.name || 'Editor de Quiz'}
        </h1>
      </div>
      <Button onClick={onSaveChanges} className="bg-[#B89B7A] hover:bg-[#A38A69]">
        <Save className="w-4 h-4 mr-2" />
        Salvar Alterações
      </Button>
    </div>
  );
};

export default QuizEditorHeader;
