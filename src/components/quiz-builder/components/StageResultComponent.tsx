
import React from 'react';
import { QuizComponentData } from '@/types/quizBuilder';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface StageResultComponentProps {
  data: QuizComponentData['data'];
  style: QuizComponentData['style'];
  isSelected: boolean;
}

const StageResultComponent: React.FC<StageResultComponentProps> = ({ 
  data, 
  style, 
  isSelected 
}) => {
  return (
    <div 
      className={cn(
        "w-full",
        isSelected && "ring-2 ring-inset ring-[#B89B7A]/20"
      )}
      style={{
        backgroundColor: style?.backgroundColor || data.backgroundColor || '#FFFAF0',
        color: style?.textColor || data.textColor || '#432818',
        borderRadius: `${style?.borderRadius || 0}px`,
        padding: `${style?.paddingY || 16}px ${style?.paddingX || 16}px`,
      }}
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-playfair mb-2">
          {data.title || 'Seu Resultado de Estilo Pessoal'}
        </h2>
        
        <p className="text-lg text-[#432818]/80">
          {data.subtitle || 'Baseado nas suas escolhas, calculamos seu estilo predominante'}
        </p>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-medium text-center mb-4">
          {data.primaryStyleTitle || 'Olá, seu Estilo Predominante é:'}
        </h3>
        
        <div className="bg-[#FFEFEC] p-4 rounded-lg text-center mb-4">
          <h4 className="text-2xl font-playfair text-[#aa6b5d]">DRAMÁTICO</h4>
          <p className="text-[#432818]/80 mt-2">
            Você tem uma personalidade forte e gosta de causar impacto com seu visual.
          </p>
        </div>
        
        <h3 className="text-xl font-medium text-center mb-4">
          {data.secondaryStylesTitle || 'Seus Estilos Complementares:'}
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white p-3 rounded-lg border border-[#B89B7A]/20">
            <div className="flex justify-between items-center">
              <span className="font-medium text-[#432818]">Contemporâneo</span>
              <span className="text-[#B89B7A]">25%</span>
            </div>
            <div className="w-full h-2 bg-[#B89B7A]/20 mt-2 rounded-full">
              <div className="h-full bg-[#B89B7A] rounded-full" style={{ width: '25%' }}></div>
            </div>
          </div>
          
          <div className="bg-white p-3 rounded-lg border border-[#B89B7A]/20">
            <div className="flex justify-between items-center">
              <span className="font-medium text-[#432818]">Criativo</span>
              <span className="text-[#B89B7A]">18%</span>
            </div>
            <div className="w-full h-2 bg-[#B89B7A]/20 mt-2 rounded-full">
              <div className="h-full bg-[#B89B7A] rounded-full" style={{ width: '18%' }}></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <img
            src={data.offerImageUrl || "https://res.cloudinary.com/dqljyf76t/image/upload/v1744920983/Espanhol_Portugu%C3%AAs_8_cgrhuw.webp"}
            alt="Guia Completo de Estilo"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div>
          <img
            src={data.authorImageUrl || "https://res.cloudinary.com/dqljyf76t/image/upload/v1744921536/Sem_nome_1080_x_1000_px_z0chuv.webp"}
            alt="Autor do Guia"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </div>
      
      <div className="flex justify-center">
        <Button className="bg-[#B89B7A] hover:bg-[#A38A69] text-white px-6 py-3 rounded-md text-lg">
          {data.callToActionText || 'Conhecer o Guia Completo'}
        </Button>
      </div>
      
      <div className="mt-6 text-sm text-[#432818]/60 text-center">
        {data.stageTitle || 'Resultado'} • {data.stageNumber || 7} de 7
      </div>
    </div>
  );
};

export default StageResultComponent;
