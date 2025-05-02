
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const VisualEditorPlaceholder: React.FC = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <Card className="p-8 text-center">
        <h1 className="text-2xl font-playfair text-[#aa6b5d] mb-4">
          Editor Visual (Em Desenvolvimento)
        </h1>
        <p className="text-[#432818] mb-6">
          O novo editor visual intuitivo está sendo desenvolvido para oferecer uma melhor experiência de edição.
          Volte em breve para experimentar a nova interface de design.
        </p>
        <Button className="bg-[#B89B7A] hover:bg-[#A38A69] text-white">
          Voltar para o Quiz
        </Button>
      </Card>
    </div>
  );
};

export default VisualEditorPlaceholder;
