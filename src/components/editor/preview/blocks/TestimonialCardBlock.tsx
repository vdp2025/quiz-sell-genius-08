
import React from 'react';
import { EditableContent } from '@/types/editor';
import { cn } from '@/lib/utils';

interface TestimonialCardBlockProps {
  content: EditableContent;
  onClick: () => void;
}

export const TestimonialCardBlock: React.FC<TestimonialCardBlockProps> = ({
  content,
  onClick
}) => {
  const avatarUrl = content.avatarUrl || "https://res.cloudinary.com/dqljyf76t/image/upload/v1744921536/Sem_nome_1080_x_1000_px_z0chuv.webp";
  
  return (
    <div 
      className={cn(
        "p-6 bg-white border border-[#B89B7A]/20 rounded-lg shadow-sm",
        content.style?.backgroundColor ? "" : "bg-[#FFF8F0]"
      )}
      style={content.style ? {...content.style as React.CSSProperties} : {}}
      onClick={onClick}
    >
      <div className="flex flex-col items-center text-center">
        <div className="w-20 h-20 mb-4 rounded-full overflow-hidden border-2 border-[#B89B7A]/30">
          <img 
            src={avatarUrl} 
            alt={content.name || "Cliente"} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="space-y-3">
          <div>
            <p className="text-[#432818] italic mb-4">
              "{content.testimonialText || "Este guia de estilo mudou completamente a forma como me visto. Agora tenho confiança para escolher roupas que realmente combinam com minha personalidade."}"
            </p>
            
            <h4 className="font-medium text-[#432818]">
              {content.name || "Maria Silva"}
            </h4>
            
            {content.role && (
              <p className="text-sm text-[#8F7A6A]">{content.role}</p>
            )}
          </div>
          
          {content.rating && (
            <div className="flex justify-center">
              {'★'.repeat(content.rating)}
              {'☆'.repeat(5 - content.rating)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
