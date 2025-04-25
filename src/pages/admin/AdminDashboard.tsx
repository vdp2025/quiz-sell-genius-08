import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { BarChart3, PenTool, Eye } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="p-6 bg-[#FAF9F7]">
        <h1 className="text-2xl font-playfair text-[#432818] mb-6">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-[#B89B7A]/20">
            <h2 className="text-lg font-medium text-[#432818] mb-3">
              Quizzes Ativos
            </h2>
            <p className="text-3xl font-bold text-[#B89B7A]">1</p>
            <p className="text-sm text-[#8F7A6A] mt-2">
              Último quiz criado em 20/04/2025
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-[#B89B7A]/20">
            <h2 className="text-lg font-medium text-[#432818] mb-3">
              Respostas Coletadas
            </h2>
            <p className="text-3xl font-bold text-[#B89B7A]">842</p>
            <p className="text-sm text-[#8F7A6A] mt-2">
              Última resposta há 2 horas atrás
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-[#B89B7A]/20">
            <h2 className="text-lg font-medium text-[#432818] mb-3">
              Taxa de Conversão
            </h2>
            <p className="text-3xl font-bold text-[#B89B7A]">23.5%</p>
            <p className="text-sm text-[#8F7A6A] mt-2">
              +2.7% em relação ao mês anterior
            </p>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-lg font-medium text-[#432818] mb-4">
            Ações Rápidas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/admin/quiz-builder"
              className="bg-white p-6 rounded-lg shadow-sm border border-[#B89B7A]/20 hover:bg-[#FAF9F7] transition-colors flex flex-col"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-[#B89B7A]/10 flex items-center justify-center">
                  <PenTool className="w-5 h-5 text-[#B89B7A]" />
                </div>
                <h3 className="font-medium text-[#432818] ml-3">
                  Editor do Quiz
                </h3>
              </div>
              <p className="text-sm text-[#8F7A6A]">
                Crie e edite o conteúdo do seu quiz com nosso editor intuitivo
              </p>
            </Link>

            <Link
              to="/admin/editor-resultado"
              className="bg-white p-6 rounded-lg shadow-sm border border-[#B89B7A]/20 hover:bg-[#FAF9F7] transition-colors flex flex-col"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-[#B89B7A]/10 flex items-center justify-center">
                  <PenTool className="w-5 h-5 text-[#B89B7A]" />
                </div>
                <h3 className="font-medium text-[#432818] ml-3">
                  Editor de Resultado
                </h3>
              </div>
              <p className="text-sm text-[#8F7A6A]">
                Edite a página de resultados
              </p>
            </Link>

            <Link
              to="/admin/results"
              className="bg-white p-6 rounded-lg shadow-sm border border-[#B89B7A]/20 hover:bg-[#FAF9F7] transition-colors flex flex-col"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-[#B89B7A]/10 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-[#B89B7A]" />
                </div>
                <h3 className="font-medium text-[#432818] ml-3">
                  Resultados
                </h3>
              </div>
              <p className="text-sm text-[#8F7A6A]">
                Veja estatísticas e análise de respostas do seu quiz
              </p>
            </Link>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-6 rounded-lg shadow-sm border border-[#B89B7A]/20 hover:bg-[#FAF9F7] transition-colors flex flex-col"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-[#B89B7A]/10 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-[#B89B7A]" />
                </div>
                <h3 className="font-medium text-[#432818] ml-3">
                  Visualizar Quiz
                </h3>
              </div>
              <p className="text-sm text-[#8F7A6A]">
                Veja como seu quiz aparece para seus usuários
              </p>
            </a>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;