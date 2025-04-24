
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Image, Upload, Trash2 } from 'lucide-react';

interface ImageUploadFieldProps {
  label: string;
  imageUrl?: string;
  onImageChange: (url: string) => void;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  imageUrl,
  onImageChange
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  const handleSelectImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  // In a real implementation, this would upload to a server or cloud storage
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // For this demo, we'll just use a placeholder value
      onImageChange('/placeholder-image.jpg');
      
      // In a real app, you would upload the file and get a URL back
      /* const formData = new FormData();
      formData.append('file', file);
      
      fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        onImageChange(data.url);
      }); */
    }
  };
  
  return (
    <div className="space-y-2">
      <Label className="text-white">{label}</Label>
      
      {imageUrl ? (
        <div className="space-y-2">
          <div className="relative rounded-md overflow-hidden border border-[#333333]">
            <img 
              src={imageUrl} 
              alt="Preview" 
              className="w-full h-auto max-h-[200px] object-cover"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8 rounded-full"
              onClick={() => onImageChange('')}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex gap-2">
            <Input 
              value={imageUrl} 
              onChange={(e) => onImageChange(e.target.value)}
              placeholder="URL da imagem"
              className="flex-1 bg-[#262939] border-[#333333] text-white"
            />
            <Button
              variant="secondary"
              onClick={handleSelectImage}
              className="bg-[#262939] hover:bg-[#333333] text-white"
            >
              <Upload className="h-4 w-4 mr-2" />
              Trocar
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <div 
            className="h-[150px] bg-[#262939] border border-dashed border-[#333333] rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-[#1d212e]"
            onClick={handleSelectImage}
          >
            <Image className="h-10 w-10 text-gray-400 mb-2" />
            <p className="text-gray-400">Clique para selecionar uma imagem</p>
            <p className="text-xs text-gray-500 mt-1">Ou cole uma URL abaixo</p>
          </div>
          <Input
            value=""
            onChange={(e) => onImageChange(e.target.value)}
            placeholder="Cole a URL da imagem aqui"
            className="mt-2 bg-[#262939] border-[#333333] text-white"
          />
        </div>
      )}
      
      <Input 
        type="file" 
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ImageUploadField;
