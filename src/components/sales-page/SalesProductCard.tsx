
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Check, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export type ProductCardInfo = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  originalPrice?: number;
  isInstallments?: boolean;
  installmentsCount?: number;
  isBestSeller?: boolean;
};

interface SalesProductCardProps {
  product: ProductCardInfo;
  onAddToCart: (productId: string) => void;
  isSelected?: boolean;
}

export function SalesProductCard({ product, onAddToCart, isSelected = false }: SalesProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(product.price);
  
  const formattedOriginalPrice = product.originalPrice
    ? new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(product.originalPrice)
    : null;
  
  const installmentsText = product.isInstallments && product.installmentsCount
    ? `em ${product.installmentsCount}x de ${new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(product.price / product.installmentsCount)}`
    : '';
  
  return (
    <Card
      className={`overflow-hidden transition-all duration-300 ${
        isSelected ? 'ring-2 ring-[#B89B7A] scale-105' : ''
      } ${isHovered ? 'shadow-lg' : 'shadow-md'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {product.isBestSeller && (
          <div className="absolute top-2 right-2 z-10 bg-[#B89B7A] text-white text-xs px-2 py-1 rounded-full">
            Mais Vendido
          </div>
        )}
        <AspectRatio ratio={16 / 9}>
          <img
            src={product.imageUrl}
            alt={product.title}
            className="object-cover w-full h-full"
            style={{ transition: 'transform 0.3s ease' }}
          />
        </AspectRatio>
      </div>
      
      <div className="p-4 space-y-3">
        <h3 className="text-lg font-semibold line-clamp-2 text-[#432818]">{product.title}</h3>
        <p className="text-sm text-[#8F7A6A] line-clamp-2">{product.description}</p>
        
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-xl text-[#432818]">{formattedPrice}</span>
            {formattedOriginalPrice && (
              <span className="text-sm text-[#8F7A6A] line-through">{formattedOriginalPrice}</span>
            )}
          </div>
          {installmentsText && (
            <p className="text-xs text-[#8F7A6A]">{installmentsText}</p>
          )}
        </div>
        
        <Button 
          className="w-full bg-[#B89B7A] hover:bg-[#8F7A6A] mt-2" 
          onClick={() => onAddToCart(product.id)}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {isSelected ? (
            <span className="flex items-center"><Check className="w-4 h-4 mr-1" /> Adicionado</span>
          ) : (
            'Adicionar ao Carrinho'
          )}
        </Button>
      </div>
    </Card>
  );
}
