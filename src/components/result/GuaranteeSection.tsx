
import React from 'react';
import { Card } from '@/components/ui/card';
import { Shield } from 'lucide-react';

const GuaranteeSection: React.FC = () => {
  return (
    <Card className="p-6 mb-10 bg-white shadow-md border border-[#B89B7A]/20 glass-panel relative overflow-hidden">
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
        
        <p className="text-sm text-[#8F7A6A]">
          Para solicitações de reembolso, entre em contato através do email: 
          <a href="mailto:suporte@estilopessoal.com" className="underline ml-1 hover:text-[#aa6b5d] transition-colors">
            suporte@estilopessoal.com
          </a>
        </p>

        {/* Decorative corners */}
        <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-[#B89B7A]/40"></div>
        <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-[#B89B7A]/40"></div>
      </div>
    </Card>
  );
};

export default GuaranteeSection;
