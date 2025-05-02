
import React from 'react';
import { Lock, CreditCard, Shield } from 'lucide-react';

const SecurePurchaseElement: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div className="flex items-center gap-2">
        <Lock className="h-4 w-4 text-[#45a049]" />
        <span className="text-sm font-medium text-[#3a3a3a]">Compra 100% Segura</span>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="flex items-center space-x-1">
          <CreditCard className="h-4 w-4 text-[#666]" />
          <Shield className="h-4 w-4 text-[#666]" />
        </div>
        <span className="text-xs text-[#666]">Pagamento processado em ambiente seguro</span>
      </div>
    </div>
  );
};

export default SecurePurchaseElement;
