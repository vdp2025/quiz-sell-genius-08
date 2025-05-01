
import { v4 as uuidv4 } from 'uuid';

// Helper function to create default content based on block type
export const getDefaultContentForBlockType = (type: string) => {
  switch (type) {
    case 'headline':
      return {
        title: 'Título Principal',
        subtitle: 'Subtítulo opcional aqui',
        alignment: 'center',
        style: {
          backgroundColor: '#FFFFFF',
          textColor: '#432818',
          paddingY: '16',
          paddingX: '16',
          borderRadius: 'medium'
        }
      };
    
    case 'text':
      return {
        text: 'Insira seu texto aqui. Este é um bloco de texto rico onde você pode adicionar conteúdo para sua página.',
        style: {
          backgroundColor: '#F9F5F1',
          textColor: '#432818',
          paddingY: '16',
          paddingX: '16',
          borderRadius: 'medium'
        }
      };
    
    case 'image':
      return {
        imageUrl: '',
        altText: 'Descrição da imagem',
        caption: '',
        alignment: 'center',
        style: {
          backgroundColor: 'transparent',
          paddingY: '16',
          paddingX: '16',
          borderRadius: 'medium'
        }
      };
    
    case 'cta':
      return {
        title: 'Chame à ação agora!',
        buttonText: 'Clique Aqui',
        buttonUrl: '#',
        alignment: 'center',
        style: {
          backgroundColor: '#F9F5F1',
          buttonColor: '#B89B7A',
          textColor: '#432818',
          buttonTextColor: '#FFFFFF',
          paddingY: '24',
          paddingX: '16',
          borderRadius: 'medium'
        }
      };
    
    case 'testimonial':
      return {
        name: 'Nome do Cliente',
        role: 'Posição ou Empresa',
        testimonialText: 'Este é um depoimento de exemplo. Substitua com um depoimento real de um cliente satisfeito.',
        rating: 5,
        avatarUrl: '',
        style: {
          backgroundColor: '#FFFFFF',
          textColor: '#432818',
          accentColor: '#B89B7A',
          paddingY: '16',
          paddingX: '16',
          borderRadius: 'medium'
        }
      };
    
    case 'divider':
      return {
        style: {
          color: '#B89B7A',
          width: '80%',
          thickness: '1',
          style: 'solid'
        }
      };
    
    default:
      return {};
  }
};

// Add this alias for backward compatibility
export const getDefaultContentForType = getDefaultContentForBlockType;
// For backward compatibility, also export with the name used in imports
export const createBlockContentByType = getDefaultContentForBlockType;

// Function to create a new block with default content
export const createNewBlock = (type: string, order: number = 0) => {
  return {
    id: uuidv4(),
    type,
    content: getDefaultContentForBlockType(type),
    order
  };
};
