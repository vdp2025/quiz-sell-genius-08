
import React from 'react';
import { StyleResult } from '@/types/quiz';
import { ResultPageBlock } from '@/types/resultPageTypes';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import SecondaryStylesSection from '@/components/quiz-result/SecondaryStylesSection';
import { styleConfig } from '@/config/styleConfig';
import { ShoppingCart, ArrowRight } from 'lucide-react';

export const renderBlock = (block: ResultPageBlock, primaryStyle: StyleResult) => {
  const { type, content = {}, style = {} } = block;
  
  // Convert style object to inline style
  const blockStyle = Object.entries(style).reduce((acc, [key, value]) => {
    return { ...acc, [key]: value };
  }, {});
  
  switch (type) {
    case 'headline':
      return (
        <div style={blockStyle} className="space-y-2 text-center">
          {content.title && (
            <h1 className={`text-3xl font-bold ${content.alignment === 'center' ? 'text-center' : content.alignment === 'right' ? 'text-right' : 'text-left'}`}>
              {content.title}
            </h1>
          )}
          {content.subtitle && (
            <p className={`text-lg ${content.alignment === 'center' ? 'text-center' : content.alignment === 'right' ? 'text-right' : 'text-left'}`}>
              {content.subtitle}
            </p>
          )}
        </div>
      );
      
    case 'text':
      return (
        <div style={blockStyle}>
          <p>{content.text}</p>
        </div>
      );
      
    case 'image':
      return (
        <div style={blockStyle}>
          <AspectRatio ratio={16/9}>
            <img
              src={content.imageUrl || 'https://via.placeholder.com/800x450?text=Imagem+de+Exemplo'}
              alt={content.alt || 'Imagem'}
              className="w-full h-full object-cover rounded-md"
              style={{ width: content.width || '100%' }}
            />
          </AspectRatio>
          {content.caption && (
            <p className="text-sm text-center text-muted-foreground mt-2">{content.caption}</p>
          )}
        </div>
      );
      
    case 'primaryStyle':
      return (
        <Card style={blockStyle}>
          <CardContent className="p-6">
            <div className="text-center mb-8">
              <div className="max-w-md mx-auto mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-[#8F7A6A]">Seu estilo predominante</span>
                  <span className="text-[#aa6b5d] font-medium">{primaryStyle.percentage}%</span>
                </div>
                <Progress value={primaryStyle.percentage} className="h-2 bg-[#F3E8E6]" indicatorClassName="bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d]" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <p className="text-[#432818] leading-relaxed">
                  {styleConfig[primaryStyle.category]?.description || 
                   "Descrição do estilo não disponível."}
                </p>
              </div>
              <div className="max-w-[238px] mx-auto">
                <AspectRatio ratio={3/4} className="overflow-hidden rounded-lg shadow-md">
                  <img 
                    src={styleConfig[primaryStyle.category]?.image || 'https://via.placeholder.com/238x317?text=Imagem+do+Estilo'} 
                    alt={`Estilo ${primaryStyle.category}`} 
                    className="w-full h-full object-cover"
                  />
                </AspectRatio>
              </div>
            </div>
          </CardContent>
        </Card>
      );
      
    case 'secondaryStyles':
      return (
        <Card style={blockStyle}>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium text-[#432818] mb-4">Estilos que Também Influenciam Você</h3>
            <SecondaryStylesSection secondaryStyles={[]} /> {/* In real implementation, pass actual secondary styles */}
          </CardContent>
        </Card>
      );
      
    case 'offer':
      return (
        <Card style={blockStyle}>
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">{content.title || "Oferta Especial"}</h2>
              <p className="text-muted-foreground">{content.description || "Descrição da oferta aqui."}</p>
              
              {content.offerImage && (
                <div className="my-6">
                  <img 
                    src={content.offerImage} 
                    alt="Oferta" 
                    className="mx-auto rounded-lg max-h-64 object-contain"
                  />
                </div>
              )}
              
              <div className="my-6">
                <p className="text-sm text-muted-foreground uppercase mb-2">Por apenas</p>
                <p className="text-4xl font-bold text-[#B89B7A]">{content.price || "R$ 97,00"}</p>
              </div>
              
              <Button 
                className="mt-4 py-6 px-8"
                style={{
                  backgroundColor: content.bgColor || "#4CAF50",
                  color: content.textColor || "#ffffff"
                }}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {content.ctaText || "Comprar Agora"}
              </Button>
            </div>
          </CardContent>
        </Card>
      );
      
    case 'cta':
      return (
        <div style={blockStyle} className="text-center py-4">
          <Button 
            className="py-6 px-8"
            style={{
              backgroundColor: content.bgColor || "#4CAF50",
              color: content.textColor || "#ffffff"
            }}
          >
            {content.icon === 'shopping-cart' && <ShoppingCart className="mr-2 h-5 w-5" />}
            {content.icon === 'arrow-right' && <ArrowRight className="mr-2 h-5 w-5" />}
            {content.ctaText || "Clique Aqui"}
          </Button>
        </div>
      );
      
    default:
      return (
        <div style={blockStyle}>
          <div className="p-4 border border-dashed rounded-md text-center">
            <p className="text-muted-foreground">
              Bloco do tipo <strong>{type}</strong> não implementado
            </p>
          </div>
        </div>
      );
  }
};
