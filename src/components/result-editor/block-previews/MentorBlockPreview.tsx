
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
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <img
          src={mentor.image}
          alt={mentor.name}
          className="w-48 h-48 rounded-full object-cover"
        />
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-2xl font-playfair text-[#432818] mb-2">
            {mentor.name}
          </h3>
          <p className="text-[#8F7A6A] mb-4">
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
