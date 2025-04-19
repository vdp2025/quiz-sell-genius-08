
import React from 'react';

interface TestimonialsBlockPreviewProps {
  content: {
    title?: string;
    testimonials?: Array<{
      text: string;
      author: string;
      position?: string;
    }>;
    image?: string;
    style?: any;
  };
}

const TestimonialsBlockPreview: React.FC<TestimonialsBlockPreviewProps> = ({ content }) => {
  const defaultTestimonials = [
    {
      text: "Antes, a roupa me vestia. Hoje, eu me visto de propósito. A consultoria me fez dar vida à mulher que sempre existiu em mim.",
      author: "Mariangela",
      position: "Engenheira"
    },
    {
      text: "Aprendi a me valorizar e a dar valor para a imagem que transmito. As pessoas começaram a me olhar diferente — porque eu estava diferente.",
      author: "Patrícia Paranhos",
      position: "Advogada"
    },
    {
      text: "A Gisele me ensinou a entender o que comunico com as roupas. Hoje compro com consciência, estilo e propósito.",
      author: "Sônia Spier",
      position: "Terapeuta"
    }
  ];

  const testimonials = content.testimonials || defaultTestimonials;

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
            <div key={index} className="bg-[#fff8f5] p-4 rounded-lg">
              <p className="text-[#666] mb-3 italic">"{testimonial.text}"</p>
              <p className="text-[#aa6b5d] font-medium">
                — {testimonial.author}
                {testimonial.position && <span className="text-[#999]">, {testimonial.position}</span>}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsBlockPreview;
