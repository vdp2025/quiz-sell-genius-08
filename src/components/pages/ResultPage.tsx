import React from 'react';

import {
  BlocoIntroducao,
  BlocoOferta,
  BlocoBonus,
  BlocoDepoimentos,
  BlocoMentora,
  BlocoGarantia,
  BlocoUrgencia,
} from './copy-estrutura';

import { Button } from '@/components/ui/button';
import { CheckCircle, Lock } from 'lucide-react';

export const PaginaVendaGuiaEstilo = () => {
  return (
    <div className="bg-[#fffaf7] text-[#432818] font-sans px-4 py-10 max-w-5xl mx-auto space-y-16">
      {/* Bloco 1 – Introdução */}
      <section>
        <h1 className="text-3xl font-playfair text-[#aa6b5d] mb-4">{BlocoIntroducao.title}</h1>
        <div className="space-y-4 text-lg">
          {BlocoIntroducao.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      {/* Bloco 2 – Oferta */}
      <section className="space-y-6">
        <h2 className="text-2xl font-playfair text-[#aa6b5d]">{BlocoOferta.title}</h2>
        <p className="text-lg">{BlocoOferta.subtitle}</p>
        <ul className="space-y-2 text-base">
          {BlocoOferta.bullets.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle className="text-[#aa6b5d] w-5 h-5 mt-1" />
              <span>{item.replace('✔️ ', '')}</span>
            </li>
          ))}
        </ul>
        <img src={BlocoOferta.image} alt="Mockup Guia de Estilo" className="rounded-lg shadow-md max-w-md mx-auto" />
        <div className="text-center">
          <Button
            className="bg-[#aa6b5d] hover:bg-[#bfa08e] text-white px-6 py-4 mt-4 text-lg"
            onClick={() => window.location.href = BlocoOferta.cta.link}
          >
            {BlocoOferta.cta.text}
          </Button>
        </div>
      </section>

      {/* Bloco 3 – Bônus */}
      <section>
        <h2 className="text-2xl font-playfair text-[#aa6b5d] mb-6">{BlocoBonus.title}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {BlocoBonus.bonus.map((bonus, i) => (
            <div key={i} className="bg-white p-4 rounded-lg border shadow-sm">
              <img src={bonus.image} alt={bonus.name} className="rounded-md mb-4" />
              <h3 className="text-lg font-semibold text-[#aa6b5d]">{bonus.name}</h3>
              <p className="text-base">{bonus.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bloco 4 – Depoimentos com imagens */}
      <section>
        <h2 className="text-2xl font-playfair text-[#aa6b5d] mb-6">{BlocoDepoimentos.title}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {BlocoDepoimentos.items.map((item, i) => (
            <div key={i} className="bg-white rounded-lg p-4 border shadow-sm flex flex-col items-center text-center space-y-3">
              <img src={item.image} alt={item.author} className="rounded-lg shadow-md w-full" />
              <p className="italic text-sm">"{item.text}"</p>
              <p className="font-semibold text-[#aa6b5d]">{item.author}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bloco 5 – Mentora */}
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <img src={BlocoMentora.image} alt="Gisele Galvão" className="rounded-lg shadow-md" />
        <div>
          <h2 className="text-2xl font-playfair text-[#aa6b5d] mb-4">{BlocoMentora.title}</h2>
          <p className="text-base">{BlocoMentora.bio}</p>
        </div>
      </section>

      {/* Bloco 6 – Garantia */}
      <section className="text-center">
        <h2 className="text-2xl font-playfair text-[#aa6b5d] mb-4">{BlocoGarantia.title}</h2>
        <p className="text-base max-w-xl mx-auto mb-6">{BlocoGarantia.description}</p>
        <img src={BlocoGarantia.image} alt="Garantia" className="rounded-lg shadow-md max-w-sm mx-auto" />
      </section>

      {/* Bloco 7 – Urgência e CTA final */}
      <section className="text-center bg-[#fff3ed] p-8 rounded-lg border shadow-md space-y-4">
        <h2 className="text-2xl font-playfair text-[#aa6b5d]">{BlocoUrgencia.title}</h2>
        <p className="text-base max-w-xl mx-auto">{BlocoUrgencia.subtitle}</p>
        <Button
          className="bg-[#4CAF50] hover:bg-[#388e3c] text-white px-8 py-4 text-lg mt-2"
          onClick={() => window.location.href = BlocoUrgencia.ctaLink}
        >
          {BlocoUrgencia.ctaText}
        </Button>
        <p className="text-sm text-[#aa6b5d] mt-2 flex items-center justify-center gap-1">
          <Lock className="w-3 h-3" />
          <span>Compra segura e imediata</span>
        </p>
      </section>
    </div>
  );
};

export default PaginaVendaGuiaEstilo;
