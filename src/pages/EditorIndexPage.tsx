
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { PlusCircle, Edit } from 'lucide-react';

const EditorIndexPage = () => {
  return (
    <div className="min-h-screen bg-[#FAF9F7] py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-playfair text-[#432818] mb-8 text-center">
          Editor de Quiz e Páginas
        </h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-playfair text-[#432818] mb-4">Criar Novo Quiz</h2>
            <p className="text-[#8F7A6A] mb-6">
              Crie um novo quiz do zero com perguntas personalizadas, páginas de resultado e páginas de venda integradas.
            </p>
            <Link to="/unified-editor">
              <Button className="w-full bg-[#B89B7A] hover:bg-[#A38A69]">
                <PlusCircle className="w-4 h-4 mr-2" />
                Criar Novo
              </Button>
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-playfair text-[#432818] mb-4">Editar Quiz Existente</h2>
            <p className="text-[#8F7A6A] mb-6">
              Edite um quiz existente para modificar suas perguntas, estilos, páginas de resultado ou configurações de venda.
            </p>
            <Link to="/admin/templates">
              <Button variant="outline" className="w-full border-[#B89B7A] text-[#B89B7A] hover:bg-[#FAF9F7]">
                <Edit className="w-4 h-4 mr-2" />
                Ver Templates
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="mt-12 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-playfair text-[#432818] mb-4">Editor Unificado</h2>
          <p className="text-[#8F7A6A] mb-6">
            O Editor Unificado permite trabalhar com todos os aspectos do seu quiz em uma única interface: 
            perguntas, página de resultado e página de venda.
          </p>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center">
              <div className="bg-[#FAF9F7] p-4 rounded-lg mb-2">
                <p className="font-medium text-[#432818]">Editor de Quiz</p>
              </div>
              <p className="text-sm text-[#8F7A6A]">Configure perguntas e opções</p>
            </div>
            <div className="text-center">
              <div className="bg-[#FAF9F7] p-4 rounded-lg mb-2">
                <p className="font-medium text-[#432818]">Página de Resultado</p>
              </div>
              <p className="text-sm text-[#8F7A6A]">Personalize o resultado do quiz</p>
            </div>
            <div className="text-center">
              <div className="bg-[#FAF9F7] p-4 rounded-lg mb-2">
                <p className="font-medium text-[#432818]">Página de Venda</p>
              </div>
              <p className="text-sm text-[#8F7A6A]">Configure sua oferta</p>
            </div>
          </div>
          <div className="mt-6">
            <Link to="/unified-editor">
              <Button className="w-full bg-[#B89B7A] hover:bg-[#A38A69]">
                Acessar Editor Unificado
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorIndexPage;
