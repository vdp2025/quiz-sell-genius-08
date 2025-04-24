
import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="p-6 bg-[#FAF9F7]">
        <h1 className="text-2xl font-playfair text-[#432818] mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-[#B89B7A]/20">
            <h2 className="text-lg font-medium text-[#432818] mb-3">Quizzes Ativos</h2>
            <p className="text-3xl font-bold text-[#B89B7A]">1</p>
            <p className="text-sm text-[#8F7A6A] mt-2">Último quiz criado em 20/04/2025</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-[#B89B7A]/20">
            <h2 className="text-lg font-medium text-[#432818] mb-3">Respostas Coletadas</h2>
            <p className="text-3xl font-bold text-[#B89B7A]">842</p>
            <p className="text-sm text-[#8F7A6A] mt-2">Última resposta há 2 horas atrás</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-[#B89B7A]/20">
            <h2 className="text-lg font-medium text-[#432818] mb-3">Taxa de Conversão</h2>
            <p className="text-3xl font-bold text-[#B89B7A]">23.5%</p>
            <p className="text-sm text-[#8F7A6A] mt-2">+2.7% em relação ao mês anterior</p>
          </div>
        </div>
        
        <div className="mt-10 bg-white p-6 rounded-lg shadow-sm border border-[#B89B7A]/20">
          <h2 className="text-lg font-medium text-[#432818] mb-4">Ações Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link 
              to="/admin/quiz-builder" 
              className="p-4 border border-[#B89B7A]/30 rounded-lg hover:bg-[#FAF9F7] transition-colors"
            >
              <h3 className="font-medium text-[#432818]">Editor do Quiz</h3>
              <p className="text-sm text-[#8F7A6A] mt-1">Edite e configure seu quiz</p>
            </Link>
            
            <a 
              href="/" 
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 border border-[#B89B7A]/30 rounded-lg hover:bg-[#FAF9F7] transition-colors"
            >
              <h3 className="font-medium text-[#432818]">Visualizar Quiz</h3>
              <p className="text-sm text-[#8F7A6A] mt-1">Veja como seu quiz aparece para o usuário</p>
            </a>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
