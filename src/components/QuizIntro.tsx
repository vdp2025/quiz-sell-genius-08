import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
interface QuizIntroProps {
  onStart: (name: string) => void;
}
export const QuizIntro: React.FC<QuizIntroProps> = ({
  onStart
}) => {
  const [name, setName] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onStart(name);
    }
  };
  return <div className="min-h-screen flex items-center justify-center bg-[#FAF9F7] px-4 py-8">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-4 md:p-8 flex flex-col items-center">
        {/* Logo */}
        <img src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp" alt="Logo Gisele Galvão" className="w-32 md:w-40 h-auto mb-2" />

<<<<<<< HEAD
        {/* Barra de carregamento dourada animada */}
        <div className="relative w-full max-w-md h-[4px] bg-[#f1e8db] rounded-full overflow-hidden mb-6">
          <div className="absolute inset-0 w-1/3 bg-[#b29670] animate-loading-bar rounded-full"></div>
        </div>

        {/* Título */}
        <h1 className="font-playfair text-xl md:text-2xl font-bold text-center mb-4 leading-snug text-gray-950">
          Chega de um guarda-roupa lotado<br className="hidden md:block" /> e da sensação de que nada combina com você.
=======
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
>>>>>>> 4d31a4e3180b07eda5f6207bf7f618722a91b0e6
        </h1>

        {/* Imagem principal - Further reduced size */}
        <img alt="Mulher elegante com roupas estilosas" className="w-full max-w-xs h-auto object-cover mb-6 rounded-lg shadow-sm" src="https://res.cloudinary.com/dqljyf76t/image/upload/v1745193439/9a20446f-e01f-48f4-96d0-f4b37cc06625_ebd68o.jpg" />

        {/* Subtítulo com destaque */}
        <p className="text-sm md:text-base text-black text-center mb-6 max-w-lg">
          Em poucos minutos, descubra seu <span className="font-semibold text-[#B89B7A]">Estilo Predominante</span> — 
          e aprenda a montar looks que realmente refletem sua <span className="font-semibold text-[#b29670]">essência</span>, com praticidade e <span className="font-semibold text-[#aa6b5d]">confiança</span>.
        </p>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-3">
          <label htmlFor="name" className="text-sm font-semibold text-[#432818]">NOME *</label>
          <Input id="name" placeholder="Digite seu nome" value={name} onChange={e => setName(e.target.value)} className="w-full" autoFocus />

          <Button type="submit" className="
              w-full 
              bg-[#B89B7A] 
              hover:bg-[#aa6b5d] 
              text-white 
              py-4 
              text-base 
              rounded-md 
              shadow 
              transition-all 
              duration-300 
              ease-in-out 
              transform 
              hover:-translate-y-1 
              hover:shadow-lg 
              active:scale-95 
              disabled:opacity-50 
              disabled:cursor-not-allowed
            " disabled={!name.trim()}>
            Continuar
          </Button>
        </form>
      </div>
    </div>;
};
export default QuizIntro;
