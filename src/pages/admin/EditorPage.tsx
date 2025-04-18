
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { UnifiedEditorLayout } from '@/components/editor/layouts/UnifiedEditorLayout';

const EditorPage = () => {
  // For testing purposes, we'll use a dummy style
  const dummyStyle = {
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
