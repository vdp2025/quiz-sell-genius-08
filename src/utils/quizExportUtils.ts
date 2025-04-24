
import { quizQuestions } from '@/data/quizQuestions';
import { strategicQuestions } from '@/data/strategicQuestions';
import { v4 as uuidv4 } from 'uuid';
import { QuizBuilderState, QuizComponentData, QuizStage } from '@/types/quizBuilder';
import { loadQuizResultConfig } from '@/services/quizBuilderService';

// Função para exportar os dados do quiz atual para o formato de builder
export const exportCurrentQuizToBuilderFormat = (): QuizBuilderState => {
  // Etapa 1: Criar as etapas (stages)
  const stages: QuizStage[] = [];
  const components: QuizComponentData[] = [];
  
  // Adicionar etapa de capa
  const coverStageId = `stage-${uuidv4()}`;
  stages.push({
    id: coverStageId,
    title: 'Etapa 1: Capa do Quiz',
    order: 0,
    type: 'cover'
  });
  
  // Adicionar componente de capa
  const coverComponentId = `component-${uuidv4()}`;
  components.push({
    id: coverComponentId,
    type: 'stageCover',
    order: 0,
    stageId: coverStageId,
    data: {
      stageTitle: 'Capa do Quiz',
      headline: 'Descubra seu Estilo Pessoal',
      subheadline: 'Responda às perguntas a seguir para revelar seu estilo predominante',
      buttonText: 'Começar',
      backgroundColor: '#FAF9F7',
      textColor: '#432818'
    },
    style: {
      backgroundColor: '#FAF9F7',
      textColor: '#432818',
      paddingY: '32',
      paddingX: '16',
      borderRadius: '0'
    }
  });
  
  // Adicionar etapas para cada pergunta do quiz
  const allQuestions = [...quizQuestions, ...strategicQuestions];
  allQuestions.forEach((question, index) => {
    const stageId = `stage-${uuidv4()}`;
    stages.push({
      id: stageId,
      title: `Etapa ${index + 2}: Questão ${index + 1}`,
      order: index + 1,
      type: 'question'
    });
    
    // Adicionar componente de pergunta
    const componentId = `component-${uuidv4()}`;
    components.push({
      id: componentId,
      type: 'multipleChoice',
      order: 0,
      stageId: stageId,
      data: {
        question: question.title,
        options: question.options.map(option => option.text),
        optionImages: question.options.map(option => option.imageUrl || ''),
        optionStyleCategories: question.options.map(option => option.styleCategory || 'Natural'),
        multiSelect: question.multiSelect,
        minSelections: question.multiSelect,
        maxSelections: question.multiSelect,
        displayType: question.type,
        required: true
      },
      style: {
        backgroundColor: '#FFFFFF',
        textColor: '#432818',
        paddingY: '24',
        paddingX: '16',
        borderRadius: '0'
      }
    });
  });
  
  // Adicionar etapa de resultado
  const resultStageId = `stage-${uuidv4()}`;
  stages.push({
    id: resultStageId,
    title: `Etapa ${allQuestions.length + 2}: Resultado`,
    order: allQuestions.length + 1,
    type: 'result'
  });
  
  // Adicionar componente de resultado
  const resultComponentId = `component-${uuidv4()}`;
  components.push({
    id: resultComponentId,
    type: 'stageResult',
    order: 0,
    stageId: resultStageId,
    data: {
      stageTitle: 'Resultado',
      title: 'Seu Resultado de Estilo Pessoal',
      subtitle: 'Baseado nas suas escolhas, calculamos seu estilo predominante',
      primaryStyleTitle: 'Seu Estilo Predominante',
      secondaryStylesTitle: 'Seus Estilos Complementares',
      showPercentages: true,
      showDescriptions: true,
      callToActionText: 'Conhecer o Guia Completo',
      callToActionUrl: '#',
      offerImageUrl: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744920983/Espanhol_Portugu%C3%AAs_8_cgrhuw.webp",
      authorImageUrl: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744921536/Sem_nome_1080_x_1000_px_z0chuv.webp",
      accentColor: '#B89B7A'
    },
    style: {
      backgroundColor: '#FAF9F7',
      textColor: '#432818',
      paddingY: '32',
      paddingX: '16',
      borderRadius: '0'
    }
  });
  
  return { stages, components };
};

// Função para exportar a configuração de página de resultado para o builder
export const exportResultPageToBuilderFormat = (styleType: string): QuizBuilderState | null => {
  try {
    // Carregar configuração de página de resultado
    const resultConfig = loadQuizResultConfig(styleType);
    
    if (!resultConfig) {
      console.error(`Nenhuma configuração encontrada para o estilo: ${styleType}`);
      return null;
    }
    
    // Criar uma etapa de resultado
    const resultStageId = `stage-${uuidv4()}`;
    const stages: QuizStage[] = [
      {
        id: resultStageId,
        title: 'Página de Resultado',
        order: 0,
        type: 'result'
      }
    ];
    
    // Criar componentes baseados na configuração
    const components: QuizComponentData[] = [];
    
    // Componente de cabeçalho
    if (resultConfig.header?.visible) {
      const headerId = `component-${uuidv4()}`;
      components.push({
        id: headerId,
        type: 'header',
        order: 0,
        stageId: resultStageId,
        data: {
          title: resultConfig.header?.content?.title || 'Seu Resultado',
          subtitle: resultConfig.header?.content?.subtitle || 'Descubra mais sobre seu estilo'
        },
        style: {
          backgroundColor: resultConfig.header?.style?.backgroundColor || '#FAF9F7',
          textColor: resultConfig.header?.style?.textColor || '#432818',
          paddingY: resultConfig.header?.style?.paddingY || '24',
          paddingX: resultConfig.header?.style?.paddingX || '16',
          borderRadius: resultConfig.header?.style?.borderRadius || '0'
        }
      });
    }
    
    // Componente de resultado
    const resultId = `component-${uuidv4()}`;
    components.push({
      id: resultId,
      type: 'quizResult',
      order: components.length,
      stageId: resultStageId,
      data: {
        primaryStyleTitle: 'Seu Estilo Predominante é',
        secondaryStylesTitle: 'Seus Estilos Complementares',
        showPercentages: true,
        showDescriptions: true,
        accentColor: resultConfig.globalStyles?.primaryColor || '#B89B7A'
      },
      style: {
        backgroundColor: resultConfig.mainContent?.style?.backgroundColor || '#FFFFFF',
        textColor: resultConfig.mainContent?.style?.textColor || '#432818',
        paddingY: '24',
        paddingX: '16',
        borderRadius: '0'
      }
    });
    
    // Componente de oferta
    if (resultConfig.offer?.hero?.visible) {
      const offerId = `component-${uuidv4()}`;
      components.push({
        id: offerId,
        type: 'benefitsList',
        order: components.length,
        stageId: resultStageId,
        data: {
          title: resultConfig.offer?.hero?.content?.title || 'Guia de Estilo Personalizado',
          benefits: [
            'Análise detalhada do seu estilo pessoal',
            'Paleta de cores personalizada',
            'Recomendações de peças ideais',
            'Dicas de combinações para diversas ocasiões'
          ]
        },
        style: {
          backgroundColor: resultConfig.offer?.hero?.style?.backgroundColor || '#FAF9F7',
          textColor: resultConfig.offer?.hero?.style?.textColor || '#432818',
          paddingY: '24',
          paddingX: '16',
          borderRadius: '0'
        }
      });
    }
    
    return { stages, components };
  } catch (error) {
    console.error('Erro ao exportar configuração da página de resultado:', error);
    return null;
  }
};
