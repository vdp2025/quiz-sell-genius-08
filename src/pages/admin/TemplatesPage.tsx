
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import TemplateSelector from '@/components/quiz-editor/TemplateSelector';
import UnifiedQuizEditor from '@/components/unified-editor/UnifiedQuizEditor';

const TemplatesPage = () => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);

  return (
    <AdminLayout>
      <div className="h-full bg-[#FAF9F7]">
        {selectedTemplateId ? (
          <UnifiedQuizEditor 
            templateId={selectedTemplateId}
            onBack={() => setSelectedTemplateId(null)}
          />
        ) : (
          <div className="p-6">
            <TemplateSelector onSelectTemplate={setSelectedTemplateId} />
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default TemplatesPage;
