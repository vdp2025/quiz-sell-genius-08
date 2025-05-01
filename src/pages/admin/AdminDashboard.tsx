
import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Settings, LayoutTemplate, BarChart3 } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-playfair text-[#432818] mb-6">Painel de Administração</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Editor Unificado</CardTitle>
              <CardDescription>Edite o quiz, resultado e página de vendas em um lugar só</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-[#8F7A6A]">O editor unificado permite que você edite todas as partes do seu funil de forma integrada.</p>
            </CardContent>
            <CardFooter>
              <Link to="/admin/editor/unified" className="w-full">
                <Button className="w-full bg-[#B89B7A] hover:bg-[#8F7A6A]">
                  <LayoutTemplate className="w-4 h-4 mr-2" />
                  Abrir Editor Unificado
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Quiz Builder</CardTitle>
              <CardDescription>Crie e personalize seu quiz</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-[#8F7A6A]">Personalize perguntas, opções e lógica do seu quiz.</p>
            </CardContent>
            <CardFooter>
              <Link to="/admin/quiz-builder" className="w-full">
                <Button variant="outline" className="w-full">
                  <Edit className="w-4 h-4 mr-2" />
                  Editar Quiz
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Editor de Páginas</CardTitle>
              <CardDescription>Edite as páginas de resultado e vendas</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-[#8F7A6A]">Personalize o design e conteúdo das páginas de resultado e vendas.</p>
            </CardContent>
            <CardFooter>
              <Link to="/admin/editor" className="w-full">
                <Button variant="outline" className="w-full">
                  <Edit className="w-4 h-4 mr-2" />
                  Editar Páginas
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Visualizar Conteúdo</CardTitle>
              <CardDescription>Veja como o usuário final verá seu conteúdo</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-[#8F7A6A]">Visualize o quiz, a página de resultado e a página de vendas como um usuário.</p>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Link to="/quiz" className="flex-1">
                <Button variant="outline" className="w-full">
                  <Eye className="w-4 h-4 mr-2" />
                  Quiz
                </Button>
              </Link>
              <Link to="/resultado" className="flex-1">
                <Button variant="outline" className="w-full">
                  <Eye className="w-4 h-4 mr-2" />
                  Resultado
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Configurações</CardTitle>
              <CardDescription>Gerencie as configurações do sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-[#8F7A6A]">Ajuste configurações gerais, integrações e preferências.</p>
            </CardContent>
            <CardFooter>
              <Link to="/admin/settings" className="w-full">
                <Button variant="outline" className="w-full">
                  <Settings className="w-4 h-4 mr-2" />
                  Configurações
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Estatísticas</CardTitle>
              <CardDescription>Visualize o desempenho do seu quiz</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-[#8F7A6A]">Acompanhe estatísticas de conclusão, respostas e conversões.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" disabled>
                <BarChart3 className="w-4 h-4 mr-2" />
                Em breve
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
