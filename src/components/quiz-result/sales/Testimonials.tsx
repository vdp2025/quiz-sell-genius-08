
import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';

interface TestimonialItem {
  name: string;
  role: string;
  text: string;
  avatar?: string;
}

interface TestimonialsProps {
  items?: TestimonialItem[];
  isEditable?: boolean;
  onUpdate?: (items: TestimonialItem[]) => void;
}

const defaultTestimonials = [
  {
    name: "Ana Carolina",
    role: "Professora",
    text: "O guia mudou completamente minha relação com o guarda-roupa. Hoje consigo me vestir de forma prática mas ainda assim me sentindo linda e confiante."
  },
  {
    name: "Gabriela Silva",
    role: "Empreendedora",
    text: "Sempre me senti perdida na hora de comprar roupas, agora tenho clareza do que realmente combina comigo e parei de gastar dinheiro em peças que acabavam esquecidas."
  }
];

const Testimonials: React.FC<TestimonialsProps> = ({ 
  items = defaultTestimonials,
  isEditable = false,
  onUpdate
}) => {
  const handleItemChange = (index: number, field: keyof TestimonialItem, value: string) => {
    if (!onUpdate) return;
    
    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value
    };
    
    onUpdate(updatedItems);
  };

  const addTestimonial = () => {
    if (!onUpdate) return;
    
    const newTestimonial = {
      name: "Novo Nome",
      role: "Profissão",
      text: "Depoimento sobre sua experiência."
    };
    
    onUpdate([...items, newTestimonial]);
  };

  const removeTestimonial = (index: number) => {
    if (!onUpdate) return;
    
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    
    onUpdate(updatedItems);
  };

  return (
    <Card className="p-6 mb-10 bg-white shadow-md border border-[#B89B7A]/20">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-playfair text-[#aa6b5d] mb-3">
          O Que Dizem Nossos Clientes
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {items.map((testimonial, index) => (
          <Card key={index} className="p-5 shadow-sm border border-[#B89B7A]/10">
            {isEditable ? (
              <div className="flex justify-end mb-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeTestimonial(index)}
                  className="h-6 w-6 text-destructive"
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </div>
            ) : null}
            
            {isEditable ? (
              <Textarea
                value={testimonial.text}
                onChange={(e) => handleItemChange(index, 'text', e.target.value)}
                className="text-[#432818] italic mb-4"
                rows={4}
              />
            ) : (
              <p className="text-[#432818] italic mb-4">"{testimonial.text}"</p>
            )}
            
            <div className="flex items-center">
              {isEditable ? (
                <div className="space-y-2 w-full">
                  <Input
                    value={testimonial.name}
                    onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                    placeholder="Nome"
                    className="font-medium text-[#432818]"
                  />
                  <Input
                    value={testimonial.role}
                    onChange={(e) => handleItemChange(index, 'role', e.target.value)}
                    placeholder="Profissão"
                    className="text-sm text-[#8F7A6A]"
                  />
                </div>
              ) : (
                <div>
                  <p className="font-medium text-[#432818]">{testimonial.name}</p>
                  <p className="text-sm text-[#8F7A6A]">{testimonial.role}</p>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
      
      {isEditable && (
        <div className="flex justify-center mt-6">
          <Button 
            variant="outline" 
            onClick={addTestimonial}
          >
            <Plus className="h-4 w-4 mr-2" /> 
            Adicionar depoimento
          </Button>
        </div>
      )}
    </Card>
  );
};

export default Testimonials;
