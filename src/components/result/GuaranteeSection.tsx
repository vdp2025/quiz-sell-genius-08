
import React from 'react';
import { Card } from '@/components/ui/card';
import { Shield } from 'lucide-react';

const GuaranteeSection: React.FC = () => {
  return (
    <Card className="p-6 my-10 bg-white shadow-md border border-[#B89B7A]/20 glass-panel relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-b from-[#B89B7A]/5 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-[#B89B7A]/5 to-transparent rounded-full blur-3xl"></div>

      <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
        <div className="w-36 h-36 md:w-48 md:h-48 flex-shrink-0 mx-auto md:mx-0">
          <img 
            src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744920951/Espanhol_Portugu%C3%AAs_8_lgjv2t.png" 
            alt="Selo de garantia" 
            className="w-full h-full object-contain" 
            onError={(e) => {
              e.currentTarget.src = "https://via.placeholder.com/200x200?text=Garantia";
              (e.currentTarget as HTMLImageElement).className = "w-full h-full object-contain opacity-70";
            }}
          />
        </div>
        
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-playfair text-[#aa6b5d] mb-4">
            Garantia Total de 7 Dias
          </h2>
          
          <p className="mb-4 text-[#432818]">
            Se você não estiver 100% satisfeita com o conteúdo do guia, 
            devolvemos seu investimento integralmente em até 7 dias após a compra.
            Sem perguntas, sem burocracia.
          </p>
          
          <p className="text-[#432818] font-medium">
            Seu investimento está seguro e pode ser reembolsado se o material não atender suas expectativas.
          </p>
        </div>

        {/* Decorative corners */}
        <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-[#B89B7A]/40"></div>
        <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-[#B89B7A]/40"></div>
      </div>
    </Card>
  );
};

export default GuaranteeSection;
