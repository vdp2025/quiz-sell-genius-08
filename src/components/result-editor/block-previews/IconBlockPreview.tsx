
import React from 'react';
import { cn } from '@/lib/utils';
import { dynamicIconImport } from '@/utils/dynamicIconImport';

interface IconBlockPreviewProps {
  content: {
    icon?: string;
    size?: string;
    color?: string;
    title?: string;
    position?: 'top' | 'right' | 'bottom' | 'left';
    style?: any;
  };
}

const IconBlockPreview: React.FC<IconBlockPreviewProps> = ({ content }) => {
  const { 
    icon = 'star', 
    size = '32px', 
    color = '#B89B7A',
    title = '',
    position = 'top',
    style = {} 
  } = content;

  // Dynamic icon import
  const IconComponent = dynamicIconImport(icon);
  
  const containerStyle = {
    ...style,
    display: 'flex',
    flexDirection: position === 'right' ? 'row-reverse' : 
                 position === 'bottom' ? 'column-reverse' : 
                 position === 'left' ? 'row' : 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem'
  };
  
  return (
    <div className="w-full" style={containerStyle}>
      {IconComponent && (
        <div className="flex items-center justify-center">
          <IconComponent 
            style={{ color, width: size, height: size }} 
            strokeWidth={1.5}
          />
        </div>
      )}
      
      {title && (
        <div className={cn(
          "text-center",
          (position === 'left' || position === 'right') && "flex-1"
        )}>
          {title}
        </div>
      )}
    </div>
  );
};

export default IconBlockPreview;
