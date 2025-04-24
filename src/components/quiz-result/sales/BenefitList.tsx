
import React from 'react';
import { Check } from 'lucide-react';

const BenefitList: React.FC = () => {
  const benefits = [
    'Descubra as peças-chave que mais valorizam seu estilo pessoal',
    'Aprenda a combinar cores e estampas de acordo com seu tipo de estilo',
    'Crie um guarda-roupa versátil e coerente com sua personalidade',
    'Entenda como adaptar tendências ao seu estilo único',
    'Desenvolva confiança através de uma imagem autêntica'
  ];
  
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border border-[#B89B7A]/10">
      <h2 className="font-playfair text-xl text-[#432818] mb-4">
        O que você vai aprender com o Guia de Estilo:
      </h2>
      
      <ul className="space-y-4">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-start">
            <span className="mr-3 mt-1 bg-[#B89B7A]/10 text-[#B89B7A] p-1 rounded-full">
              <Check className="h-4 w-4" />
            </span>
            <span className="text-[#432818]">{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BenefitList;
