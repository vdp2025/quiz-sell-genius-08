import React from 'react';
import { Button } from '@/components/ui/button';

const ErrorState: React.FC = () => (
  <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background text-center">
    <h2 className="text-2xl mb-4">Ops! Nenhum resultado encontrado</h2>
    <p className="mb-6">Você ainda não completou o quiz ou ocorreu um erro.</p>
    <Button onClick={() => (window.location.href = '/')}>
      Voltar ao início
    </Button>
  </div>
);

export default ErrorState;
