import React from 'react';
import { Card } from '@/components/ui/card';
import { AnimatedWrapper } from '@/components/ui/animated-wrapper';
const MentorSection: React.FC = () => {
  return <Card className="p-6 mb-10 bg-white shadow-md border border-[#B89B7A]/20">
      <AnimatedWrapper>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-playfair text-[#aa6b5d] mb-2">
            Conheça sua Mentora: Gisele Galvão
          </h2>
          <p className="text-[#432818]">
            Consultora de Imagem Estratégica, Personal Branding e Coloração Pessoal
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <img src="https://res.cloudinary.com/dqljyf76t/image/upload/v1745347467/GISELE-GALV%C3%83O-POSE-ACESSIBILIDADE_i23qvj.webp" alt="Gisele Galvão - Mentora de Estilo" className="w-full rounded-lg shadow-md" />
          </div>

          <div className="space-y-4 text-[#432818]">
            <h3 className="font-playfair text-[#aa6b5d] text-2xl">Gisele Galvão</h3>
            <p>
              Consultora de Imagem e Estilo, Estrategista de Marca Pessoal e Especialista em coloração pessoal com certificação internacional.
            </p>
            <p>
              Advogada de formação, mãe da Victória, esposa do Fabrício. Apaixonada pela vida, pelos detalhes, por viagens e por tudo que proporciona crescimento pessoal.
            </p>
            <p>
              Colérica, virginiana, empata e pacificadora. Acredita que a imagem bem posicionada abre portas e gera oportunidades reais. Seus maiores valores são família, justiça, honestidade, ética e liberdade.
            </p>
          </div>
        </div>
      </AnimatedWrapper>
    </Card>;
};
export default MentorSection;