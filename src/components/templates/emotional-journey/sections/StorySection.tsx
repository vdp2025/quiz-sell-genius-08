
import React from 'react';
import { StyleResult } from '@/types/quiz';
import { Card } from '@/components/ui/card';

interface StorySectionProps {
  primaryStyle: StyleResult;
}

export const StorySection: React.FC<StorySectionProps> = ({ primaryStyle }) => {
  return (
    <Card className="p-8 bg-white/80 backdrop-blur-sm space-y-6">
      <h2 className="text-3xl font-playfair text-[#1A1F2C] text-center">
        Sua História de Estilo
      </h2>
      <div className="prose prose-lg max-w-none text-[#6E59A5]">
        <p>
          Como alguém com um estilo predominantemente {primaryStyle.category}, 
          você possui uma conexão única com sua forma de se expressar através das roupas.
          Este não é apenas um resultado, é o começo de uma jornada transformadora.
        </p>
        <p>
          Cada escolha de roupa que você faz conta uma história - sua história. 
          E agora é o momento de aprender a contá-la da maneira mais autêntica possível.
        </p>
      </div>
    </Card>
  );
};
