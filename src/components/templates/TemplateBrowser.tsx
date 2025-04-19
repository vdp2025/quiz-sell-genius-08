
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const TemplateBrowser = () => {
  const navigate = useNavigate();

  const templates = [
    {
      id: 'premium-expert',
      title: 'Especialista Premium',
      description: 'Design sofisticado e profissional para posicionamento de alto valor',
      image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911667/WhatsApp_Image_2025-04-02_at_09.40.53_cv8p5y.jpg',
    },
    {
      id: 'emotional-journey',
      title: 'Jornada Emocional',
      description: 'Layout focado na transformação emocional do cliente',
      image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911677/C%C3%B3pia_de_MOCKUPS_15_-_Copia_grstwl.webp',
    },
    {
      id: 'sales-template',
      title: 'Página de Vendas',
      description: 'Template completo com todos os elementos para uma página de vendas eficaz',
      image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911666/C%C3%B3pia_de_Template_Dossi%C3%AA_Completo_2024_15_-_Copia_ssrhu3.webp',
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-playfair text-[#432818] mb-8 text-center">
        Modelos de Páginas Disponíveis
      </h1>
      
      <div className="grid md:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card key={template.id} className="overflow-hidden border border-[#B89B7A]/20 transition-all duration-300 hover:shadow-lg">
            <div className="aspect-video overflow-hidden bg-[#FAF9F7]">
              <img 
                src={template.image} 
                alt={template.title} 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-playfair text-[#432818] mb-2">{template.title}</h3>
              <p className="text-[#8F7A6A] mb-4 min-h-[60px]">{template.description}</p>
              <Button 
                onClick={() => navigate(`/template/${template.id}`)}
                className="w-full bg-[#B89B7A] hover:bg-[#A38A69] transition-colors duration-300"
              >
                Ver este modelo
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TemplateBrowser;
