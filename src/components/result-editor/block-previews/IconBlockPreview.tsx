
import React from 'react';

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
    icon = '✓', 
    size = '48px', 
    color = '#B89B7A', 
    title, 
    position = 'right', 
    style = {} 
  } = content;
  
  const iconStyle = {
    fontSize: size,
    color: color,
    display: 'inline-block'
  };
  
  const renderIcon = () => (
    <span style={iconStyle}>{icon}</span>
  );
  
  const renderTitle = () => (
    title ? <span className="text-[#432818]">{title}</span> : null
  );
  
  const renderContent = () => {
    switch (position) {
      case 'top':
        return (
          <div className="flex flex-col items-center gap-2">
            {renderTitle()}
            {renderIcon()}
          </div>
        );
      case 'right':
        return (
          <div className="flex items-center gap-2">
            {renderIcon()}
            {renderTitle()}
          </div>
        );
      case 'bottom':
        return (
          <div className="flex flex-col items-center gap-2">
            {renderIcon()}
            {renderTitle()}
          </div>
        );
      case 'left':
        return (
          <div className="flex items-center gap-2">
            {renderTitle()}
            {renderIcon()}
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-2">
            {renderIcon()}
            {renderTitle()}
          </div>
        );
    }
  };
  
  return (
    <div style={style} className="p-4">
      {renderContent()}
    </div>
  );
};

export default IconBlockPreview;
