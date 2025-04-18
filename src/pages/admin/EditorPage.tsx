
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { UnifiedEditorLayout } from '@/components/editor/layouts/UnifiedEditorLayout';
import { StyleResult } from '@/types/quiz';

const EditorPage = () => {
  // Updated to use a valid style category from the expected enum type
  const dummyStyle: StyleResult = {
    category: 'Natural',
    score: 0,
    percentage: 100
  };

  return (
    <AdminLayout>
      <div className="h-full bg-[#FAF9F7]">
        <UnifiedEditorLayout primaryStyle={dummyStyle} />
      </div>
    </AdminLayout>
  );
};

export default EditorPage;
