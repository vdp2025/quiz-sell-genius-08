
import React from 'react';
import { EditableContent } from '@/types/editor';
import { StyleResult } from '@/types/quiz';
import { Award, Heart, Star, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BlockProps {
  content: EditableContent;
}

interface StyleResultBlockProps extends BlockProps {
  primaryStyle: StyleResult;
}

export const HeaderBlock: React.FC<BlockProps> = ({ content }) => (
  <div className="text-center py-8">
    <h1 className="text-3xl font-playfair text-[#432818] mb-2">
      {content.title || 'Título Principal'}
    </h1>
    {content.subtitle && (
      <p className="text-lg text-[#8F7A6A]">{content.subtitle}</p>
    )}
  </div>
);

export const HeroBlock: React.FC<BlockProps> = ({ content }) => (
  <div className="text-center space-y-6 py-8">
    <h1 className="text-4xl font-playfair text-[#aa6b5d]">
      {content.title || 'VOCÊ DESCOBRIU SEU ESTILO'}
    </h1>
    <p className="text-xl font-playfair text-[#3a3a3a]">
      {content.subtitle || 'Agora é hora de aplicar com clareza — e se vestir de você'}
    </p>
    {content.imageUrl && (
      <img 
        src={content.imageUrl} 
        alt="Hero" 
        className="max-w-full h-auto rounded-lg mx-auto mt-4 shadow-md"
      />
    )}
  </div>
);

export const StyleResultBlock: React.FC<StyleResultBlockProps> = ({ content, primaryStyle }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <h2 className="text-2xl font-playfair text-[#aa6b5d] mb-4">
      {content.title || 'Seu Estilo Predominante'}
    </h2>
    <div className="flex items-center gap-4">
      <div className="w-20 h-20 rounded-full bg-[#aa6b5d] flex items-center justify-center text-white text-2xl font-bold">
        {primaryStyle.percentage}%
      </div>
      <div>
        <h3 className="font-playfair text-xl">{primaryStyle.category}</h3>
        <p className="text-[#3a3a3a]/80">
          {content.description || `Você tem predominância do estilo ${primaryStyle.category}.`}
        </p>
      </div>
    </div>
    {content.customImage && (
      <img 
        src={content.customImage} 
        alt={`Estilo ${primaryStyle.category}`} 
        className="max-w-full h-auto rounded-lg mx-auto mt-4"
      />
    )}
  </div>
);

export const SecondaryStylesBlock: React.FC<BlockProps> = ({ content }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <h2 className="text-2xl font-playfair text-[#aa6b5d] mb-4">
      {content.title || 'Seus Estilos Secundários'}
    </h2>
    <div className="grid grid-cols-2 gap-4">
      {/* Secondary styles would be populated dynamically */}
      <div className="bg-[#FAF9F7] p-3 rounded-lg">
        <p className="font-medium">Romântico</p>
        <p className="text-sm text-[#3a3a3a]/60">25%</p>
      </div>
      <div className="bg-[#FAF9F7] p-3 rounded-lg">
        <p className="font-medium">Elegante</p>
        <p className="text-sm text-[#3a3a3a]/60">15%</p>
      </div>
    </div>
  </div>
);

export const BenefitsListBlock: React.FC<BlockProps> = ({ content }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <h2 className="text-2xl font-playfair text-[#aa6b5d] mb-4">
      {content.title || 'Benefícios do Guia'}
    </h2>
    <ul className="space-y-3">
      {(content.items || [
        'Entenda seu tipo de corpo e o que valoriza você',
        'Aprenda a criar looks autênticos e poderosos',
        'Descubra as cores que harmonizam com você',
        'Maximize seu guarda-roupa com peças versáteis'
      ]).map((item, index) => (
        <li key={index} className="flex items-start">
          <Check className="w-5 h-5 text-[#aa6b5d] mr-2 flex-shrink-0 mt-0.5" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

export const TestimonialsBlock: React.FC<BlockProps> = ({ content }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <h2 className="text-2xl font-playfair text-[#aa6b5d] mb-4">
      {content.title || 'O que Dizem As Alunas'}
    </h2>
    <div className="grid gap-4">
      {(content.testimonials || [
        {
          name: 'Mariana Silva',
          text: 'O guia de estilo mudou completamente minha relação com as roupas. Agora eu sei exatamente o que combina comigo!',
          style: 'Natural'
        }
      ]).map((testimonial, index) => (
        <div key={index} className="p-4 border border-[#aa6b5d]/20 rounded-lg">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 bg-[#aa6b5d]/20 rounded-full flex items-center justify-center text-[#aa6b5d] mr-3">
              <Heart size={20} />
            </div>
            <div>
              <h3 className="font-medium">{testimonial.name}</h3>
              <p className="text-sm text-[#3a3a3a]/60">Estilo {testimonial.style}</p>
            </div>
          </div>
          <p className="italic text-[#3a3a3a]">"{testimonial.text}"</p>
        </div>
      ))}
    </div>
  </div>
);

export const PricingBlock: React.FC<BlockProps> = ({ content }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-[#aa6b5d]/20">
    <h2 className="text-2xl font-playfair text-[#aa6b5d] mb-4">
      {content.title || 'Guia de Estilo Personalizado'}
    </h2>
    <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-6">
      <div className="text-center md:text-right">
        <p className="text-sm text-[#3a3a3a]/60 mb-1">De</p>
        <p className="text-lg line-through text-[#3a3a3a]/70">
          R$ {content.regularPrice || '175,00'}
        </p>
      </div>
      <div className="text-center">
        <p className="text-sm text-[#aa6b5d] mb-1">Por apenas</p>
        <p className="text-3xl font-bold text-[#aa6b5d]">
          R$ {content.price || '39,00'}
        </p>
      </div>
    </div>
    <Button 
      className="w-full bg-[#aa6b5d] hover:bg-[#8f574a] text-white py-6 rounded-md text-lg transition-colors duration-300"
    >
      {content.ctaText || 'Quero meu Guia + Bônus'}
    </Button>
  </div>
);

export const GuaranteeBlock: React.FC<BlockProps> = ({ content }) => (
  <div className="bg-[#fff7f3] p-6 rounded-lg shadow-sm border border-[#aa6b5d]/20">
    <div className="flex flex-col md:flex-row items-center gap-6">
      <div className="md:w-1/4 flex justify-center">
        <div className="w-24 h-24 rounded-full bg-[#aa6b5d] flex items-center justify-center text-white">
          <div className="text-center">
            <Award className="w-10 h-10 mx-auto" />
            <span className="block font-bold text-xl">{content.days || 7} Dias</span>
          </div>
        </div>
      </div>
      <div className="md:w-3/4">
        <h2 className="text-2xl font-playfair text-[#aa6b5d] mb-4">
          {content.title || 'Garantia de Satisfação'}
        </h2>
        <p className="mb-2">
          {content.text || 'Se você não ficar completamente satisfeita com o seu Guia de Estilo Personalizado, basta solicitar o reembolso em até 7 dias após a compra.'}
        </p>
      </div>
    </div>
  </div>
);

export const CallToActionBlock: React.FC<BlockProps> = ({ content }) => (
  <div className="text-center py-8">
    <h2 className="text-2xl md:text-3xl font-playfair text-[#aa6b5d] mb-4">
      {content.title || 'Transforme seu Estilo Agora!'}
    </h2>
    <p className="mb-6 max-w-2xl mx-auto">
      {content.text || 'Não perca mais tempo com roupas que não combinam com você. Descubra como expressar sua verdadeira essência através do seu estilo pessoal.'}
    </p>
    <Button 
      className="bg-[#aa6b5d] hover:bg-[#8f574a] text-white py-6 px-8 rounded-md text-lg transition-colors duration-300"
    >
      <Star className="w-5 h-5 mr-2" />
      {content.ctaText || 'Quero Transformar Meu Estilo'}
    </Button>
  </div>
);

export const AuthorInfoBlock: React.FC<BlockProps> = ({ content }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <div className="grid md:grid-cols-2 gap-6 items-center">
      {content.imageUrl && (
        <img
          src={content.imageUrl}
          alt={content.name || 'Autora'}
          className="rounded-lg shadow-md w-full"
        />
      )}
      <div>
        <h2 className="text-2xl font-playfair text-[#aa6b5d] mb-4">
          {content.title || 'Sobre a Autora'}
        </h2>
        {content.name && <h3 className="font-medium mb-2">{content.name}</h3>}
        <p className="mb-4">
          {content.bio || 'Com mais de 10 anos de experiência em consultoria de imagem e estilo pessoal, ajudei centenas de mulheres a descobrirem sua verdadeira essência através das roupas.'}
        </p>
      </div>
    </div>
  </div>
);
