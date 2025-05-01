
import React from 'react';
import { Card } from '@/components/ui/card';
import { Quote } from 'lucide-react';
import { Testimonial } from '@/types/testimonials';

interface TestimonialsProps {
  items?: Testimonial[];
}

const defaultTestimonials = [
  {
    text: "Antes, a roupa me vestia. Hoje, eu me visto de propósito. A consultoria me fez dar vida à mulher que sempre existiu em mim.",
    name: "Mariangela",
    role: "Engenheira"
  },
  {
    text: "Aprendi a me valorizar e a dar valor para a imagem que transmito. As pessoas começaram a me olhar diferente — porque eu estava diferente.",
    name: "Patrícia Paranhos",
    role: "Advogada"
  },
  {
    text: "A Gisele me ensinou a entender o que comunico com as roupas. Hoje compro com consciência, estilo e propósito.",
    name: "Sônia Spier",
    role: "Terapeuta"
  }
];

const Testimonials: React.FC<TestimonialsProps> = ({ items }) => {
  const testimonialsToShow = items || defaultTestimonials;
  
  return (
    <Card className="p-6 bg-white">
      <h3 className="text-xl font-medium text-[#432818] mb-6 text-center">
        O que dizem quem já transformou seu estilo:
      </h3>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {testimonialsToShow.map((testimonial, index) => (
          <div key={index} className="p-4 bg-[#fef5f2] rounded-lg relative">
            <Quote className="w-7 h-7 text-[#aa6b5d]/20 absolute -top-3 -left-3" />
            <p className="text-[#6b605a] text-sm italic mb-4">
              {testimonial.testimonialText || testimonial.text}
            </p>
            <div className="text-right">
              <p className="font-medium text-[#432818]">{testimonial.name}</p>
              <p className="text-xs text-[#6b605a]">{testimonial.role}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Testimonials;
