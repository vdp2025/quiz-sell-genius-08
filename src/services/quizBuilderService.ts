
import { QuizBuilderState, QuizStage, QuizComponentData } from "@/types/quizBuilder";
import { QuizQuestion } from "@/types/quiz";
import { generateId } from "@/utils/idGenerator";

/**
 * Generates initial stages for a new quiz
 */
export const generateInitialStages = (): QuizBuilderState => {
  const coverStageId = generateId();
  const firstQuestionStageId = generateId();
  const resultStageId = generateId();

  const coverComponentId = generateId();
  const firstQuestionComponentId = generateId();
  const resultComponentId = generateId();

  const stages: QuizStage[] = [
    {
      id: coverStageId,
      title: "Capa do Quiz",
      order: 0,
      type: "cover",
      componentId: coverComponentId
    },
    {
      id: firstQuestionStageId,
      title: "Pergunta 1",
      order: 1,
      type: "question",
      componentId: firstQuestionComponentId
    },
    {
      id: resultStageId,
      title: "Resultado",
      order: 2,
      type: "result",
      componentId: resultComponentId
    }
  ];

  const components: QuizComponentData[] = [
    {
      id: coverComponentId,
      type: "stageCover",
      order: 0,
      stageId: coverStageId,
      data: {
        title: "Descubra seu Estilo Pessoal",
        subtitle: "Responda as perguntas e descubra qual é o seu estilo predominante",
        buttonText: "Começar Quiz",
        backgroundColor: "#FAF9F7",
        textColor: "#432818"
      }
    },
    {
      id: firstQuestionComponentId,
      type: "stageQuestion",
      order: 0,
      stageId: firstQuestionStageId,
      data: {
        question: "Qual é sua preferência de estilo?",
        options: ["Opção 1", "Opção 2", "Opção 3", "Opção 4"],
        minSelections: 1,
        maxSelections: 1,
        required: true,
        displayType: "text",
        layout: {
          columns: 2,
          direction: "vertical"
        }
      }
    },
    {
      id: resultComponentId,
      type: "stageResult",
      order: 0,
      stageId: resultStageId,
      data: {
        title: "Seu Estilo Pessoal é:",
        subtitle: "Confira o resultado do seu quiz",
        resultLayout: "classic",
        showPercentages: true,
        showDescriptions: true,
        callToActionText: "Ver mais detalhes",
        callToActionUrl: "#detalhes"
      }
    }
  ];

  return {
    components,
    stages
  };
};

/**
 * Creates a builder state from existing quiz questions
 */
export const createBuilderStateFromQuiz = (
  questions: QuizQuestion[],
  quizTitle: string = "Novo Quiz",
  quizDescription: string = "Descrição do quiz",
  resultTitle: string = "Seu Resultado"
): QuizBuilderState => {
  // Create cover stage
  const coverStageId = generateId();
  const coverComponentId = generateId();
  
  // Create result stage
  const resultStageId = generateId();
  const resultComponentId = generateId();
  
  const stages: QuizStage[] = [
    {
      id: coverStageId,
      title: "Capa do Quiz",
      order: 0,
      type: "cover",
      componentId: coverComponentId
    }
  ];
  
  const components: QuizComponentData[] = [
    {
      id: coverComponentId,
      type: "stageCover",
      order: 0,
      stageId: coverStageId,
      data: {
        title: quizTitle,
        subtitle: quizDescription,
        buttonText: "Começar Quiz",
        backgroundColor: "#FAF9F7",
        textColor: "#432818"
      }
    }
  ];
  
  // Add question stages
  questions.forEach((question, index) => {
    const questionStageId = generateId();
    const questionComponentId = generateId();
    
    stages.push({
      id: questionStageId,
      title: `Pergunta ${index + 1}`,
      order: index + 1,
      type: "question",
      componentId: questionComponentId
    });
    
    // Convert options format
    const options = question.options.map(opt => opt.text);
    const optionImages = question.options.map(opt => opt.imageUrl || "");
    const optionStyleCategories = question.options.map(opt => opt.styleCategory || "");
    
    components.push({
      id: questionComponentId,
      type: "stageQuestion",
      order: 0,
      stageId: questionStageId,
      data: {
        question: question.title,
        options: options,
        minSelections: question.multiSelect,
        maxSelections: question.multiSelect,
        required: true,
        displayType: question.type,
        optionImages: optionImages,
        optionStyleCategories: optionStyleCategories,
        layout: {
          columns: question.type === 'image' || question.type === 'both' ? 2 : 1,
          direction: "vertical"
        }
      }
    });
  });
  
  // Add result stage at the end
  stages.push({
    id: resultStageId,
    title: "Resultado",
    order: questions.length + 1,
    type: "result",
    componentId: resultComponentId
  });
  
  components.push({
    id: resultComponentId,
    type: "stageResult",
    order: 0,
    stageId: resultStageId,
    data: {
      title: resultTitle,
      subtitle: "Confira o resultado do seu quiz",
      resultLayout: "classic",
      showPercentages: true,
      showDescriptions: true,
      callToActionText: "Ver mais detalhes",
      callToActionUrl: "#detalhes"
    }
  });
  
  return {
    stages,
    components
  };
};
