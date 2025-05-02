
import React from 'react';

const MaintenancePage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fffaf7] p-4">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-playfair text-[#aa6b5d] mb-4">Em Manutenção</h1>
        <p className="text-[#432818] mb-6">
          Estamos realizando melhorias no sistema. Por favor, retorne em breve.
        </p>
      </div>
    </div>
  );
};

export default MaintenancePage;
