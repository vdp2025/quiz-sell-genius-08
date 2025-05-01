
import React from 'react';
import { EditableContent } from '@/types/editor';

interface TestimonialCardBlockPreviewProps {
  content: EditableContent;
}

const TestimonialCardBlockPreview: React.FC<TestimonialCardBlockPreviewProps> = ({ content }) => {
  // Default values for the testimonial
  const name = content.name || 'Maria Silva';
  const role = content.role || 'Cliente desde 2022';
  const testimonialText = content.testimonialText || 'Este guia de estilo mudou completamente a forma como me visto. Agora tenho confiança para escolher roupas que realmente combinam com minha personalidade.';
  const rating = content.rating || 5;
  const avatarUrl = content.avatarUrl || '';

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-[#B89B7A]/20">
      <div className="flex items-start">
        {avatarUrl && (
          <div className="mr-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#B89B7A]/30">
              <img 
                src={avatarUrl} 
                alt={`Avatar de ${name}`} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
        <div className="flex-1">
          <div className="text-amber-500 mb-2">
            {Array.from({length: rating}, (_, i) => (
              <span key={i}>★</span>
            ))}
            {Array.from({length: 5 - rating}, (_, i) => (
              <span key={i} className="text-gray-300">★</span>
            ))}
          </div>
          <p className="text-[#432818] italic mb-3">"{testimonialText}"</p>
          <div>
            <p className="font-medium text-[#432818]">{name}</p>
            {role && <p className="text-sm text-[#8F7A6A]">{role}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCardBlockPreview;
