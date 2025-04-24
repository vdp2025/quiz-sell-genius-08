import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { ResultPageVisualEditor } from '@/components/result-editor/ResultPageVisualEditor';
import { TemplateList } from '@/components/editor/templates/TemplateList';
import { Button } from '@/components/ui/button';
import { defaultResultTemplate } from '@/config/resultPageTemplates';
import { createOfferConfig } from '@/utils/config/offerDefaults';

const EditorResultadoPage: React.FC = () => {
  const [showTemplates, setShowTemplates] = useState(false);
  const { style } = useParams<{ style?: string }>();
  const styleCategory =
    (style as
      | 'Natural'
      | 'Clássico'
      | 'Contemporâneo'
      | 'Elegante'
      | 'Romântico'
      | 'Sexy'
      | 'Dramático'
      | 'Criativo') || 'Natural';

  const selectedStyle = { category: styleCategory, score: 100, percentage: 100 };

  const initialConfig = {
    styleType: styleCategory,
    header: {
      ...defaultResultTemplate.header,
      visible: true,
      style: { ...defaultResultTemplate.header.style, borderRadius: '0' },
    },
    mainContent: { ...defaultResultTemplate.mainContent, visible: true },
    offer: createOfferConfig(),
    secondaryStyles: {
      visible: true,
      content: {},
      style: { padding: '20px' },
    },
    globalStyles: {
      primaryColor: '#B89B7A',
      secondaryColor: '#432818',
      textColor: '#432818',
      backgroundColor: '#FAF9F7',
      fontFamily: 'Playfair Display, serif',
    },
    blocks: [],
  };

  return (
    <AdminLayout>
      {showTemplates ? (
        <div className="p-8 max-w-4xl mx-auto">
          <Button
            onClick={() => setShowTemplates(false)}
            variant="outline"
            className="mb-4"
          >
            Voltar ao Editor
          </Button>
          <TemplateList onSelectTemplate={() => setShowTemplates(false)} />
        </div>
      ) : (
        <ResultPageVisualEditor
          selectedStyle={selectedStyle}
          onShowTemplates={() => setShowTemplates(true)}
          initialConfig={initialConfig}
        />
      )}
    </AdminLayout>
  );
};

export default EditorResultadoPage;
