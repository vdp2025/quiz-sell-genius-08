import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const StyleOfferPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center py-12 px-4">
      <Card className="max-w-2xl w-full p-8 shadow-lg border-2 border-amber-200">
        <h1 className="text-3xl font-bold text-[#432818] mb-4 text-center">
          Descubra o Seu Estilo e Transforme Seu Guarda-Roupa!
        </h1>
        <p className="text-lg text-[#8F7A6A] mb-6 text-center">
          Oferta exclusiva: Teste de Estilo + Guia de Estilo + Bônus Peças-Chave + Guia de Visagismo Facial
        </p>
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-[#432818] mb-2">O que você vai receber:</h2>
            <ul className="list-disc pl-6 text-[#6F4E37] space-y-2">
              <li><b>Teste de Estilo:</b> Descubra qual estilo mais combina com você e como expressá-lo no dia a dia.</li>
              <li><b>Guia de Estilo:</b> Dicas práticas para montar looks incríveis e autênticos.</li>
              <li><b>Bônus Peças-Chave:</b> Lista das peças essenciais para um guarda-roupa de sucesso.</li>
              <li><b>Guia de Visagismo Facial:</b> Aprenda a valorizar seu rosto com cortes, acessórios e maquiagem.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-[#432818] mb-2">Por que aproveitar essa oferta?</h2>
            <ul className="list-disc pl-6 text-[#6F4E37] space-y-2">
              <li>Transforme sua imagem e autoestima.</li>
              <li>Economize tempo e dinheiro com escolhas certeiras.</li>
              <li>Receba materiais exclusivos e práticos.</li>
            </ul>
          </section>
          <div className="flex flex-col items-center mt-8">
            <Button className="bg-[#432818] text-white px-8 py-3 text-lg rounded-lg shadow hover:bg-[#6F4E37] transition">
              Quero garantir minha transformação!
            </Button>
            <p className="text-xs text-[#8F7A6A] mt-2">Acesso imediato após a confirmação.</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StyleOfferPage;
