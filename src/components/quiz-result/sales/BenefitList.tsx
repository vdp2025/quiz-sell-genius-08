
import React from 'react';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';

const benefits = [
  {
    title: "O que você vai aprender:",
    items: [
      "Aplicar seus estilos com autenticidade",
      "Montar looks práticos para o dia a dia, trabalho e eventos",
      "Usar cores e modelagens que valorizam quem você é",
      "Parar de errar nas compras e economizar tempo"
    ]
  },
  {
    title: "Bônus Exclusivos:",
    items: [
      "Visagismo Facial Estratégico: descubra cortes, acessórios e formatos que valorizam seu rosto",
      "Peças-Chave do Guarda-Roupa: construa um armário funcional com o que você já tem"
    ]
  }
];

const BenefitList = () => {
  return (
    <Card className="p-6 bg-white border-[#aa6b5d]/20">
      {benefits.map((section, index) => (
        <div key={index} className="mb-6 last:mb-0">
          <h3 className="text-xl font-playfair text-[#aa6b5d] mb-4">
            {section.title}
          </h3>
          <div className="space-y-3">
            {section.items.map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 mt-1">
                  <Check className="w-5 h-5 text-[#aa6b5d]" />
                </div>
                <p className="text-[#3a3a3a]">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </Card>
  );
};

export default BenefitList;
