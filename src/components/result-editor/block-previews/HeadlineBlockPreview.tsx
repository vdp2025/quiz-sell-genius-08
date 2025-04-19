
import React from 'react';

interface HeadlineBlockPreviewProps {
  content: {
    title?: string;
    subtitle?: string;
    alignment?: 'left' | 'center' | 'right';
    textColor?: string;
    style?: any;
  };
  styleType?: string;
  isPreview?: boolean;
  block?: any;
}

const HeadlineBlockPreview: React.FC<HeadlineBlockPreviewProps> = ({ content, styleType, isPreview, block }) => {
  const textColor = content.textColor || '#432818';
  const alignment = content.alignment || 'center';
  
  const containerStyle = {
    textAlign: alignment,
    ...content.style
  };
  
  return (
    <div style={containerStyle} className="space-y-2">
      {content.title && (
        <h2 
          className="text-2xl md:text-3xl font-playfair font-bold"
          style={{ color: textColor }}
        >
          {content.title}
        </h2>
      )}
      {content.subtitle && (
        <p className="text-[#1A1818]/70">{content.subtitle}</p>
      )}
    </div>
  );
};

export default HeadlineBlockPreview;
