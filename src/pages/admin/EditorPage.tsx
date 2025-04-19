
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { EditorWorkspace } from '@/components/editor/layouts/EditorWorkspace';

const EditorPage = () => {
  return (
    <AdminLayout>
      <div className="h-full bg-[#FAF9F7]">
        <EditorWorkspace />
      </div>
    </AdminLayout>
  );
};

export default EditorPage;
