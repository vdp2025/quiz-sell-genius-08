
import React from 'react';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';

interface BenefitItem {
  title: string;
  description: string;
}

interface SalesBenefitListProps {
  title?: string;
  items?: BenefitItem[];
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
  iconColor?: string;
  iconBgColor?: string;
}

const defaultBenefits = [
  {
    title: "Peças que revelam sua essência",
    description: "Descobrir as roupas e acessórios que comunicam quem você realmente é, valorizando seu corpo e sua personalidade."
  },
  {
    title: "Compras com propósito",
    description: "Parar de acumular peças que não combinam e investir no que faz sentido para o seu momento."
  },
  {
    title: "Versatilidade sem esforço",
    description: "Criar combinações que expressam quem você é com menos esforço e mais impacto."
  },
  {
    title: "Autoconfiança visível",
    description: "Sentir segurança no que veste porque cada escolha tem harmonia com quem você é."
  }
];

const SalesBenefitList: React.FC<SalesBenefitListProps> = ({ 
  title = "O que você vai transformar com esse material:",
  items,
  backgroundColor = "white",
  textColor = "#432818",
  accentColor = "#aa6b5d",
  iconColor = "#aa6b5d",
  iconBgColor = "#fce8e3"
}) => {
  const benefitsToShow = items || defaultBenefits;
  
  return (
    <Card 
      className="p-6 space-y-5 mb-8"
      style={{ backgroundColor }}
    >
      <h3 
        className="text-xl font-medium mb-4"
        style={{ color: textColor }}
      >
        {title}
      </h3>

      <div className="space-y-4">
        {benefitsToShow.map((benefit, index) => (
          <div key={index} className="flex gap-3">
            <div 
              className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: iconBgColor }}
            >
              <Check 
                className="w-4 h-4"
                style={{ color: iconColor }}
              />
            </div>
            <div>
              <h4 
                className="font-medium mb-1"
                style={{ color: textColor }}
              >
                {benefit.title}
              </h4>
              <p 
                className="text-sm" 
                style={{ color: `${textColor}cc` }}
              >
                {benefit.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SalesBenefitList;
