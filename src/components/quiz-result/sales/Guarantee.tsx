
import React from 'react';
import { Card } from '@/components/ui/card';
import { Shield } from 'lucide-react';

const Guarantee = () => {
  return (
    <Card className="p-6 bg-white/50 backdrop-blur border border-[#B89B7A]/20 mb-6">
      <div className="flex items-center gap-4">
        <Shield className="w-12 h-12 text-[#B89B7A]" />
        <div>
          <h3 className="text-xl font-playfair text-[#432818] mb-2">
            Garantia de 7 dias
          </h3>
          <p className="text-[#1A1818]/80">
            Se você não ficar completamente satisfeita com o material, devolvemos 100% do seu investimento. Sem perguntas.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default Guarantee;
