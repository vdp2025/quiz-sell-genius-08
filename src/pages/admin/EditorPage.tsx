
import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { UnifiedVisualEditor } from '../../components/unified-editor/UnifiedVisualEditor';
import { StyleResult } from '@/types/quiz';

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
        <UnifiedVisualEditor primaryStyle={primaryStyle} />
      </div>
    </AdminLayout>
  );
};

export default EditorPage;
