
import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { UnifiedVisualEditor } from '../../components/unified-editor/UnifiedVisualEditor';
import { StyleResult } from '@/types/quiz';
import { TooltipProvider } from '@/components/ui/tooltip';
import { createDefaultConfig } from '@/utils/resultPageDefaults';

const EditorPage = () => {
  // Sample style data for the editor preview
  // In a real scenario, you would fetch this from your state or API
  const [primaryStyle] = useState<StyleResult>({
    category: 'Elegante',
    score: 25,
    percentage: 60
  });
  
  // Generate a default config with the required properties
  const defaultConfig = createDefaultConfig('Elegante');

  return (
    <AdminLayout>
      <div className="h-[calc(100vh-64px)]">
        <TooltipProvider>
          <UnifiedVisualEditor 
            primaryStyle={primaryStyle}
            initialConfig={defaultConfig}
          />
        </TooltipProvider>
      </div>
    </AdminLayout>
  );
};

export default EditorPage;
