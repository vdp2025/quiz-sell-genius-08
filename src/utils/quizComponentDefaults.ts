
import { QuizComponentType, QuizComponentData } from '@/types/quizBuilder';

export const getDefaultData = (type: QuizComponentType): any => {
  switch (type) {
    case 'header':
      return { title: 'Título do Quiz', subtitle: 'Responda às perguntas e descubra seu resultado' };
    case 'headline':
      return { title: 'Título da Seção', subtitle: 'Subtítulo opcional' };
    case 'text':
      return { text: 'Insira seu texto aqui...' };
    case 'image':
      return { imageUrl: '', alt: 'Descrição da imagem' };
    case 'multipleChoice':
      return { 
        question: 'Sua pergunta aqui?', 
        options: ['Opção 1', 'Opção 2', 'Opção 3'],
        required: true,
        multiSelect: 3,
        maxSelections: 3,
        minSelections: 3,
        autoAdvance: true,
        displayType: 'text',
        imageSize: 'medium',
        layout: {
          columns: 2,
          direction: 'vertical'
        }
      };
    case 'singleChoice':
      return { 
        question: 'Sua pergunta aqui?', 
        options: ['Opção 1', 'Opção 2', 'Opção 3'],
        required: true
      };
    case 'scale':
      return { 
        question: 'Em uma escala de 1 a 5, como você avalia...?', 
        min: 1, 
        max: 5, 
        minLabel: 'Discordo Totalmente', 
        maxLabel: 'Concordo Totalmente',
        required: true
      };
    case 'stageCover':
      return {
        title: 'Descubra Seu Estilo Pessoal',
        subtitle: 'Responda às perguntas e descubra qual estilo combina mais com você',
        backgroundImage: '',
        logoImage: ''
      };
    case 'stageQuestion':
      return {
        question: 'Sua pergunta aqui?',
        description: 'Descrição ou instrução opcional',
        options: [
          { text: 'Opção 1', imageUrl: '', styleCategory: 'Natural' },
          { text: 'Opção 2', imageUrl: '', styleCategory: 'Clássico' },
          { text: 'Opção 3', imageUrl: '', styleCategory: 'Contemporâneo' }
        ],
        multiSelect: 3,
        required: true,
        layout: 'grid'
      };
    case 'stageResult':
      return {
        title: 'Seu Resultado',
        description: 'Descrição do resultado',
        showPrimaryStyle: true,
        showSecondaryStyles: true,
        showOfferSection: true
      };
    default:
      return {};
  }
};
