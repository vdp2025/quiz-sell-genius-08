import React from 'react';
import { Link } from 'react-router-dom';
import { 
  PencilRuler, 
  PanelTop, 
  BarChart4, 
  Settings, 
  Target, 
  SlidersHorizontal,
  Layers
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminDashboard() {
  const menuItems = [
    {
      title: 'Editor Unificado',
      description: 'Edite todo o fluxo: Quiz, Perguntas e Página de Resultado',
      icon: <Layers className="h-8 w-8 text-[#9b87f5]" />,
      link: '/admin/editor-unificado',
      highlight: true
    },
    {
      title: 'Construtor de Quiz',
      description: 'Crie e edite as perguntas do seu quiz',
      icon: <PencilRuler className="h-8 w-8 text-[#9b87f5]" />,
      link: '/admin/quiz-builder'
    },
    {
      title: 'Editor de Resultado',
      description: 'Personalize a página de resultado e oferta',
      icon: <PanelTop className="h-8 w-8 text-[#9b87f5]" />,
      link: '/admin/editor-resultado'
    },
    {
      title: 'Análise UTM',
      description: 'Acompanhe conversões por canal',
      icon: <BarChart4 className="h-8 w-8 text-[#9b87f5]" />,
      link: '/admin/utm-analytics'
    },
    {
      title: 'Configurações',
      description: 'Ajuste as configurações da sua conta',
      icon: <Settings className="h-8 w-8 text-[#9b87f5]" />,
      link: '/admin/settings'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F7] p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-[#1A1818] mb-8">Painel de Administração</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <Link to={item.link} key={index}>
              <Card className={`cursor-pointer transition-all hover:shadow-md ${
                item.highlight ? 'border-[#9b87f5] bg-[#f9f7ff]' : ''
              }`}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    {item.icon}
                    {item.highlight && (
                      <span className="bg-[#9b87f5] text-white text-xs px-2 py-1 rounded-full">
                        Recomendado
                      </span>
                    )}
                  </div>
                  <CardTitle className="text-xl mt-2">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-gray-600">
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}