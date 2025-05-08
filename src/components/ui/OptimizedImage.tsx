import React, { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  onLoad?: () => void;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

/**
 * Componente de imagem otimizado que implementa:
 * - Lazy loading
 * - Carregamento prioritário opcional
 * - Fallback para imagens que falham
 * - Estado de carregamento com placeholder
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  onLoad,
  objectFit = 'cover'
}: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    // Reset states when src changes
    setLoaded(false);
    setError(false);
    if (priority) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setLoaded(true);
        onLoad?.();
      };
      img.onerror = () => setError(true);
    }
  }, [src, priority, onLoad]);
  return <div style={{
    width,
    height
  }} className="rounded-sm">
      {!loaded && !error && !priority && <div className="absolute inset-0 bg-gray-100 animate-pulse rounded" />}
      
      <img src={src} alt={alt} width={width} height={height} loading={priority ? "eager" : "lazy"} onLoad={() => {
      setLoaded(true);
      onLoad?.();
    }} onError={() => setError(true)} className="object-scale-down" />
      
      {error && <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded">
          <span className="text-sm text-gray-500">Imagem não disponível</span>
        </div>}
    </div>;
}