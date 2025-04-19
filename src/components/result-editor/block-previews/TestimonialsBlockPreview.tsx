
import React from 'react';
import { EditableContent } from '@/types/editor';
import { Quote } from 'lucide-react';

interface TestimonialsBlockPreviewProps {
  content: EditableContent;
  styleType?: string;
}

const TestimonialsBlockPreview: React.FC<TestimonialsBlockPreviewProps> = ({ content, styleType = 'Natural' }) => {
  const getStyleColor = () => {
    const styleColors: Record<string, string> = {
      'Natural': '#B89B7A',
      'Clássico': '#9F9B9D',
      'Contemporâneo': '#3E4152',
      'Elegante': '#9B7A6D',
      'Romântico': '#D69BCD',
      'Sexy': '#DF5461',
      'Dramático': '#465362',
      'Criativo': '#E9742B'
    };
    
    return styleColors[styleType] || '#B89B7A';
  };
  
  const styleColor = getStyleColor();
  const testimonials = content.testimonials || [];

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-center mb-8" style={{ color: styleColor }}>
        {content.title || 'O que nossas clientes dizem'}
      </h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        {testimonials.map((testimonial: any, index: number) => (
          <div key={index} className="bg-gray-50 rounded-lg p-6 relative">
            <Quote 
              className="absolute top-4 right-4 opacity-10 w-10 h-10"
              style={{ color: styleColor }}
            />
            <p className="text-gray-700 mb-4 italic">
              "{testimonial.text || 'Depoimento da cliente'}"
            </p>
            
            <div className="flex items-center">
              {testimonial.image && (
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
              )}
              <div>
                <h4 className="font-medium" style={{ color: styleColor }}>
                  {testimonial.name || 'Nome da Cliente'}
                </h4>
                <p className="text-sm text-gray-600">
                  {testimonial.location || 'Localização'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsBlockPreview;
