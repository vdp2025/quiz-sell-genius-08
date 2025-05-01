import { QuizComponentData, QuizComponentType } from "@/types/quizBuilder";
import { generateId } from "./idGenerator";

export const getDefaultComponentData = (type: QuizComponentType, stageId: string): QuizComponentData => {
  switch(type) {
    case 'header':
      return {
        id: generateId(),
        type: 'header',
        data: {
          stageTitle: 'Título Principal',
          subtitle: 'Subtítulo'
        },
        order: 0,
        stageId
      };
    
    case 'headline':
      return {
        id: generateId(),
        type: 'headline',
        data: {
          title: 'Título da Seção'
        },
        order: 0,
        stageId
      };
    
    case 'text':
      return {
        id: generateId(),
        type: 'text',
        data: {
          text: 'Texto do parágrafo que será exibido aqui. Edite este texto nas propriedades.'
        },
        order: 0,
        stageId
      };
    
    case 'image':
      return {
        id: generateId(),
        type: 'image',
        data: {
          imageUrl: '',
          alt: 'Quiz image',
          caption: ''
        },
        order: 0,
        stageId
      };

    case 'singleChoice':
      return {
        id: generateId(),
        type: 'singleChoice',
        data: {
          question: 'Escolha uma opção',
          options: [
            { id: generateId(), label: 'Opção 1', isCorrect: false },
            { id: generateId(), label: 'Opção 2', isCorrect: false }
          ],
          displayType: 'text',
          multiSelect: 1,
          layout: { columns: 2, direction: 'vertical' },
          imageSize: 'medium',
          selectionIndicator: 'border'
        },
        order: 0,
        stageId
      };
    
    case 'multipleChoice':
      return {
        id: generateId(),
        type: 'multipleChoice',
        data: {
          question: 'Escolha as opções corretas',
          options: [
            { id: generateId(), label: 'Opção 1', isCorrect: false },
            { id: generateId(), label: 'Opção 2', isCorrect: false }
          ],
          displayType: 'text',
          multiSelect: 3,
          layout: { columns: 2, direction: 'vertical' },
          imageSize: 'medium',
          selectionIndicator: 'border'
        },
        order: 0,
        stageId
      };

    case 'quizResult':
      return {
        id: generateId(),
        type: 'quizResult',
        data: {
          resultTitle: 'Seu Estilo Predominante',
          resultDescription: 'Descrição do resultado do quiz será exibida aqui.'
        },
        order: 0,
        stageId
      };

    case 'stageCover':
      return {
        id: generateId(),
        type: 'stageCover',
        data: {
          stageTitle: 'Título da Capa',
          subtitle: 'Subtítulo da Capa',
          description: 'Descrição da Capa'
        },
        order: 0,
        stageId
      };

    case 'stageQuestion':
      return {
        id: generateId(),
        type: 'stageQuestion',
        data: {
          question: 'Pergunta do Quiz',
          options: [
            { id: generateId(), label: 'Opção 1', isCorrect: false },
            { id: generateId(), label: 'Opção 2', isCorrect: false }
          ],
          displayType: 'text',
          multiSelect: 1,
          layout: { columns: 2, direction: 'vertical' },
          imageSize: 'medium',
          selectionIndicator: 'border'
        },
        order: 0,
        stageId
      };

    case 'stageResult':
      return {
        id: generateId(),
        type: 'stageResult',
        data: {
          resultTitle: 'Título do Resultado',
          resultDescription: 'Descrição do Resultado'
        },
        order: 0,
        stageId
      };
    case 'openEnded':
      return {
        id: generateId(),
        type: 'openEnded',
        data: {
          question: 'Digite sua resposta',
          placeholder: 'Digite aqui...',
          maxLength: 500
        },
        order: 0,
        stageId
      };
    
    default:
      return {
        id: generateId(),
        type: 'text',
        data: {
          text: `Componente do tipo "${type}" não reconhecido.`
        },
        order: 0,
        stageId
      };
  }
};
