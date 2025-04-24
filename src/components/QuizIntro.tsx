
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface QuizIntroProps {
  onStart: (name: string) => void;
}

const QuizIntro: React.FC<QuizIntroProps> = ({ onStart }) => {
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    setIsSubmitting(true);
    onStart(name.trim());
  };
  
  return (
    <div className="min-h-screen bg-[#FFFAF7] flex flex-col">
      {/* Header with logo */}
      <header className="p-4 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto">
          <img 
            src="/lovable-uploads/d9da05d3-6fdd-46d0-afea-42417af058c5.png" 
            alt="Quiz de Estilo Pessoal"
            className="h-12 mx-auto md:mx-0" 
          />
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 max-w-4xl mx-auto">
        <div className="w-full max-w-xl bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Image area */}
          <div className="relative h-60 bg-[#B89B7A]/10">
            <img
              src="/lovable-uploads/84341867-0bff-402e-a89f-be5747b706ba.png"
              alt="Estilo pessoal"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#432818]/40 to-transparent"></div>
          </div>
          
          {/* Content area */}
          <div className="p-8">
            <h1 className="font-playfair text-3xl md:text-4xl text-[#432818] text-center mb-6">
              Descubra seu Estilo Pessoal
            </h1>
            
            <p className="text-[#8F7A6A] text-center mb-8">
              Responda às perguntas para descobrir qual estilo mais combina com a sua personalidade e aprenda a valorizar sua imagem.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label 
                  htmlFor="name" 
                  className="block text-sm font-medium text-[#432818] mb-2"
                >
                  Como podemos te chamar?
                </label>
                <Input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Digite seu nome"
                  className="w-full p-3 border border-[#B89B7A]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B89B7A]"
                  required
                />
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-[#B89B7A] hover:bg-[#B89B7A]/90 text-white py-3 rounded-md font-medium transition-all duration-200 flex items-center justify-center"
                disabled={!name.trim() || isSubmitting}
              >
                Continuar
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-4 text-center text-[#8F7A6A] text-sm">
        <p>© {new Date().getFullYear()} Quiz de Estilo Pessoal. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default QuizIntro;
