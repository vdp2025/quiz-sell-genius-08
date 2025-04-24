
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { QuoteIcon } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  text: string;
}

interface TestimonialsProps {
  items?: Testimonial[];
}

const Testimonials: React.FC<TestimonialsProps> = ({ items = [] }) => {
  const defaultTestimonials: Testimonial[] = [
    {
      name: 'Ana Carolina',
      role: 'Cliente',
      text: 'O guia de estilo mudou completamente a forma como me visto. Agora entendo porque algumas peças me favoreciam e outras não. Consegui enxugar meu guarda-roupa e hoje tenho muito mais opções de combinação com menos peças!'
    },
    {
      name: 'Mariana Silva',
      role: 'Cliente',
      text: 'Eu sempre gastava dinheiro com roupas que acabavam esquecidas no fundo do armário. Com o guia, descobri meu estilo predominante e agora compro com muito mais consciência. Todo mundo percebeu a diferença!'
    }
  ];

  const testimonialItems = items.length > 0 ? items : defaultTestimonials;

  return (
    <div className="mb-8">
      <h2 className="font-playfair text-xl text-[#432818] mb-4">
        O que dizem nossos clientes
      </h2>
      
      <div className="grid gap-4">
        {testimonialItems.map((testimonial, index) => (
          <Card key={index} className="bg-white border-[#B89B7A]/10">
            <CardContent className="p-6">
              <div className="flex flex-col space-y-3">
                <div className="text-[#B89B7A]">
                  <QuoteIcon className="h-5 w-5" />
                </div>
                <p className="text-[#8F7A6A] italic">{testimonial.text}</p>
                <div>
                  <p className="font-medium text-[#432818]">{testimonial.name}</p>
                  <p className="text-sm text-[#8F7A6A]">{testimonial.role}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
