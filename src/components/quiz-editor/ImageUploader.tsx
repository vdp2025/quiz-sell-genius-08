
import React from 'react';
import { Button } from '@/components/ui/button';
import { Image, Upload, X } from 'lucide-react';

interface ImageUploaderProps {
  imageUrl?: string;
  onImageUpload: (url: string) => void;
  onImageRemove: () => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  imageUrl,
  onImageUpload,
  onImageRemove
}) => {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // For now, just create a local URL. In production, this would upload to Supabase storage
      const url = URL.createObjectURL(file);
      onImageUpload(url);
    }
  };

  return (
    <div className="space-y-4">
      {imageUrl ? (
        <div className="relative">
          <img
            src={imageUrl}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg"
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
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
