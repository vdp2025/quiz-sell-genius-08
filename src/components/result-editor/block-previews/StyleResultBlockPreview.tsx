
import React from 'react';
import { EditableContent } from '@/types/editor';
import { StyleResult } from '@/types/quiz';
import { getStyleConfig } from '@/utils/styleUtils';

interface StyleResultBlockPreviewProps {
  content: EditableContent;
  primaryStyle?: StyleResult;
  styleType?: string;
}

export const StyleResultBlockPreview: React.FC<StyleResultBlockPreviewProps> = ({
  content,
  primaryStyle,
  styleType
}) => {
  // Use styleType if provided, otherwise use primaryStyle
  const styleCategory = styleType || primaryStyle?.category || 'Natural';
  const styleInfo = getStyleConfig(styleCategory as any);

  return (
    <div className="p-6 bg-white rounded-lg border border-[#B89B7A]/20">
      <div className="flex flex-col md:flex-row items-center gap-6">
        {content.imageUrl ? (
          <img
            src={content.imageUrl}
            alt={styleCategory}
            className="w-full md:w-1/3 rounded-lg"
          />
        ) : (
          <img
            src={styleInfo.image}
            alt={styleCategory}
            className="w-full md:w-1/3 rounded-lg"
          />
        )}
        <div className="flex-1">
          <h2 className="text-xl font-playfair text-[#432818] mb-2">
            {content.title || `Seu estilo predominante é ${styleCategory}`}
          </h2>
          <p className="text-[#8F7A6A]">
            {content.description || styleInfo.description}
          </p>
        </div>
      </div>
    </div>
  );
};
