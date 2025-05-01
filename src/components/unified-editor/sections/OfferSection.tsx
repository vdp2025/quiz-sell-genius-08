import React, { useState } from 'react';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Button } from '../../ui/button';
import { ImageUploader } from '../../ui/image-uploader';

interface OfferData {
  title: string;
  description: string;
  imageUrl: string;
  buttonText: string;
  price: string;
  discountPrice: string;
}

interface OfferSectionProps {
  data?: OfferData;
  onChange?: (data: OfferData) => void;
}

const OfferSection: React.FC<OfferSectionProps> = ({ data, onChange }) => {
  const [offerData, setOfferData] = useState<OfferData>(data || {
    title: 'Título da Oferta',
    description: 'Descrição da oferta aqui...',
    imageUrl: '',
    buttonText: 'Comprar Agora',
    price: 'R$ 197,00',
    discountPrice: 'R$ 97,00'
  });

  const handleChange = (field: keyof OfferData, value: string) => {
    const newData = { ...offerData, [field]: value };
    setOfferData(newData);
    onChange?.(newData);
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold text-[#432818] mb-4">Editor de Oferta</h3>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-[#432818]">Título da Oferta</label>
            <Input
              value={offerData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-[#432818]">Descrição</label>
            <Textarea
              value={offerData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="mt-1"
              rows={4}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-[#432818]">Imagem do Produto</label>
            <ImageUploader
              currentImage={offerData.imageUrl}
              onImageUpload={(url) => handleChange('imageUrl', url)}
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-[#432818]">Texto do Botão</label>
            <Input
              value={offerData.buttonText}
              onChange={(e) => handleChange('buttonText', e.target.value)}
              className="mt-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-[#432818]">Preço Original</label>
              <Input
                value={offerData.price}
                onChange={(e) => handleChange('price', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[#432818]">Preço com Desconto</label>
              <Input
                value={offerData.discountPrice}
                onChange={(e) => handleChange('discountPrice', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#FAF9F7] p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-[#432818] mb-4">Pré-visualização</h3>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-[#432818]">{offerData.title}</h2>
          <p className="mt-2 text-[#8F7A6A]">{offerData.description}</p>
          
          {offerData.imageUrl && (
            <img 
              src={offerData.imageUrl} 
              alt="Produto" 
              className="mt-4 w-full h-48 object-cover rounded"
            />
          )}

          <div className="mt-4 flex items-center justify-between">
            <div>
              <span className="line-through text-[#8F7A6A]">{offerData.price}</span>
              <span className="ml-2 text-2xl font-bold text-[#432818]">{offerData.discountPrice}</span>
            </div>
            <Button className="bg-[#B89B7A] hover:bg-[#A38A69] text-white">
              {offerData.buttonText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferSection;