
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ContentContainer } from '@/components/shared/ContentContainer';
import { GridLayout } from '@/components/shared/GridLayout';
import { Edit, FileText, BarChart, Settings, Users, Box } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  return (
    <div className="bg-[#FAF9F7] min-h-screen p-6">
      <ContentContainer>
        <div className="mb-8">
          <h1 className="text-3xl font-playfair text-[#432818] mb-2">Dashboard Administrativo</h1>
          <p className="text-[#8F7A6A]">Gerencie seu quiz, páginas de resultado e vendas</p>
        </div>

        <GridLayout columns={3} gap="lg" className="mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-[#432818] flex items-center">
                <Edit className="w-5 h-5 mr-2 text-[#B89B7A]" />
                Editores
              </CardTitle>
              <CardDescription>Construa e edite o conteúdo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 pt-2">
              <Button asChild variant="outline" className="w-full justify-start">
                <Link to="/admin/quiz-builder">
                  <FileText className="w-4 h-4 mr-2" />
                  Editor de Quiz
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start text-[#432818] bg-[#FAF9F7] border-[#B89B7A]">
                <Link to="/admin/editor">
                  <Edit className="w-4 h-4 mr-2 text-[#B89B7A]" />
                  Editor Visual Unificado
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-[#432818] flex items-center">
                <BarChart className="w-5 h-5 mr-2 text-[#B89B7A]" />
                Análise
              </CardTitle>
              <CardDescription>Acompanhe o desempenho</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 pt-2">
              <Button variant="outline" className="w-full justify-start" disabled>
                <BarChart className="w-4 h-4 mr-2" />
                Estatísticas
              </Button>
              <Button variant="outline" className="w-full justify-start" disabled>
                <Users className="w-4 h-4 mr-2" />
                Usuários
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-[#432818] flex items-center">
                <Settings className="w-5 h-5 mr-2 text-[#B89B7A]" />
                Configurações
              </CardTitle>
              <CardDescription>Ajuste as configurações do sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 pt-2">
              <Button variant="outline" className="w-full justify-start" disabled>
                <Settings className="w-4 h-4 mr-2" />
                Configurações Gerais
              </Button>
              <Button variant="outline" className="w-full justify-start" disabled>
                <Box className="w-4 h-4 mr-2" />
                Integrações
              </Button>
            </CardContent>
          </Card>
        </GridLayout>

        <Card>
          <CardHeader>
            <CardTitle className="text-[#432818] flex items-center">
              <Box className="w-5 h-5 mr-2 text-[#B89B7A]" />
              Visão Geral
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Bem-vindo ao painel administrativo. Selecione uma opção acima para começar.</p>
          </CardContent>
        </Card>
      </ContentContainer>
    </div>
  );
};

export default AdminDashboard;
