
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Image, Upload, X } from 'lucide-react';
import { StyleCategory } from '@/types/quizBuilder';
import { getFallbackImage } from '@/utils/imageUtils';

interface ImageUploaderProps {
  imageUrl?: string;
  onImageUpload: (url: string) => void;
  onImageRemove: () => void;
  styleCategory?: StyleCategory;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  imageUrl,
  onImageUpload,
  onImageRemove,
  styleCategory = 'Natural'
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = event.target.files?.[0];
    
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      setError('O arquivo selecionado não é uma imagem.');
      return;
    }
    
    // Maximum file size: 5MB
    if (file.size > 5 * 1024 * 1024) {
      setError('A imagem deve ter no máximo 5MB.');
      return;
    }
    
    setIsUploading(true);
    
    // In a real implementation, we would upload to Cloudinary or another service
    // For now, just create a local URL or use a fallback
    try {
      const url = URL.createObjectURL(file);
      onImageUpload(url);
      setIsUploading(false);
    } catch (err) {
      console.error('Error creating object URL:', err);
      // Provide a fallback image based on style category
      const fallbackUrl = getFallbackImage(styleCategory);
      onImageUpload(fallbackUrl);
      setIsUploading(false);
      setError('Erro ao processar imagem. Usando imagem padrão.');
    }
  };

  const handleUseFallbackImage = () => {
    const fallbackUrl = getFallbackImage(styleCategory);
    onImageUpload(fallbackUrl);
  };

  return (
    <div className="space-y-4">
      {imageUrl ? (
        <div className="relative">
          <img
            src={imageUrl}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg"
            onError={() => {
              // If image fails to load, use fallback
              handleUseFallbackImage();
            }}
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={onImageRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-[#B89B7A]/30 rounded-lg p-8 text-center">
          {isUploading ? (
            <div className="flex flex-col items-center gap-2">
              <div className="animate-spin h-8 w-8 border-4 border-[#B89B7A]/30 border-t-[#B89B7A] rounded-full"></div>
              <span className="text-sm text-[#8F7A6A]">Processando...</span>
            </div>
          ) : (
            <>
              <label className="cursor-pointer">
                <div className="flex flex-col items-center gap-2">
                  <Image className="h-8 w-8 text-[#B89B7A]" />
                  <span className="text-sm text-[#8F7A6A]">
                    Clique para fazer upload
                  </span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
              
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleUseFallbackImage}
                  className="text-xs"
                >
                  Usar imagem padrão
                </Button>
              </div>
            </>
          )}
          
          {error && (
            <p className="mt-4 text-sm text-red-500">{error}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
