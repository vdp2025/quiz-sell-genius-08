import { QuizBuilderState, QuizComponentData, QuizStage } from "@/types/quizBuilder";
import { generateId } from "@/utils/idGenerator";

export const stages: QuizStage[] = [
  {
    id: "cover-stage",
    title: "Etapa 1: Capa do Quiz",
    order: 0,
    type: "cover", 
    isEnabled: true
  },
  {
    id: "question-stage",
    title: "Etapa 2: Questões Estratégicas",
    order: 1,
    type: "question",
    isEnabled: true
  }
];

export const components: QuizComponentData[] = [
  {
    id: "cover-header",
    type: "header",
    data: {
      stageTitle: "Descubra Seu Estilo Pessoal",
      subtitle: "Responda algumas perguntas e te ajudaremos a encontrar o estilo perfeito para você!"
    },
    style: {
      backgroundColor: "#f9f5f1",
      textColor: "#432818"
    },
    order: 0,
    stageId: "cover-stage"
  },
  {
    id: "cover-image",
    type: "image",
    data: {
      imageUrl: "/images/quiz/cover-image.jpg",
      alt: "Imagem da capa do quiz"
    },
    style: {
      borderRadius: "8px"
    },
    order: 1,
    stageId: "cover-stage"
  },
  {
    id: "question1",
    type: "singleChoice",
    data: {
      question: "Qual a sua prioridade ao escolher uma roupa?",
      options: [
        { text: "Conforto acima de tudo", isCorrect: false },
        { text: "Estar na moda", isCorrect: false },
        { text: "Elegância e sofisticação", isCorrect: false },
        { text: "Expressar minha individualidade", isCorrect: false }
      ],
      displayType: "text",
      multiSelect: 1,
      layout: { columns: 2, direction: "vertical" },
      imageSize: "medium",
      selectionIndicator: "border"
    },
    style: {
      backgroundColor: "#f9f5f1",
      textColor: "#432818"
    },
    order: 0,
    stageId: "question-stage"
  },
  {
    id: "question2",
    type: "singleChoice",
    data: {
      question: "Qual acessório não pode faltar no seu look?",
      options: [
        { text: "Um bom par de tênis", isCorrect: false },
        { text: "Bolsa de grife", isCorrect: false },
        { text: "Joias clássicas", isCorrect: false },
        { text: "Chapéu estiloso", isCorrect: false }
      ],
      displayType: "text",
      multiSelect: 1,
      layout: { columns: 2, direction: "vertical" },
      imageSize: "medium",
      selectionIndicator: "border"
    },
    style: {
      backgroundColor: "#f9f5f1",
      textColor: "#432818"
    },
    order: 1,
    stageId: "question-stage"
  }
];

export const strategicQuestionsTemplate: QuizBuilderState = {
  stages: stages,
  components: components
};
