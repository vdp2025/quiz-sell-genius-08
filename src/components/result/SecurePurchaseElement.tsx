
import React from 'react';
import { Lock } from 'lucide-react';

const SecurePurchaseElement: React.FC = () => {
  return (
    <div className="flex items-center justify-center gap-2 my-3 text-[#3a3a3a]/70">
      <div className="p-1.5 rounded-full bg-gradient-to-r from-[#B89B7A]/20 to-[#aa6b5d]/20">
        <Lock className="w-4 h-4 text-[#3a3a3a]/80" />
      </div>
      <span className="text-sm font-medium">Compra 100% segura | Pagamento protegido</span>
    </div>
  );
};

export default SecurePurchaseElement;
