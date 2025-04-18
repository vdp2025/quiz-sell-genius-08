
import React from 'react';
import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Maria Silva",
    text: "O guia mudou completamente minha relação com a moda. Agora sei exatamente o que combina comigo!",
    rating: 5
  },
  {
    name: "Ana Santos",
    text: "Incrível como pequenas mudanças fazem tanta diferença. Me sinto mais confiante e autêntica.",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <Card className="p-6 bg-white/50 backdrop-blur border border-[#B89B7A]/20 mb-6">
      <h3 className="text-xl font-playfair text-[#432818] mb-4">
        O que outras mulheres estão dizendo:
      </h3>
      <div className="space-y-4">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="p-4 bg-white rounded-lg shadow-sm">
            <div className="flex gap-1 mb-2">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#B89B7A] text-[#B89B7A]" />
              ))}
            </div>
            <p className="text-[#1A1818]/80 italic mb-2">"{testimonial.text}"</p>
            <p className="text-sm font-medium text-[#432818]">{testimonial.name}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Testimonials;
