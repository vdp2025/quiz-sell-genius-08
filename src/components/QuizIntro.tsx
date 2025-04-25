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
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF9F7] px-4 py-4 sm:py-6">
      <div className="w-full max-w-[300px] sm:max-w-[500px] md:max-w-[680px] bg-white shadow-lg rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col items-center">
        {/* Logo */}
        <img 
          src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp" 
          alt="Logo Gisele Galvão" 
          className="w-24 sm:w-28 md:w-32 h-auto mb-4 sm:mb-5"
        />

        {/* Barra dourada animada */}
        <div className="relative w-full max-w-md h-[3px] bg-[#f1e8db] rounded-full overflow-hidden mb-4 sm:mb-6">
          <div className="absolute inset-0 w-1/3 bg-[#B89B7A] animate-[loading_2s_ease-in-out_infinite]"></div>
        </div>

        {/* Imagem principal */}
        <div className="w-full mb-4 sm:mb-6 rounded-xl overflow-hidden flex justify-center">
          <img
            src="https://res.cloudinary.com/dqljyf76t/image/upload/t_Antes e Depois - de Descobrir seu Estilo/v1745193439/2dd7e159-43a1-40b0-8075-ba6f591074c1_gpsauh.webp"
            alt="Mulher estilosa"
            className="w-full max-w-[250px] sm:max-w-[330px] md:max-w-[500px] h-auto object-cover rounded-xl"
          />
        </div>

        {/* Título */}
        <h1 className="font-playfair text-[18px] sm:text-[22px] md:text-[26px] font-bold text-black text-center mb-4 sm:mb-5 leading-tight max-w-[280px] sm:max-w-[400px] md:max-w-lg">
          Transforme seu Guarda-Roupa em um Reflexo Autêntico do Seu Estilo
        </h1>

        {/* Barra dourada decorativa */}
        <div className="w-16 sm:w-20 md:w-24 h-[2px] bg-[#B89B7A] mb-4 sm:mb-5"></div>

        {/* Subtítulo */}
        <p className="text-[16px] sm:text-[18px] md:text-[20px] text-black text-center mb-4 sm:mb-6 max-w-[280px] sm:max-w-[400px] md:max-w-lg leading-relaxed">
          Em apenas 3 minutos, descubra seu <span className="font-semibold text-[#B89B7A]">Estilo Predominante</span> e 
          desbloqueie o segredo para criar looks incríveis que expressam sua verdadeira <span className="font-semibold text-[#b29670]">personalidade</span>, 
          com total <span className="font-semibold text-[#aa6b5d]">confiança</span> e sem esforço.
        </p>

        {/* Barra dourada decorativa */}
        <div className="w-16 sm:w-20 md:w-24 h-[2px] bg-[#B89B7A] mb-4 sm:mb-5"></div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="w-full max-w-[280px] sm:max-w-[400px] md:max-w-md flex flex-col gap-3">
          <label htmlFor="name" className="text-[14px] font-semibold text-[#432818]">NOME *</label>
          <Input 
            id="name" 
            placeholder="Digite seu nome para descobrir seu estilo" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            className="w-full text-[16px]" 
            autoFocus 
          />

          <Button 
            type="submit" 
            className={`
              w-full 
              py-4
              text-lg
              font-semibold
              rounded-md 
              shadow-md
              transition-all
              duration-300
              active:scale-[0.98] 
              disabled:opacity-50 
              disabled:cursor-not-allowed
              mt-2
              border-0
              text-white
              ${name.trim() ? 'animate-subtle-pulse' : ''}
            `}
            style={{
              background: 'linear-gradient(45deg, #B89B7A, #b29670)'
            }}
            disabled={!name.trim()}
          >
            <span className="flex items-center justify-center gap-2">
              DESCOBRIR MEU ESTILO AGORA
              <span className="text-[12px]">{name && `→`}</span>
            </span>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default QuizIntro;
