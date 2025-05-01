
import React from 'react';
import { EditableContent } from '@/types/editor';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureComparisonBlockProps {
  content: EditableContent;
  onClick: () => void;
}

export const FeatureComparisonBlock: React.FC<FeatureComparisonBlockProps> = ({
  content,
  onClick
}) => {
  const features = content.features || [
    { name: "Análise de Estilo", included: true, premium: true },
    { name: "Consultoria Básica", included: true, premium: true },
    { name: "Guia de Cores", included: false, premium: true },
    { name: "Orientação de Tecidos", included: false, premium: true }
  ];
  
  return (
    <div 
      className="p-4 bg-white border border-[#B89B7A]/20 rounded-lg shadow-sm"
      style={content.style ? {...content.style as React.CSSProperties} : {}}
      onClick={onClick}
    >
      <h3 className="text-center font-medium text-[#432818] mb-4">
        {content.title || "Comparação de Recursos"}
      </h3>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-[#FBF7F4]">
            <tr>
              <th className="p-3 text-left text-[#8F7A6A] border-b border-[#B89B7A]/10">Recurso</th>
              <th className="p-3 text-center text-[#8F7A6A] border-b border-[#B89B7A]/10">
                {content.basicPlanName || "Plano Básico"}
              </th>
              <th className="p-3 text-center text-[#8F7A6A] border-b border-[#B89B7A]/10">
                {content.premiumPlanName || "Plano Premium"}
              </th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <tr key={index} className={cn(index % 2 === 0 ? 'bg-white' : 'bg-[#FBF7F4]')}>
                <td className="p-3 border-b border-[#B89B7A]/10 text-[#432818]">{feature.name}</td>
                <td className="p-3 border-b border-[#B89B7A]/10 text-center">
                  {feature.included ? (
                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                  ) : (
                    <X className="w-5 h-5 text-red-400 mx-auto" />
                  )}
                </td>
                <td className="p-3 border-b border-[#B89B7A]/10 text-center">
                  {feature.premium ? (
                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                  ) : (
                    <X className="w-5 h-5 text-red-400 mx-auto" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
