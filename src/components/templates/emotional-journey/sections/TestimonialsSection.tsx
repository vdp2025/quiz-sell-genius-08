
import React from 'react';
import { Card } from '@/components/ui/card';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      quote: "Descobrir meu estilo mudou completamente minha relação com a moda e comigo mesma.",
      author: "Maria, 32",
      style: "Romântico"
    },
    {
      quote: "Finalmente entendi porque algumas roupas me faziam sentir tão bem e outras não.",
      author: "Ana, 28",
      style: "Natural"
    }
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-playfair text-[#1A1F2C] text-center">
        Histórias de Transformação
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {testimonials.map((testimonial, index) => (
          <Card 
            key={index}
            className="p-6 bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300"
          >
            <blockquote className="space-y-4">
              <p className="text-lg text-[#6E59A5] italic">
                "{testimonial.quote}"
              </p>
              <footer className="text-sm text-[#7E69AB]">
                {testimonial.author} - Estilo {testimonial.style}
              </footer>
            </blockquote>
          </Card>
        ))}
      </div>
    </div>
  );
};
