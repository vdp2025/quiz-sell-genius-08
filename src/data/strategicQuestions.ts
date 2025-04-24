
import { QuizQuestion } from "@/types/quiz";
import { generateId } from "@/utils/idGenerator";

export const strategicQuestions: QuizQuestion[] = [
  {
    id: "strategic-1",
    title: "Qual problema você enfrenta atualmente com seu estilo pessoal?",
    type: "text",
    multiSelect: 1,
    orderIndex: 0,
    options: [
      {
        id: generateId(),
        text: "Não sei como destacar minhas qualidades",
        styleCode: "strategic",
        styleTypeId: "pain-point",
        points: 0
      },
      {
        id: generateId(),
        text: "Não tenho tempo para pensar em meu visual",
        styleCode: "strategic",
        styleTypeId: "pain-point",
        points: 0
      },
      {
        id: generateId(),
        text: "Falta consistência na minha imagem pessoal",
        styleCode: "strategic",
        styleTypeId: "pain-point",
        points: 0
      },
      {
        id: generateId(),
        text: "Não consigo causar boa impressão no primeiro contato",
        styleCode: "strategic",
        styleTypeId: "pain-point",
        points: 0
      }
    ]
  },
  {
    id: "strategic-2",
    title: "O que você quer alcançar através do seu estilo pessoal?",
    type: "text",
    multiSelect: 1,
    orderIndex: 1,
    options: [
      {
        id: generateId(),
        text: "Mais confiança no dia a dia",
        styleCode: "strategic",
        styleTypeId: "goal",
        points: 0
      },
      {
        id: generateId(),
        text: "Transmitir autoridade e competência profissional",
        styleCode: "strategic",
        styleTypeId: "goal",
        points: 0
      },
      {
        id: generateId(),
        text: "Facilitar a rotina com um guarda-roupa funcional",
        styleCode: "strategic",
        styleTypeId: "goal",
        points: 0
      },
      {
        id: generateId(),
        text: "Me sentir bem com a minha imagem",
        styleCode: "strategic",
        styleTypeId: "goal",
        points: 0
      }
    ]
  },
  {
    id: "strategic-3",
    title: "Qual é sua maior prioridade em relação ao seu estilo agora?",
    type: "text",
    multiSelect: 1,
    orderIndex: 2,
    options: [
      {
        id: generateId(),
        text: "Entender qual estilo mais combina comigo",
        styleCode: "strategic",
        styleTypeId: "priority",
        points: 0
      },
      {
        id: generateId(),
        text: "Aprender a montar looks coerentes",
        styleCode: "strategic",
        styleTypeId: "priority",
        points: 0
      },
      {
        id: generateId(),
        text: "Aprender a valorizar meu tipo físico",
        styleCode: "strategic",
        styleTypeId: "priority",
        points: 0
      },
      {
        id: generateId(),
        text: "Criar uma imagem profissional adequada",
        styleCode: "strategic",
        styleTypeId: "priority",
        points: 0
      }
    ]
  }
];
