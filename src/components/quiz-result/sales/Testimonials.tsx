
import React from 'react';
import { Card } from '@/components/ui/card';
import { QuoteIcon } from 'lucide-react';

interface TestimonialItem {
  name: string;
  role?: string;
  text: string;
}

interface TestimonialsProps {
  items?: TestimonialItem[];
}

const Testimonials: React.FC<TestimonialsProps> = ({ 
  items = [
    {
      name: "Mariangela",
      role: "Engenheira",
      text: "Antes, a roupa me vestia. Hoje, eu me visto com intenção. Essa jornada me reconectou com a mulher que sempre fui."
    },
    {
      name: "Patrícia Paranhos",
      role: "Advogada",
      text: "Aprendi a reconhecer meu valor e refletir isso na forma como me apresento. As pessoas começaram a me enxergar diferente — porque eu estava diferente."
    },
    {
      name: "Sônia Spier",
      role: "Terapeuta",
      text: "Com a Gisele, entendi o poder da linguagem visual. Hoje eu escolho minhas roupas com consciência, propósito e leveza."
    }
  ] 
}) => {
  return (
    <div className="py-8">
      <h3 className="text-2xl font-playfair text-center text-[#aa6b5d] mb-6">
        O que estão dizendo
        <div className="elegant-divider w-24 mt-2 mx-auto"></div>
      </h3>
      
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <Card 
            key={index} 
            className="p-6 relative overflow-hidden card-elegant interactive-section"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#B89B7A]/30"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#B89B7A]/30"></div>
            
            <div className="mb-4 text-[#B89B7A] opacity-60">
              <QuoteIcon size={24} />
            </div>
            
            <p className="text-[#3a3a3a] italic mb-4">
              "{item.text}"
            </p>
            
            <div className="flex items-center mt-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#B89B7A]/30 to-[#aa6b5d]/30 flex items-center justify-center text-[#aa6b5d] font-medium">
                {item.name.charAt(0)}
              </div>
              <div className="ml-3">
                <p className="font-medium text-[#432818]">{item.name}</p>
                {item.role && (
                  <p className="text-sm text-[#432818]/70">{item.role}</p>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
