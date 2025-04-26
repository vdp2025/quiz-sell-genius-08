
import React from 'react';
import { Card } from '@/components/ui/card';
import { Shield } from 'lucide-react';

const GuaranteeSection: React.FC = () => {
  return (
    <Card className="p-6 mb-10 bg-white shadow-md border border-[#B89B7A]/20">
      <div className="text-center max-w-2xl mx-auto">
        <Shield className="w-12 h-12 text-[#B89B7A] mx-auto mb-4" />
        
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
          <a href="mailto:suporte@estilopessoal.com" className="underline ml-1">
            suporte@estilopessoal.com
          </a>
        </p>
      </div>
    </Card>
  );
};

export default GuaranteeSection;
