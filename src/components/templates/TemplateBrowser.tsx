
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, FileImage, Layout } from 'lucide-react';

const TemplateBrowser = () => {
  const navigate = useNavigate();

  const templates = [
    {
      id: 'premium-expert',
      title: 'Especialista Premium',
      description: 'Template profissional focado em autoridade e conversão, ideal para consultores e especialistas.',
      image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911667/WhatsApp_Image_2025-04-02_at_09.40.53_cv8p5y.jpg',
      features: [
        'Seção de credenciais e expertise',
        'Depoimentos estrategicamente posicionados',
        'Garantias e prova social',
        'Seção de FAQ otimizada'
      ]
    },
    {
      id: 'emotional-journey',
      title: 'Jornada Emocional',
      description: 'Layout que conecta emocionalmente com sua audiência, perfeito para terapeutas e coaches.',
      image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911677/C%C3%B3pia_de_MOCKUPS_15_-_Copia_grstwl.webp',
      features: [
        'História de transformação',
        'Pontos de conexão emocional',
        'Seções de benefícios focadas em resultados',
        'Design que gera identificação'
      ]
    },
    {
      id: 'sales-template',
      title: 'Página de Vendas Completa',
      description: 'Template completo com todos os elementos essenciais para uma página de vendas de alto desempenho.',
      image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911666/C%C3%B3pia_de_Template_Dossi%C3%AA_Completo_2024_15_-_Copia_ssrhu3.webp',
      features: [
        'Funil de vendas otimizado',
        'Seções de objeções e garantias',
        'Elementos de urgência e escassez',
        'Blocos de CTA estratégicos'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-playfair text-[#432818] mb-4">
            Templates Profissionais
          </h1>
          <p className="text-[#8F7A6A] text-lg max-w-2xl mx-auto">
            Escolha o modelo ideal para sua página de resultados e comece a vender mais
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {templates.map((template) => (
            <Card key={template.id} className="overflow-hidden border border-[#B89B7A]/20 transition-all duration-300 hover:shadow-lg flex flex-col">
              <div className="aspect-[4/3] overflow-hidden bg-[#FAF9F7] relative group">
                <img 
                  src={template.image} 
                  alt={template.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <Badge className="absolute top-4 right-4 bg-[#B89B7A] text-white">
                  Recomendado
                </Badge>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-2xl font-playfair text-[#432818] mb-3">{template.title}</h3>
                <p className="text-[#8F7A6A] mb-6">{template.description}</p>
                
                <div className="mb-6 flex-1">
                  <h4 className="text-sm font-medium text-[#432818] mb-3 flex items-center gap-2">
                    <Layout className="w-4 h-4" />
                    Recursos Inclusos
                  </h4>
                  <ul className="space-y-2">
                    {template.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-[#8F7A6A]">
                        <Check className="w-4 h-4 text-[#B89B7A] mt-1 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <Button 
                    onClick={() => navigate(`/template/${template.id}`)}
                    className="w-full bg-[#B89B7A] hover:bg-[#A38A69] transition-colors duration-300"
                  >
                    Usar este modelo
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => window.open(`/preview/${template.id}`, '_blank')}
                    className="w-full border-[#B89B7A] text-[#B89B7A] hover:bg-[#B89B7A] hover:text-white"
                  >
                    <FileImage className="w-4 h-4 mr-2" />
                    Visualizar
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateBrowser;
