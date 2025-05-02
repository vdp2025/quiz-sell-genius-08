
import React from 'react';
import { Card } from '@/components/ui/card';
import { VERSION } from '@/utils/version';

const DebugPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#fffaf7] p-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-playfair text-[#aa6b5d] text-center mb-6">
          Debug Info
        </h1>
        
        <Card className="p-6 mb-6">
          <h2 className="font-medium text-lg mb-4">Versão do Aplicativo</h2>
          <div className="space-y-2">
            <p><strong>Versão:</strong> {VERSION.buildNumber}</p>
            <p><strong>Atualizado em:</strong> {new Date(VERSION.lastUpdated).toLocaleString()}</p>
            <p><strong>Ambiente:</strong> {VERSION.environment}</p>
          </div>
        </Card>
        
        <Card className="p-6 mb-6">
          <h2 className="font-medium text-lg mb-4">Informações do Navegador</h2>
          <div className="space-y-2">
            <p><strong>User Agent:</strong> {navigator.userAgent}</p>
            <p><strong>Língua:</strong> {navigator.language}</p>
            <p><strong>Online:</strong> {navigator.onLine ? 'Sim' : 'Não'}</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DebugPage;
