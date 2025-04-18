
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import SalesPageEditor from '@/components/editor/SalesPageEditor';
import { useQuizLogic } from '@/hooks/useQuizLogic';

const EditorPage = () => {
  const { quizResult } = useQuizLogic();
  
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-playfair text-[#432818]">Editor de Página de Vendas</h1>
          <p className="text-[#8F7A6A]">Personalize o layout, conteúdo e aparência da sua página de vendas.</p>
        </div>
        
        <SalesPageEditor 
          primaryStyle={quizResult?.primaryStyle || {
            category: 'Natural',
            score: 0,
            percentage: 100
          }} 
        />
      </div>
    </AdminLayout>
  );
};

export default EditorPage;
