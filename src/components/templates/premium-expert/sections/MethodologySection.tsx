
import React from 'react';
import { Card } from '@/components/ui/card';

export const MethodologySection: React.FC = () => {
  const steps = [
    {
      number: "01",
      title: "Análise Detalhada",
      description: "Avaliação profunda do seu estilo atual e objetivos"
    },
    {
      number: "02",
      title: "Estratégia Personalizada",
      description: "Desenvolvimento de um plano exclusivo para sua transformação"
    },
    {
      number: "03",
      title: "Curadoria Premium",
      description: "Seleção das melhores peças e combinações para seu estilo"
    }
  ];

  return (
    <div className="py-16 bg-[#1A1F2C]">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-playfair text-white text-center mb-12">
          Metodologia Exclusiva
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <Card key={step.number} className="p-6 bg-white/5 backdrop-blur border-0">
              <div className="space-y-4">
                <span className="text-[#B89B7A] text-4xl font-playfair">
                  {step.number}
                </span>
                <h3 className="text-xl font-semibold text-white">
                  {step.title}
                </h3>
                <p className="text-gray-300">
                  {step.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
