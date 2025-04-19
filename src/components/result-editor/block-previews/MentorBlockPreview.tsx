
import React from 'react';
import { salesConfig } from '@/config/salesConfig';

interface MentorBlockPreviewProps {
  content?: {
    name?: string;
    image?: string;
    title?: string;
    bio?: string;
  };
}

const MentorBlockPreview: React.FC<MentorBlockPreviewProps> = ({ content }) => {
  const mentor = content || salesConfig.mentor;

  return (
    <div className="bg-[#fff7f3] rounded-lg p-8 shadow-sm my-12">
      <div className="flex flex-col md:flex-row gap-8 items-center max-w-4xl mx-auto">
        <div className="w-48 h-48 rounded-full overflow-hidden flex-shrink-0 shadow-lg">
          <img
            src={mentor.image}
            alt={mentor.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-2xl font-playfair text-[#aa6b5d] mb-2">
            {mentor.name}
          </h3>
          <p className="text-[#8F7A6A] mb-4 italic">
            {mentor.title}
          </p>
          <p className="text-[#432818] leading-relaxed">
            {mentor.bio}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MentorBlockPreview;
