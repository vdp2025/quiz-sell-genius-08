
import React from 'react';
import { StyleResult } from '@/types/quiz';
import { Card } from '@/components/ui/card';

interface ExpertiseSectionProps {
  primaryStyle: StyleResult;
}

export const ExpertiseSection: React.FC<ExpertiseSectionProps> = ({ primaryStyle }) => {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="p-8 bg-[#FAF9F7] border-0 shadow-xl">
          <div className="space-y-6">
            <h2 className="text-3xl font-playfair text-[#1A1F2C] text-center">
              Expertise Personalizada para Seu Estilo
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-[#432818]">
                  Análise Profissional
                </h3>
                <p className="text-[#8F7A6A] leading-relaxed">
                  Como uma pessoa com estilo predominantemente {primaryStyle.category}, 
                  você possui características únicas que merecem uma abordagem 
                  especializada e refinada.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-[#432818]">
                  Estratégia Exclusiva
                </h3>
                <p className="text-[#8F7A6A] leading-relaxed">
                  Desenvolva um guarda-roupa premium que reflita sua 
                  personalidade e eleve sua presença com peças 
                  cuidadosamente selecionadas.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
