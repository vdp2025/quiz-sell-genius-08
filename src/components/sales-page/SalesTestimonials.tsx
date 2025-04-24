
import React from 'react';
import { Card } from '@/components/ui/card';
import { Quote } from 'lucide-react';

interface Testimonial {
  text: string;
  name: string;
  role: string;
}

interface SalesTestimonialsProps {
  title?: string;
  items?: Testimonial[];
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
  cardBgColor?: string;
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

const SalesTestimonials: React.FC<SalesTestimonialsProps> = ({ 
  title = "O que dizem quem já transformou seu estilo:",
  items,
  backgroundColor = "white",
  textColor = "#6b605a",
  accentColor = "#aa6b5d",
  cardBgColor = "#fef5f2"
}) => {
  const testimonialsToShow = items || defaultTestimonials;
  
  return (
    <Card 
      className="p-6 mb-8"
      style={{ backgroundColor }}
    >
      <h3 
        className="text-xl font-medium mb-6 text-center"
        style={{ color: textColor.replace('a', '4') }} // Slightly darker
      >
        {title}
      </h3>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {testimonialsToShow.map((testimonial, index) => (
          <div 
            key={index} 
            className="p-4 rounded-lg relative"
            style={{ backgroundColor: cardBgColor }}
          >
            <Quote 
              className="w-7 h-7 absolute -top-3 -left-3" 
              style={{ color: `${accentColor}20` }}
            />
            <p 
              className="text-sm italic mb-4"
              style={{ color: textColor }}
            >
              {testimonial.text}
            </p>
            <div className="text-right">
              <p 
                className="font-medium"
                style={{ color: textColor.replace('a', '4') }}
              >
                {testimonial.name}
              </p>
              <p 
                className="text-xs"
                style={{ color: textColor }}
              >
                {testimonial.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SalesTestimonials;
