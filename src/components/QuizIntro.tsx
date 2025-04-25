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
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF9F7] px-4 py-6">
      <div className="w-full max-w-[680px] bg-white shadow-lg rounded-2xl p-6 md:p-8 flex flex-col items-center">
        {/* Logo */}
        <img 
          src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp" 
          alt="Logo Gisele Galvão" 
          className="w-28 md:w-32 h-auto mb-5"
        />

        {/* Barra dourada animada */}
        <div className="relative w-full max-w-md h-[3px] bg-[#f1e8db] rounded-full overflow-hidden mb-6">
          <div className="absolute inset-0 w-1/3 bg-[#B89B7A] animate-[loading_2s_ease-in-out_infinite]"></div>
        </div>

        {/* Imagem principal com controle preciso de dimensões */}
        <div className="w-full mb-6 rounded-xl overflow-hidden flex justify-center">
          <img
            src="https://res.cloudinary.com/dqljyf76t/image/upload/t_Antes e Depois - de Descobrir seu Estilo/v1745193439/2dd7e159-43a1-40b0-8075-ba6f591074c1_gpsauh.webp"
            alt="Mulher estilosa"
            className="w-full max-w-[500px] h-auto object-cover rounded-xl"
          />
        </div>

        <h1 className="font-playfair text-xl md:text-2xl font-bold text-black text-center mb-5 leading-tight max-w-lg">
          Transforme seu Guarda-Roupa em um Reflexo Autêntico do Seu Estilo
        </h1>

        {/* Barra dourada decorativa */}
        <div className="w-24 h-[2px] bg-[#B89B7A] mb-5"></div>

        {/* Subtítulo com destaque - ajustado para melhor legibilidade */}
        <p className="text-lg md:text-xl text-black text-center mb-6 max-w-lg leading-relaxed">
          Em apenas 3 minutos, descubra seu <span className="font-semibold text-[#B89B7A]">Estilo Predominante</span> e 
          desbloqueie o segredo para criar looks incríveis que expressam sua verdadeira <span className="font-semibold text-[#b29670]">personalidade</span>, 
          com total <span className="font-semibold text-[#aa6b5d]">confiança</span> e sem esforço.
        </p>

        {/* Barra dourada decorativa */}
        <div className="w-24 h-[2px] bg-[#B89B7A] mb-5"></div>

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
              text-white 
              py-4 
              text-base 
              font-semibold
              rounded-md 
              shadow-md
              transition-transform 
              duration-300
              hover:animate-subtle-pulse
              active:scale-[0.98] 
              disabled:opacity-50 
              disabled:cursor-not-allowed
              mt-2
              border-0
              [background:linear-gradient(45deg,#B89B7A,#b29670)]
            " 
            style={{
              background: 'linear-gradient(45deg, #B89B7A, #b29670)'
            }}
            disabled={!name.trim()}
          >
            <span className="flex items-center justify-center gap-2">
              DESCOBRIR MEU ESTILO AGORA
              <span className="text-xs">{name && `→`}</span>
            </span>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default QuizIntro;