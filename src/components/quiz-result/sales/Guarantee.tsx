
import React from 'react';
import { Shield } from 'lucide-react';

interface GuaranteeProps {
  text?: string;
}

const Guarantee: React.FC<GuaranteeProps> = ({ text }) => {
  const defaultText = "Se você não ficar satisfeito com o Guia de Estilo por qualquer motivo, devolvemos seu dinheiro em até 7 dias após a compra. Sem perguntas, sem complicações.";
  
  const guaranteeText = text || defaultText;
  
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border border-[#B89B7A]/10 mb-8">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="text-[#B89B7A] flex-shrink-0">
          <Shield className="w-16 h-16" />
        </div>
        
        <div>
          <h2 className="font-playfair text-xl text-[#432818] mb-2">
            Garantia de 7 dias
          </h2>
          
          <p className="text-[#8F7A6A]">
            {guaranteeText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Guarantee;
