
import React, { useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { UnifiedVisualEditor } from '../../components/unified-editor/UnifiedVisualEditor';
import { StyleResult } from '@/types/quiz';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useSearchParams } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

const EditorPage = () => {
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  
  // Sample style data for the editor preview
  const [primaryStyle] = React.useState<StyleResult>({
    category: 'Elegante',
    score: 25,
    percentage: 60
  });

  useEffect(() => {
    // Validate if the tab param is valid
    if (tabParam && !['quiz', 'result', 'sales'].includes(tabParam)) {
      toast({
        title: "Aba inválida",
        description: "A aba especificada não existe. Redirecionando para o editor padrão.",
      });
    }
  }, [tabParam]);

  return (
    <AdminLayout>
      <div className="h-[calc(100vh-64px)]">
        <TooltipProvider>
          <UnifiedVisualEditor 
            primaryStyle={primaryStyle} 
            initialActiveTab={tabParam as any || 'quiz'} 
          />
        </TooltipProvider>
      </div>
    </AdminLayout>
  );
};

export default EditorPage;
