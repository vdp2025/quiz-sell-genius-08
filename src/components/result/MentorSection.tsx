
import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';

interface MentorSectionProps {
  isEditable?: boolean;
  onUpdate?: (content: any) => void;
  content?: {
    title?: string;
    name?: string;
    bio?: string[];
    image?: string;
    stylesImage?: string;
    beforeAfterImage?: string;
  };
}

const MentorSection: React.FC<MentorSectionProps> = ({ 
  isEditable = false,
  onUpdate,
  content = {} 
}) => {
  const handleUpdate = (field: string, value: any) => {
    if (onUpdate) {
      onUpdate({
        ...content,
        [field]: value
      });
    }
  };

  const handleBioItemChange = (index: number, value: string) => {
    const currentBio = content.bio || [
      "Consultora de imagem há mais de 10 anos",
      "Especialista em estilo pessoal e autoconhecimento",
      "Já ajudou mais de 1.000 pessoas a transformarem seu visual"
    ];
    
    const newBio = [...currentBio];
    newBio[index] = value;
    
    handleUpdate('bio', newBio);
  };

  const addBioItem = () => {
    const currentBio = content.bio || [
      "Consultora de imagem há mais de 10 anos",
      "Especialista em estilo pessoal e autoconhecimento",
      "Já ajudou mais de 1.000 pessoas a transformarem seu visual"
    ];
    handleUpdate('bio', [...currentBio, "Novo item"]);
  };

  const removeBioItem = (index: number) => {
    const currentBio = content.bio || [
      "Consultora de imagem há mais de 10 anos",
      "Especialista em estilo pessoal e autoconhecimento",
      "Já ajudou mais de 1.000 pessoas a transformarem seu visual"
    ];
    
    const newBio = [...currentBio];
    newBio.splice(index, 1);
    
    handleUpdate('bio', newBio);
  };

  return (
    <Card className="bg-white p-6 rounded-lg mb-10 border border-[#B89B7A]/20">
      <div className="text-center mb-6">
        {isEditable ? (
          <Input 
            value={content.title || "Conheça a Consultora de Imagem"}
            onChange={(e) => handleUpdate('title', e.target.value)}
            className="text-center text-2xl font-playfair text-[#aa6b5d] mb-2"
          />
        ) : (
          <h2 className="text-2xl font-playfair text-[#aa6b5d] mb-2">
            {content.title || "Conheça a Consultora de Imagem"}
          </h2>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          {isEditable ? (
            <div className="flex flex-col space-y-2">
              <label className="text-sm text-[#8F7A6A]">URL da Imagem:</label>
              <Input 
                value={content.image || "https://res.cloudinary.com/dqljyf76t/image/upload/v1744921536/Sem_nome_1080_x_1000_px_z0chuv.webp"} 
                onChange={(e) => handleUpdate('image', e.target.value)}
                placeholder="URL da imagem"
              />
              <div className="mt-2">
                <img 
                  src={content.image || "https://res.cloudinary.com/dqljyf76t/image/upload/v1744921536/Sem_nome_1080_x_1000_px_z0chuv.webp"} 
                  alt="Mentora" 
                  className="rounded-md max-h-60 mx-auto object-contain"
                />
              </div>
            </div>
          ) : (
            <img 
              src={content.image || "https://res.cloudinary.com/dqljyf76t/image/upload/v1744921536/Sem_nome_1080_x_1000_px_z0chuv.webp"} 
              alt="Mentora" 
              className="rounded-md w-full h-auto shadow-md"
            />
          )}
        </div>
        <div className="space-y-4">
          {isEditable ? (
            <Input 
              value={content.name || "Gisele Galvão"} 
              onChange={(e) => handleUpdate('name', e.target.value)}
              className="text-2xl font-medium text-[#432818] mb-4"
            />
          ) : (
            <h3 className="text-2xl font-medium text-[#432818] mb-4">
              {content.name || "Gisele Galvão"}
            </h3>
          )}

          <ul className="space-y-3">
            {(content.bio || [
              "Consultora de imagem há mais de 10 anos",
              "Especialista em estilo pessoal e autoconhecimento",
              "Já ajudou mais de 1.000 pessoas a transformarem seu visual"
            ]).map((item, index) => (
              <li key={index} className="flex items-center">
                {isEditable ? (
                  <div className="flex items-center gap-2 w-full">
                    <Input 
                      value={item}
                      onChange={(e) => handleBioItemChange(index, e.target.value)}
                      className="flex-grow"
                    />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeBioItem(index)}
                      className="text-destructive"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex-grow text-[#432818] ml-2">• {item}</div>
                )}
              </li>
            ))}
          </ul>
          
          {isEditable && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={addBioItem} 
              className="mt-2"
            >
              <Plus className="h-4 w-4 mr-2" /> 
              Adicionar item
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default MentorSection;
