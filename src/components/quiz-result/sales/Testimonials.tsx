
import React from 'react';
import { Card } from '@/components/ui/card';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Ana Clara',
      image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911666/C%C3%B3pia_de_Template_Dossi%C3%AA_Completo_2024_15_-_Copia_ssrhu3.webp',
      text: 'O guia transformou minha relação com meu estilo. Finalmente entendo como montar looks que realmente combinam comigo e me fazem sentir confiante!'
    },
    {
      name: 'Patricia Mendes',
      image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911667/WhatsApp_Image_2025-04-02_at_09.40.53_cv8p5y.jpg',
      text: 'Antes eu comprava muitas roupas erradas. Com o guia, tenho um guarda-roupa menor, mas muito mais funcional e alinhado com quem eu sou.'
    },
    {
      name: 'Juliana Soares',
      image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_13_znzbks.webp',
      text: 'As dicas são práticas e fáceis de implementar. Minha imagem profissional melhorou muito e as pessoas notaram a diferença!'
    }
  ];
  
  return (
    <div className="py-8">
      <h2 className="font-playfair text-2xl text-center text-[#432818] mb-8">
        O que dizem sobre o Guia de Estilo
      </h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="p-6 bg-white border-[#B89B7A]/10">
            <div className="flex flex-col h-full">
              <p className="text-[#432818] italic mb-4">"{testimonial.text}"</p>
              
              <div className="flex items-center mt-auto">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3 bg-[#F9F6F2] flex-shrink-0">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <span className="font-medium text-[#432818]">{testimonial.name}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
