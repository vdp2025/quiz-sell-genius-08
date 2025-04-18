
import React from 'react';
import { StyleResultPreview } from '@/components/editor/blocks/StyleResultPreview';
import { StyleResult } from '@/types/quiz';

interface StyleResultBlockPreviewProps {
  content: {
    description?: string;
    customImage?: string;
  };
  primaryStyle: StyleResult;
}

const StyleResultBlockPreview: React.FC<StyleResultBlockPreviewProps> = ({ 
  content,
  primaryStyle
}) => {
  return (
    <StyleResultPreview
      primaryStyle={primaryStyle}
      description={content.description}
      customImage={content.customImage}
    />
  );
};

export default StyleResultBlockPreview;
