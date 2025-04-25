import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface QuizIntroProps {
  onStart: (name: string) => void;
}

export const QuizIntro: React.FC<QuizIntroProps> = ({ onStart }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onStart(name);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF9F7] px-4 py-10">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-6 md:p-10 flex flex-col items-center">
        <img
          src="https://res.cloudinary.com/dqljyf76t/image/upload/v1745193445/4fb35a75-02dd-40b9-adae-854e90228675_ibkrmt.webp"
          alt="Mulher estilosa"
          className="w-full rounded-xl mb-8 object-cover object-center"
          style={{ maxHeight: 320 }}
        />
        <h1 className="font-playfair text-3xl md:text-4xl font-bold text-black text-center mb-4 leading-tight">
          Transforme seu Guarda-Roupa em um Reflexo Autêntico do Seu Estilo
        </h1>

        {/* Subtítulo com destaque */}
        <p className="text-sm md:text-base text-black text-center mb-6 max-w-lg">
          Em apenas 3 minutos, descubra seu <span className="font-semibold text-[#B89B7A]">Estilo Predominante</span> e 
          desbloqueie o segredo para criar looks incríveis que expressam sua verdadeira <span className="font-semibold text-[#b29670]">personalidade</span>, 
          com total <span className="font-semibold text-[#aa6b5d]">confiança</span> e sem esforço.
        </p>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-3">
          <label htmlFor="name" className="text-sm font-semibold text-[#432818]">NOME *</label>
          <Input 
            id="name" 
            placeholder="Digite seu nome para descobrir seu estilo" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            className="w-full" 
            autoFocus 
          />

          <Button 
            type="submit" 
            className="
              w-full 
              bg-[#B89B7A] 
              hover:bg-[#aa6b5d] 
              text-white 
              py-4 
              text-base 
              rounded-md 
              shadow-lg
              transition-all 
              duration-500
              ease-in-out 
              transform 
              hover:-translate-y-1 
              hover:shadow-2xl
              hover:scale-[1.02]
              active:scale-95 
              disabled:opacity-50 
              disabled:cursor-not-allowed
              relative
              overflow-hidden
              group
            " 
            disabled={!name.trim()}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              DESCOBRIR MEU ESTILO AGORA
              <span className="text-xs">{name && `→`}</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default QuizIntro;