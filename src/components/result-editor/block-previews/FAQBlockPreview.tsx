
import React, { useState } from 'react';
import { EditableContent } from '@/types/editor';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface FAQBlockPreviewProps {
  content: EditableContent;
  styleType?: string;
}

const FAQBlockPreview: React.FC<FAQBlockPreviewProps> = ({ content, styleType = 'Natural' }) => {
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
  const faqItems = content.faqItems || [];
  const defaultValue = content.defaultOpen && faqItems.length > 0 ? `item-0` : undefined;

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-center mb-8" style={{ color: styleColor }}>
        {content.title || 'Perguntas Frequentes'}
      </h2>
      
      <Accordion type="single" collapsible defaultValue={defaultValue} className="w-full">
        {faqItems.map((item: any, index: number) => (
          <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200">
            <AccordionTrigger className="text-left font-medium py-4">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-700 pb-4">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQBlockPreview;
