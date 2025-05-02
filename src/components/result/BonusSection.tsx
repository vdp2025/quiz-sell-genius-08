
import React from 'react';
import { Card } from '@/components/ui/card';
import { Check, Award, Star } from 'lucide-react';
interface BonusItemProps {
  title: string;
  description: string;
  image: string;
  value: string;
  isPremium?: boolean;
  features?: string[];
}
const bonuses: BonusItemProps[] = [{
  title: "Guia de Peças-Chave",
  description: "Descubra as peças essenciais para seu estilo, como combiná-las e onde encontrá-las por preços acessíveis",
  image: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911677/C%C3%B3pia_de_MOCKUPS_15_-_Copia_grstwl.webp",
  value: "R$ 79,00",
  isPremium: true,
  features: ["Lista completa de peças essenciais para seu estilo", "Guia de combinações versáteis", "Onde encontrar por preços acessíveis", "Como avaliar a qualidade das peças"]
}, {
  title: "Visagismo Facial",
  description: "Aprenda a valorizar seus traços faciais com as técnicas certas de maquiagem, cortes de cabelo e acessórios",
  image: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911666/C%C3%B3pia_de_Template_Dossi%C3%AA_Completo_2024_15_-_Copia_ssrhu3.webp",
  value: "R$ 29,00",
  features: ["Análise de formato de rosto", "Recomendações de cortes de cabelo", "Técnicas de maquiagem para valorizar", "Escolha de acessórios ideais"]
}];
const BonusSection: React.FC = () => {
  return <section className="py-10">
      <h2 className="text-2xl md:text-3xl font-playfair text-[#aa6b5d] text-center mb-2">
        Bônus Exclusivos
      </h2>
      <p className="text-center text-[#3a3a3a] mb-4 max-w-2xl mx-auto">Além do guia completo, você recebe estes bônus especiais para potencializar sua transformação</p>
      <div className="elegant-divider w-32 mx-auto mt-0 mb-6"></div>

      <div className="grid md:grid-cols-2 gap-8">
        {bonuses.map((bonus, index) => <Card key={index} className={`card-elegant overflow-hidden relative ${bonus.isPremium ? 'border-2 border-[#B89B7A]' : 'border border-[#B89B7A]/20'}`}>
            {bonus.isPremium && <div className="absolute top-0 right-0 bg-[#B89B7A] text-white px-4 py-1 transform translate-x-8 translate-y-2 rotate-45 shadow-md">
                <span className="text-xs font-bold">DESTAQUE</span>
              </div>}
            
            <div className="aspect-[16/9] overflow-hidden">
              <img src={bonus.image} alt={bonus.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
            </div>

            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-medium text-[#432818]">
                  {bonus.title}
                </h3>
                <div className="text-[#aa6b5d] font-bold">
                  {bonus.value}
                </div>
              </div>
              
              <p className="text-[#3a3a3a] mb-4">
                {bonus.description}
              </p>

              <div className="border-t border-[#B89B7A]/10 pt-3 mt-3">
                <h4 className="flex items-center gap-2 font-medium text-[#432818]">
                  {bonus.isPremium ? <Award className="w-5 h-5 text-[#B89B7A]" /> : <Star className="w-5 h-5 text-[#B89B7A]" />}
                  O que está incluído:
                </h4>
                <ul className="mt-2 space-y-2">
                  {bonus.features?.map((feature, i) => <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#4CAF50] mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-[#3a3a3a]">{feature}</span>
                    </li>)}
                </ul>
              </div>
            </div>
          </Card>)}
      </div>
    </section>;
};
export default BonusSection;
