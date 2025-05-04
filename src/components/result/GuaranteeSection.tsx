import React from 'react';
import { Card } from '@/components/ui/card';
import { Shield } from 'lucide-react';
const GuaranteeSection: React.FC = () => {
  return <Card className="p-6 mb-10 bg-white shadow-md border border-[#B89B7A]/20 glass-panel relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-b from-[#B89B7A]/5 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-[#B89B7A]/5 to-transparent rounded-full blur-3xl"></div>

      <div className="text-center max-w-2xl mx-auto relative z-10">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] rounded-full flex items-center justify-center shadow-lg">
          <Shield className="w-8 h-8 text-white" />
        </div>
        
        <h2 className="text-2xl font-playfair text-[#aa6b5d] mb-2">
          Garantia Total de 7 Dias
        </h2>
        
        <p className="mb-4 text-[#432818]">
          Se você não estiver 100% satisfeita com o conteúdo do guia, 
          devolvemos seu investimento integralmente em até 7 dias após a compra.
          Sem perguntas, sem burocracia.
        </p>
        
        

        {/* Decorative corners */}
        <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-[#B89B7A]/40"></div>
        <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-[#B89B7A]/40"></div>
      </div>
      
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="md:w-1/3 flex justify-center">
          <img 
            src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744916216/C%C3%B3pia_de_01._P%C3%A1gina_-_Produto_de_Entrada_2_hamaox.webp" 
            alt="7 Dias de Garantia" 
            className="w-full max-w-[200px] h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300" 
            loading="lazy"
            srcSet="
              https://res.cloudinary.com/dqljyf76t/image/upload/c_scale,w_150/v1744916216/C%C3%B3pia_de_01._P%C3%A1gina_-_Produto_de_Entrada_2_hamaox.webp 150w,
              https://res.cloudinary.com/dqljyf76t/image/upload/c_scale,w_200/v1744916216/C%C3%B3pia_de_01._P%C3%A1gina_-_Produto_de_Entrada_2_hamaox.webp 200w,
              https://res.cloudinary.com/dqljyf76t/image/upload/v1744916216/C%C3%B3pia_de_01._P%C3%A1gina_-_Produto_de_Entrada_2_hamaox.webp 300w
            "
            sizes="(max-width: 768px) 45vw, 200px"
          />
        </div>
        
        <div className="md:w-2/3">
          <h2 className="text-2xl font-playfair text-[#aa6b5d] mb-4">
            Garantia de 7 Dias
          </h2>
          <p className="text-[#432818] mb-4">
            Se por qualquer motivo você não ficar satisfeita com o Guia de Estilo, 
            basta solicitar o reembolso em até 7 dias após a compra.
          </p>
          <p className="text-[#432818]">
            Sem perguntas, sem complicações. Sua satisfação é nossa prioridade.
          </p>
        </div>
      </div>
    </Card>;
};
export default GuaranteeSection;