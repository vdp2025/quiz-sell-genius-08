
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Testimonial } from '@/types/testimonials';

interface TestimonialsBlockPreviewProps {
  content: {
    title?: string;
    testimonials?: Partial<Testimonial>[];
    image?: string;
    style?: any;
  };
}

const TestimonialsBlockPreview: React.FC<TestimonialsBlockPreviewProps> = ({ content }) => {
  const defaultTestimonials = [
    {
      text: "Antes, a roupa me vestia. Hoje, eu me visto de propósito. A consultoria me fez dar vida à mulher que sempre existiu em mim.",
      name: "Mariangela",
      location: "Engenheira"
    },
    {
      text: "Aprendi a me valorizar e a dar valor para a imagem que transmito. As pessoas começaram a me olhar diferente — porque eu estava diferente.",
      name: "Patrícia Paranhos",
      location: "Advogada"
    },
    {
      text: "A Gisele me ensinou a entender o que comunico com as roupas. Hoje compro com consciência, estilo e propósito.",
      name: "Sônia Spier",
      location: "Terapeuta"
    }
  ];

  const testimonials = content.testimonials && content.testimonials.length > 0 ? content.testimonials : defaultTestimonials;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden" style={content.style}>
      <div className="p-6">
        <h2 className="text-2xl font-playfair font-bold text-[#aa6b5d] mb-6 text-center">
          {content.title || "Depoimentos de mulheres que já viveram essa transformação"}
        </h2>
        
        {content.image && (
          <div className="mb-6">
            <img 
              src={content.image || "https://res.cloudinary.com/dqljyf76t/image/upload/v1744916217/Mockups_p%C3%A1gina_de_venda_Guia_de_Estilo_1_vostj4.webp"} 
              alt="Depoimentos" 
              className="w-full h-auto rounded-lg"
            />
          </div>
        )}
        
        <div className="space-y-6">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id || index} className="bg-[#fff8f5] p-4 rounded-lg">
              <div className="flex items-start gap-4">
                {testimonial.image && (
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={testimonial.image} alt={testimonial.name || testimonial.author || ''} />
                    <AvatarFallback>
                      {(testimonial.name || testimonial.author || '??').substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div className="flex-1">
                  <p className="text-[#666] mb-3 italic">"{testimonial.text}"</p>
                  <p className="text-[#aa6b5d] font-medium">
                    — {testimonial.name || testimonial.author}
                    {(testimonial.location || testimonial.position) && (
                      <span className="text-[#999]">, {testimonial.location || testimonial.position}</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsBlockPreview;
