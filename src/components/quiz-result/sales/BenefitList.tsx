
import React from 'react';
import { Check } from 'lucide-react';

interface BenefitListProps {
  items?: string[];
}

const BenefitList: React.FC<BenefitListProps> = ({ items = [] }) => {
  const defaultItems = [
    'Guia completo com seu estilo predominante e secundários',
    'Lista de peças-chave para seu guarda-roupa cápsula',
    'Combinações de cores que mais valorizam sua imagem',
    'Silhuetas e modelagens ideais para seu corpo',
    'Paleta de cores personalizada para seu estilo',
    'Como adequar seu estilo a diferentes ocasiões'
  ];

  const benefitItems = items.length > 0 ? items : defaultItems;

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border border-[#B89B7A]/10 mb-8">
      <h2 className="font-playfair text-xl text-[#432818] mb-4">
        O que você vai receber?
      </h2>
      
      <ul className="space-y-3">
        {benefitItems.map((item, index) => (
          <li key={index} className="flex items-start">
            <div className="mr-3 mt-1 text-[#B89B7A]">
              <Check className="w-4 h-4" />
            </div>
            <span className="text-[#8F7A6A]">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BenefitList;
