
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';

const QuizListPage = () => {
  return (
    <AdminLayout>
      <div className="p-6 bg-[#FAF9F7]">
        <h1 className="text-2xl font-playfair text-[#432818] mb-6">Quizzes</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-[#B89B7A]/20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium text-[#432818]">Seus Quizzes</h2>
            <a 
              href="/admin/unified-editor" 
              className="px-4 py-2 bg-[#B89B7A] hover:bg-[#A38A69] text-white rounded-md text-sm"
            >
              Criar Novo Quiz
            </a>
          </div>
          
          <div className="border-t border-[#B89B7A]/10 pt-4">
            <div className="flex items-center justify-between py-3 border-b border-[#B89B7A]/10">
              <div>
                <h3 className="font-medium text-[#432818]">Quiz de Estilo Pessoal</h3>
                <p className="text-sm text-[#8F7A6A]">Criado em 20/04/2025</p>
              </div>
              <div className="flex items-center gap-2">
                <a 
                  href="/admin/unified-editor/template1" 
                  className="px-3 py-1 border border-[#B89B7A]/30 rounded-md text-xs text-[#432818] hover:bg-[#FAF9F7]"
                >
                  Editar
                </a>
                <a 
                  href="/quiz" 
                  className="px-3 py-1 bg-[#FAF9F7] border border-[#B89B7A]/30 rounded-md text-xs text-[#432818] hover:bg-[#F0EBE6]"
                >
                  Visualizar
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default QuizListPage;
