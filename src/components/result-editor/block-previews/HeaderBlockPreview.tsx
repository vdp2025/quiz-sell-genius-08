
import React from 'react';

interface HeaderBlockPreviewProps {
  content: {
    title?: string;
    subtitle?: string;
    logo?: string;
    logoAlt?: string;
    style?: any;
  };
}

const HeaderBlockPreview: React.FC<HeaderBlockPreviewProps> = ({ content }) => {
  return (
    <div className="text-center space-y-4" style={content.style}>
      {content.logo && (
        <img 
          src={content.logo} 
          alt={content.logoAlt || 'Logo'} 
          className="h-12 mx-auto"
        />
      )}
      <h1 className="font-playfair text-xl md:text-2xl font-semibold text-[#432818]">
        {content.title || 'Olá, seu Estilo Predominante é:'}
      </h1>
      {content.subtitle && (
        <p className="text-[#1A1818]/70">{content.subtitle}</p>
      )}
    </div>
  );
};

export default HeaderBlockPreview;
