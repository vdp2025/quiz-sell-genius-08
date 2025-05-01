import { QuizBuilderState, QuizComponentData, QuizStage } from "@/types/quizBuilder";
import { generateId } from "@/utils/idGenerator";

export const createQuizBuilderState = (): QuizBuilderState => {
  const stages: QuizStage[] = [
    {
      id: generateId(),
      title: "Etapa 1: Capa do Quiz",
      order: 0,
      type: "cover",
      isEnabled: true
    },
    {
      id: generateId(),
      title: "Etapa 2: Questão 1",
      order: 1,
      type: "question",
      isEnabled: true
    },
    {
      id: generateId(),
      title: "Etapa 3: Resultado",
      order: 2,
      type: "result",
      isEnabled: true
    }
  ];

  const components: QuizComponentData[] = [
    {
      id: generateId(),
      type: "stageCover",
      data: {
        title: "Descubra Seu Estilo Pessoal",
        description: "Responda algumas perguntas e veja qual estilo mais combina com você.",
        imageUrl: "https://images.unsplash.com/photo-1591047139829-d91aecb6ca9c?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      order: 0,
      stageId: stages[0].id
    },
    {
      id: generateId(),
      type: "stageQuestion",
      data: {
        question: "Qual cor você mais gosta?",
        options: [
          { text: "Azul", isCorrect: false },
          { text: "Verde", isCorrect: true },
          { text: "Amarelo", isCorrect: false },
          { text: "Vermelho", isCorrect: false }
        ]
      },
      order: 0,
      stageId: stages[1].id
    },
    {
      id: generateId(),
      type: "stageResult",
      data: {
        resultTitle: "Seu estilo é Natural",
        resultDescription: "Você é uma pessoa que gosta de coisas simples e confortáveis."
      },
      order: 0,
      stageId: stages[2].id
    }
  ];

  return {
    stages: stages,
    components: components,
    activeStageId: stages[0].id
  };
};
