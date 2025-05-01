import React from 'react';
import { cn } from '@/lib/utils';
import { QuizComponentData } from '@/types/quizBuilder';
import { StyleResult } from '@/types/quiz';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ComponentRendererProps {
  component: QuizComponentData;
  primaryStyle?: StyleResult;
  secondaryStyles?: StyleResult[];
  onSelect?: (componentId: string) => void;
  isPreviewing?: boolean;
}

export const ComponentRenderer: React.FC<ComponentRendererProps> = ({
  component,
  primaryStyle,
  secondaryStyles,
  onSelect,
  isPreviewing
}) => {
  const { type, data, id } = component;
  
  const handleClick = () => {
    if (onSelect && !isPreviewing) {
      onSelect(id);
    }
  };

  const renderStageCover = () => {
    const { 
      title, 
      subtitle, 
      buttonText, 
      backgroundColor, 
      textColor,
      paddingY,
      paddingX
    } = data;
    
    const coverStyles = {
      backgroundColor: backgroundColor || '#FAF9F7',
      color: textColor || '#432818',
      paddingTop: paddingY ? `${paddingY}px` : '32px',
      paddingBottom: paddingY ? `${paddingY}px` : '32px',
      paddingLeft: paddingX ? `${paddingX}px` : '16px',
      paddingRight: paddingX ? `${paddingX}px` : '16px',
      textAlign: 'center' as React.CSSProperties['textAlign']
    };

    return (
      <div 
        className={cn(
          "flex flex-col items-center justify-center rounded-md",
          !isPreviewing && "border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50"
        )}
        style={coverStyles}
        onClick={handleClick}
      >
        <h1 className="text-3xl font-playfair font-bold">{title}</h1>
        <p className="text-lg mt-2">{subtitle}</p>
        <Button className="mt-6 bg-[#B89B7A] hover:bg-[#A38A69] text-white">
          {buttonText || 'Começar'}
        </Button>
      </div>
    );
  };

  const renderStageQuestion = () => {
    const { 
      question, 
      options, 
      optionImages,
      optionStyleCategories,
      optionScores,
      displayType, 
      multiSelect, 
      required,
      autoAdvance,
      layout,
      selectionIndicator,
      backgroundColor,
      textColor,
      paddingY,
      paddingX
    } = data;
    
    const questionStyles = {
      backgroundColor: backgroundColor || '#FAF9F7',
      color: textColor || '#432818',
      paddingTop: paddingY ? `${paddingY}px` : '24px',
      paddingBottom: paddingY ? `${paddingY}px` : '24px',
      paddingLeft: paddingX ? `${paddingX}px` : '16px',
      paddingRight: paddingX ? `${paddingX}px` : '16px'
    };
    
    const columns = layout?.columns || 1;
    const direction = layout?.direction || 'vertical';
    
    const gridTemplateColumns = columns === 1
      ? '1fr'
      : `repeat(${columns}, minmax(0, 1fr))`;
    
    const isMultiSelect = multiSelect === 1;
    
    const handleOptionSelect = (option: string) => {
      console.log(`Opção selecionada: ${option}`);
    };

    return (
      <div 
        className={cn(
          "rounded-md",
          !isPreviewing && "border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50"
        )}
        style={questionStyles}
        onClick={handleClick}
      >
        <h2 className="text-2xl font-semibold mb-4">{question}</h2>
        
        {isMultiSelect ? (
          <div className="space-y-2">
            {options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox
                  id={`option-${index}`}
                  onCheckedChange={() => handleOptionSelect(option)}
                />
                <label
                  htmlFor={`option-${index}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        ) : (
          <RadioGroup>
            <div 
              className="flex flex-wrap gap-4"
              style={{
                display: 'grid',
                gridTemplateColumns: gridTemplateColumns,
                flexDirection: direction === 'horizontal' ? 'row' : 'column'
              }}
            >
              {options.map((option, index) => (
                <div key={index} className="flex items-center">
                  <RadioGroupItem value={option} id={`option-${index}`} className="peer sr-only" />
                  <Label
                    htmlFor={`option-${index}`}
                    className={cn(
                      "cursor-pointer rounded-md border-2 border-muted p-4 text-sm font-medium shadow-sm data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground",
                      "peer-data-[state=checked]:border-primary",
                      selectionIndicator === 'background' && "hover:bg-accent",
                      selectionIndicator === 'border' && "hover:border-primary"
                    )}
                  >
                    {displayType === 'image' && optionImages && optionImages[index] && (
                      <img src={optionImages[index]} alt={option} className="w-24 h-24 object-cover rounded-md mb-2" />
                    )}
                    {displayType === 'both' && optionImages && optionImages[index] && (
                      <img src={optionImages[index]} alt={option} className="w-24 h-24 object-cover rounded-md mb-2" />
                    )}
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        )}
        
        <div className="mt-4">
          <p className="text-sm text-muted-foreground">
            {required ? 'Obrigatório' : 'Opcional'}
          </p>
          {autoAdvance && (
            <Badge variant="secondary">Avanço automático</Badge>
          )}
        </div>
      </div>
    );
  };

  const renderStageResult = () => {
    const { 
      title, 
      primaryStyleTitle, 
      secondaryStylesTitle, 
      showPercentages, 
      showDescriptions, 
      callToActionText, 
      accentColor,
      backgroundColor,
      textColor,
      paddingY,
      paddingX
    } = data;
    
    const resultStyles = {
      backgroundColor: backgroundColor || '#FAF9F7',
      color: textColor || '#432818',
      paddingTop: paddingY ? `${paddingY}px` : '32px',
      paddingBottom: paddingY ? `${paddingY}px` : '32px',
      paddingLeft: paddingX ? `${paddingX}px` : '16px',
      paddingRight: paddingX ? `${paddingX}px` : '16px',
      textAlign: 'center' as React.CSSProperties['textAlign']
    };

    return (
      <div 
        className={cn(
          "rounded-md",
          !isPreviewing && "border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50"
        )}
        style={resultStyles}
        onClick={handleClick}
      >
        <h2 className="text-3xl font-playfair font-bold">{title}</h2>
        
        {primaryStyle && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold">{primaryStyleTitle}</h3>
            <Card className="mt-2">
              <CardContent className="py-4">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-sm font-semibold">{primaryStyle.category}</h4>
                    {showPercentages && (
                      <p className="text-sm text-muted-foreground">
                        {primaryStyle.percentage}%
                      </p>
                    )}
                  </div>
                </div>
                {showDescriptions && (
                  <p className="text-sm mt-2">
                    Descrição do estilo {primaryStyle.category}.
                  </p>
                )}
                <Progress value={primaryStyle.percentage} className="mt-2" />
              </CardContent>
            </Card>
          </div>
        )}
        
        {secondaryStyles && secondaryStyles.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold">{secondaryStylesTitle}</h3>
            <div className="mt-2 space-y-2">
              {secondaryStyles.map((style, index) => (
                <Card key={index}>
                  <CardContent className="py-4">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="text-sm font-semibold">{style.category}</h4>
                        {showPercentages && (
                          <p className="text-sm text-muted-foreground">
                            {style.percentage}%
                          </p>
                        )}
                      </div>
                    </div>
                    {showDescriptions && (
                      <p className="text-sm mt-2">
                        Descrição do estilo {style.category}.
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        <Button 
          className="mt-8 bg-[#B89B7A] hover:bg-[#A38A69] text-white"
          style={{ backgroundColor: accentColor }}
        >
          {callToActionText || 'Ver Recomendações'}
        </Button>
      </div>
    );
  };
  
  const renderHeadline = () => {
    const { title, subtitle, style } = data;
    
    const headlineStyles = {
      backgroundColor: style?.backgroundColor || '#FAF9F7',
      color: style?.textColor || '#432818',
      paddingTop: style?.paddingY ? `${style.paddingY}px` : '24px',
      paddingBottom: style?.paddingY ? `${style.paddingY}px` : '24px',
      paddingLeft: style?.paddingX ? `${style.paddingX}px` : '16px',
      paddingRight: style?.paddingX ? `${style.paddingX}px` : '16px',
      textAlign: 'center' as React.CSSProperties['textAlign']
    };
    
    return (
      <div 
        className={cn(
          "rounded-md",
          !isPreviewing && "border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50"
        )}
        style={headlineStyles}
        onClick={handleClick}
      >
        <h1 className="text-3xl font-playfair font-bold">{title}</h1>
        <p className="text-lg mt-2">{subtitle}</p>
      </div>
    );
  };
  
  const renderText = () => {
    const { text, style } = data;
    
    const textStyles = {
      backgroundColor: style?.backgroundColor || '#FAF9F7',
      color: style?.textColor || '#432818',
      paddingTop: style?.paddingY ? `${style.paddingY}px` : '16px',
      paddingBottom: style?.paddingY ? `${style.paddingY}px` : '16px',
      paddingLeft: style?.paddingX ? `${style.paddingX}px` : '16px',
      paddingRight: style?.paddingX ? `${style.paddingX}px` : '16px'
    };
    
    return (
      <div 
        className={cn(
          "rounded-md",
          !isPreviewing && "border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50"
        )}
        style={textStyles}
        onClick={handleClick}
      >
        <p className="text-md">{text}</p>
      </div>
    );
  };
  
  const renderImage = () => {
    const { imageUrl, altText, style, size } = data;
    
    const imageStyles = {
      paddingTop: style?.paddingY ? `${style.paddingY}px` : '0',
      paddingBottom: style?.paddingY ? `${style.paddingY}px` : '0',
      paddingLeft: style?.paddingX ? `${style.paddingX}px` : '0',
      paddingRight: style?.paddingX ? `${style.paddingX}px` : '0',
      maxWidth: size === 'medium' ? '50%' : '100%',
      maxHeight: size === 'medium' ? '300px' : 'none',
      width: 'auto',
      height: 'auto'
    };
    
    return (
      <div 
        className={cn(
          "rounded-md flex justify-center",
          !isPreviewing && "border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50"
        )}
        style={{
          backgroundColor: style?.backgroundColor || '#FAF9F7',
          padding: '16px'
        }}
        onClick={handleClick}
      >
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={altText || 'Imagem'} 
            style={imageStyles}
          />
        ) : (
          <p className="text-muted-foreground">Sem imagem</p>
        )}
      </div>
    );
  };
  
  const renderVideo = () => {
    const { videoUrl, style } = data;
    
    const videoStyles = {
      paddingTop: style?.paddingY ? `${style.paddingY}px` : '0',
      paddingBottom: style?.paddingY ? `${style.paddingY}px` : '0',
      paddingLeft: style?.paddingX ? `${style.paddingX}px` : '0',
      paddingRight: style?.paddingX ? `${style.paddingX}px` : '0'
    };
    
    return (
      <div 
        className={cn(
          "rounded-md",
          !isPreviewing && "border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50"
        )}
        style={{
          backgroundColor: style?.backgroundColor || '#FAF9F7',
          padding: '16px'
        }}
        onClick={handleClick}
      >
        {videoUrl ? (
          <video controls style={videoStyles} className="w-full">
            <source src={videoUrl} type="video/mp4" />
            Seu navegador não suporta vídeos.
          </video>
        ) : (
          <p className="text-muted-foreground">Sem vídeo</p>
        )}
      </div>
    );
  };
  
  const renderForm = () => {
    const { fields, submitButtonText, style } = data;
    
    const formStyles = {
      backgroundColor: style?.backgroundColor || '#FAF9F7',
      color: style?.textColor || '#432818',
      paddingTop: style?.paddingY ? `${style.paddingY}px` : '16px',
      paddingBottom: style?.paddingY ? `${style.paddingY}px` : '16px',
      paddingLeft: style?.paddingX ? `${style.paddingX}px` : '16px',
      paddingRight: style?.paddingX ? `${style.paddingX}px` : '16px'
    };
    
    return (
      <div 
        className={cn(
          "rounded-md",
          !isPreviewing && "border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50"
        )}
        style={formStyles}
        onClick={handleClick}
      >
        <form className="space-y-4">
          {fields && fields.map((field, index) => (
            <div key={index} className="space-y-2">
              <Label htmlFor={`field-${index}`}>{field.label}</Label>
              <Input type={field.type} id={`field-${index}`} placeholder={field.placeholder} />
            </div>
          ))}
          <Button type="submit">{submitButtonText || 'Enviar'}</Button>
        </form>
      </div>
    );
  };
  
  const renderSeparator = () => {
    const { style } = data;
    
    const separatorStyles = {
      backgroundColor: style?.backgroundColor || '#B89B7A',
      height: style?.height || '1px',
      width: style?.width || '100%'
    };
    
    return (
      <div 
        className={cn(
          "rounded-md",
          !isPreviewing && "border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50"
        )}
        style={{
          backgroundColor: style?.backgroundColor || '#FAF9F7',
          padding: '16px'
        }}
        onClick={handleClick}
      >
        <Separator style={separatorStyles} />
      </div>
    );
  };

  switch (type) {
    case 'stageCover':
      return renderStageCover();
    case 'stageQuestion':
      return renderStageQuestion();
    case 'stageResult':
      return renderStageResult();
    case 'headline':
      return renderHeadline();
    case 'text':
      return renderText();
    case 'image':
      return renderImage();
    case 'video':
      return renderVideo();
    case 'form':
      return renderForm();
    case 'separator':
      return renderSeparator();
    default:
      return <p>Componente desconhecido: {type}</p>;
  }
};
