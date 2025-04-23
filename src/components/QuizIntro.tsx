
import React from 'react';
import { Button } from './ui/button';

interface QuizIntroProps {
  onStart: () => void;
}

export const QuizIntro: React.FC<QuizIntroProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF9F7] px-4 py-10">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-6 md:p-10 flex flex-col items-center">
        <img
          src="https://res.cloudinary.com/dqljyf76t/image/upload/v1745193445/4fb35a75-02dd-40b9-adae-854e90228675_ibkrmt.webp"
"
          alt="Mulher estilosa"
          className="w-full rounded-xl mb-8 object-cover object-center"
          style={{ maxHeight: 320 }}
        />
        <h1 className="font-playfair text-3xl md:text-4xl font-bold text-[#aa6b5d] text-center mb-4 leading-tight">
          Chega de um guarda-roupa lotado<br className="hidden md:block"/> e da sensação de que nada combina com você.
        </h1>
        <p className="text-lg md:text-xl text-[#432818] text-center mb-8">
          Em poucos minutos, descubra seu <span className="font-semibold text-[#B89B7A]">Estilo Predominante</span> — e aprenda a montar looks que realmente refletem sua essência, com praticidade e confiança.
          <br/><br/>
          <span className="font-medium text-[#aa6b5d]">Comece agora sua evolução de estilo.</span>
        </p>
        <Button
          className="w-full bg-[#B89B7A] hover:bg-[#aa6b5d] text-white py-5 text-lg rounded-full shadow transition-all"
          onClick={onStart}
        >
          Começar agora
        </Button>
      </div>
    </div>
  );
};

export default QuizIntro;
