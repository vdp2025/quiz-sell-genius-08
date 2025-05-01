
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Pencil, Edit2, BarChart, Settings } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const AdminPage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#F9F5F1] p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-playfair text-[#432818]">Painel Administrativo</h1>
          <p className="text-[#8F7A6A]">Bem-vindo(a), {user?.userName || "Administrador"}!</p>
        </div>

        <Tabs defaultValue="content">
          <TabsList className="mb-6">
            <TabsTrigger value="content">Gerenciamento de Conteúdo</TabsTrigger>
            <TabsTrigger value="analytics">Análises</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>

          <TabsContent value="content">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Pencil className="h-5 w-5 mr-2 text-[#B89B7A]" />
                    Editor de Quiz
                  </CardTitle>
                  <CardDescription>Edite as perguntas e opções do quiz</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Configure o fluxo do quiz, perguntas, pontuação e opções.</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/admin/editor/unified?tab=quiz">Acessar Editor</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Edit2 className="h-5 w-5 mr-2 text-[#B89B7A]" />
                    Editor da Página de Resultados
                  </CardTitle>
                  <CardDescription>Personalize a página de resultados</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Edite o conteúdo, layout e oferta da página de resultados.</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/admin/editor/unified?tab=result">Editor Unificado</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Edit2 className="h-5 w-5 mr-2 text-[#B89B7A]" />
                    Editor Visual
                  </CardTitle>
                  <CardDescription>Editor visual avançado</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Edite visualmente todas as páginas com interface intuitiva.</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/admin/editor/result-editor">Editor Visual</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart className="h-5 w-5 mr-2 text-[#B89B7A]" />
                  Análises e Relatórios
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Funcionalidade de análise em desenvolvimento.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2 text-[#B89B7A]" />
                  Configurações
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Configurações do sistema em desenvolvimento.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPage;
