
import React from 'react';

interface SalesBonusSectionProps {
  bonusImage?: string;
  bonusImageAlt?: string;
  mentorImage?: string;
  mentorImageAlt?: string;
  gap?: string;
}

const SalesBonusSection: React.FC<SalesBonusSectionProps> = ({ 
  bonusImage = "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911677/C%C3%B3pia_de_MOCKUPS_15_-_Copia_grstwl.webp",
  bonusImageAlt = "Mockup celular peças-chave por dentro",
  mentorImage = "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911667/WhatsApp_Image_2025-04-02_at_09.40.53_cv8p5y.webp",
  mentorImageAlt = "Foto Gisele Galvão",
  gap = "gap-6"
}) => {
  return (
    <div className={`grid md:grid-cols-2 ${gap} mb-8`}>
      <img
        src={bonusImage}
        alt={bonusImageAlt}
        className="w-full rounded-lg"
      />
      <img
        src={mentorImage}
        alt={mentorImageAlt}
        className="w-full rounded-lg"
      />
    </div>
  );
};

export default SalesBonusSection;
