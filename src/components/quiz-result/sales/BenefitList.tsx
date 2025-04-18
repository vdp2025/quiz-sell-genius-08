
import React from 'react';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';

const benefits = [
  "Descubra as cores que mais combinam com você",
  "Monte looks incríveis para qualquer ocasião",
  "Aprenda a valorizar seu tipo físico",
  "Economize tempo e dinheiro nas compras",
  "Ganhe mais confiança no seu estilo",
  "Acesso vitalício ao material"
];

const BenefitList = () => {
  return (
    <Card className="p-6 bg-white/50 backdrop-blur border border-[#B89B7A]/20 mb-6">
      <h3 className="text-xl font-playfair text-[#432818] mb-4">
        O que você vai conquistar:
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="flex-shrink-0 w-5 h-5 mt-1">
              <Check className="w-5 h-5 text-[#B89B7A]" />
            </div>
            <p className="text-[#1A1818]/80">{benefit}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default BenefitList;
