import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Testimonial } from '@/types/testimonials';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Edit, Check, X } from 'lucide-react';
import { useInlineEdit } from '@/hooks/useInlineEdit';

interface TestimonialsBlockPreviewProps {
  content: {
    title?: string;
    testimonials?: Partial<Testimonial>[];
    image?: string;
    style?: any;
  };
  isPreview?: boolean;
  onUpdate?: (content: any) => void;
  block?: any;
}

const TestimonialsBlockPreview: React.FC<TestimonialsBlockPreviewProps> = ({ 
  content,
  isPreview = true,
  onUpdate,
  block 
}) => {
  const { isEditing, handleStartEdit, handleSave, handleCancel } = useInlineEdit(block, onUpdate || (() => {}));
  
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

  const [editedContent, setEditedContent] = React.useState(content);

  if (!isPreview && !isEditing) {
    return (
      <div className="relative group">
        <div className="bg-white rounded-lg shadow-md overflow-hidden" style={content.style}>
          <div className="p-6">
            <h2 className="text-2xl font-playfair font-bold text-[#aa6b5d] mb-6 text-center">
              {content.title || "Depoimentos de mulheres que já viveram essa transformação"}
            </h2>
            
            {content.image && (
              <div className="mb-6">
                <img 
                  src={content.image} 
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
                        <AvatarImage src={testimonial.image} alt={testimonial.name || ''} />
                        <AvatarFallback>
                          {(testimonial.name || '??').substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div className="flex-1">
                      <p className="text-[#666] mb-3 italic">"{testimonial.text}"</p>
                      <p className="text-[#aa6b5d] font-medium">
                        — {testimonial.name}
                        {testimonial.location && (
                          <span className="text-[#999]">, {testimonial.location}</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={handleStartEdit}
        >
          <Edit className="w-4 h-4 mr-2" />
          Editar
        </Button>
      </div>
    );
  }

  if (!isPreview && isEditing) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden p-6" style={content.style}>
        <div className="space-y-4">
          <Input
            value={editedContent.title || ''}
            onChange={(e) => setEditedContent(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Título da seção"
            className="text-2xl font-playfair font-bold"
          />
          
          <div className="space-y-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-[#fff8f5] p-4 rounded-lg space-y-4">
                <Textarea
                  value={testimonial.text}
                  onChange={(e) => {
                    const newTestimonials = [...testimonials];
                    newTestimonials[index] = { ...testimonial, text: e.target.value };
                    setEditedContent(prev => ({ ...prev, testimonials: newTestimonials }));
                  }}
                  placeholder="Depoimento"
                  className="min-h-[100px]"
                />
                <div className="flex gap-4">
                  <Input
                    value={testimonial.name}
                    onChange={(e) => {
                      const newTestimonials = [...testimonials];
                      newTestimonials[index] = { ...testimonial, name: e.target.value };
                      setEditedContent(prev => ({ ...prev, testimonials: newTestimonials }));
                    }}
                    placeholder="Nome"
                  />
                  <Input
                    value={testimonial.location}
                    onChange={(e) => {
                      const newTestimonials = [...testimonials];
                      newTestimonials[index] = { ...testimonial, location: e.target.value };
                      setEditedContent(prev => ({ ...prev, testimonials: newTestimonials }));
                    }}
                    placeholder="Cargo/Posição"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={handleCancel}>
              <X className="w-4 h-4 mr-2" />
              Cancelar
            </Button>
            <Button onClick={() => handleSave(editedContent)}>
              <Check className="w-4 h-4 mr-2" />
              Salvar
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden" style={content.style}>
      <div className="p-6">
        <h2 className="text-2xl font-playfair font-bold text-[#aa6b5d] mb-6 text-center">
          {content.title || "Depoimentos de mulheres que já viveram essa transformação"}
        </h2>
        
        {content.image && (
          <div className="mb-6">
            <img 
              src={content.image} 
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
                    <AvatarImage src={testimonial.image} alt={testimonial.name || ''} />
                    <AvatarFallback>
                      {(testimonial.name || '??').substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div className="flex-1">
                  <p className="text-[#666] mb-3 italic">"{testimonial.text}"</p>
                  <p className="text-[#aa6b5d] font-medium">
                    — {testimonial.name}
                    {testimonial.location && (
                      <span className="text-[#999]">, {testimonial.location}</span>
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
