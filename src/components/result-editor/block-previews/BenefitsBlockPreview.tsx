
import React from 'react';

interface BenefitsBlockPreviewProps {
  content: {
    title?: string;
    items?: string[];
    style?: any;
  };
}

const BenefitsBlockPreview: React.FC<BenefitsBlockPreviewProps> = ({ content }) => {
  return (
    <div style={content.style}>
      <h3 className="text-xl font-bold mb-4 text-[#aa6b5d]">
        {content.title || 'Benefícios'}
      </h3>
      <ul className="space-y-3">
        {(content.items || [
          'Aplicar seus estilos com autenticidade',
          'Montar looks práticos para o dia a dia, trabalho e eventos',
          'Usar cores e modelagens que valorizam quem você é',
          'Parar de errar nas compras e economizar tempo'
        ]).map((item, index) => (
          <li key={index} className="flex items-start">
            <span className="text-[#aa6b5d] mr-2">✓</span>
            <span className="text-[#1A1818]/80">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BenefitsBlockPreview;
