
import { QuizQuestion } from '../../types/quiz';

export const styleExperienceQuestions: QuizQuestion[] = [
  {
    id: 'strategic-3',
    title: 'Com que frequência você se pega pensando: "Com que roupa eu vou?" — mesmo com o guarda-roupa cheio?',
    type: 'text',
    multiSelect: 1,
    imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745195440/daily-wardrobe-struggle_webp.webp',
    options: [
      {
        id: 'strategic-3-1',
        text: 'Quase todos os dias — é sempre uma indecisão'
      },
      {
        id: 'strategic-3-2',
        text: 'Sempre que tenho um compromisso importante'
      },
      {
        id: 'strategic-3-3',
        text: 'Às vezes, mas me sinto limitada nas escolhas'
      },
      {
        id: 'strategic-3-4',
        text: 'Raramente — já me sinto segura ao me vestir'
      }
    ]
  },
  {
    id: 'strategic-4',
    title: 'Qual desses objetivos mais representa o que você deseja com sua imagem pessoal?',
    type: 'text',
    multiSelect: 1,
    imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745195444/confidence-presence_webp.webp',
    options: [
      {
        id: 'strategic-4-1',
        text: 'Me sentir confiante e com presença'
      },
      {
        id: 'strategic-4-2',
        text: 'Ser percebida com mais elegância e autoridade'
      },
      {
        id: 'strategic-4-3',
        text: 'Vestir minha autenticidade com leveza'
      },
      {
        id: 'strategic-4-4',
        text: 'Ser reconhecida e admirada pela imagem que transmito'
      }
    ]
  }
];
