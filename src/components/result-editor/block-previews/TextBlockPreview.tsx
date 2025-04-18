
import React from 'react';

interface TextBlockPreviewProps {
  content: {
    text?: string;
    alignment?: 'left' | 'center' | 'right';
    textColor?: string;
    style?: any;
  };
}

const TextBlockPreview: React.FC<TextBlockPreviewProps> = ({ content }) => {
  const textStyle = {
    textAlign: content.alignment || 'left',
    color: content.textColor || '#1A1818',
    ...content.style
  };

  return (
    <div className="prose max-w-none" style={textStyle}>
      <p className="text-[#1A1818]/90">
        {content.text || 'Digite seu texto aqui...'}
      </p>
    </div>
  );
};

export default TextBlockPreview;
