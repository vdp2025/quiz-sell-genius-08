
import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { UnifiedVisualEditor } from '../../components/unified-editor/UnifiedVisualEditor';
import { StyleResult } from '@/types/quiz';
import { TooltipProvider } from '@/components/ui/tooltip';

const EditorPage = () => {
  // Sample style data for the editor preview
  // In a real scenario, you would fetch this from your state or API
  const [primaryStyle] = useState<StyleResult>({
    category: 'Elegante',
    score: 25,
    percentage: 60
  });

  return (
    <AdminLayout>
      <div className="h-[calc(100vh-64px)]">
        <TooltipProvider>
          <UnifiedVisualEditor primaryStyle={primaryStyle} />
        </TooltipProvider>
      </div>
    </AdminLayout>
  );
};

export default EditorPage;
