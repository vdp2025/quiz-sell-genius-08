
import React from 'react';

interface TextBlockPreviewProps {
  content: {
    text?: string;
    style?: any;
  };
}

const TextBlockPreview: React.FC<TextBlockPreviewProps> = ({ content }) => {
  return (
    <div className="prose max-w-none" style={content.style}>
      <p className="text-[#1A1818]/90">
        {content.text || 'Digite seu texto aqui...'}
      </p>
    </div>
  );
};

export default TextBlockPreview;
