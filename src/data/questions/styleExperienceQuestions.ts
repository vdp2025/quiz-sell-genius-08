
import { QuizQuestion } from '../../types/quiz';

export const styleExperienceQuestions: QuizQuestion[] = [
  {
    id: 'strategic-3',
    title: 'Com que frequência você se pega pensando: "Com que roupa eu vou?" — mesmo com o guarda-roupa cheio?',
    type: 'both',
    multiSelect: 1,
    options: [
      {
        id: 'strategic-3-1',
        text: 'Quase todos os dias — é sempre uma indecisão',
        styleCategory: 'Natural',
        points: 0,
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745195440/daily-wardrobe-struggle_webp.webp'
      },
      {
        id: 'strategic-3-2',
        text: 'Sempre que tenho um compromisso importante',
        styleCategory: 'Natural',
        points: 0,
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745195441/special-occasion-stress_webp.webp'
      },
      {
        id: 'strategic-3-3',
        text: 'Às vezes, mas me sinto limitada nas escolhas',
        styleCategory: 'Natural',
        points: 0,
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745195442/limited-choices_webp.webp'
      },
      {
        id: 'strategic-3-4',
        text: 'Raramente — já me sinto segura ao me vestir',
        styleCategory: 'Natural',
        points: 0,
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745195443/confident-dressing_webp.webp'
      }
    ]
  },
  {
    id: 'strategic-4',
    title: 'Qual desses objetivos mais representa o que você deseja com sua imagem pessoal?',
    type: 'both',
    multiSelect: 1,
    options: [
      {
        id: 'strategic-4-1',
        text: 'Me sentir confiante e com presença',
        styleCategory: 'Natural',
        points: 0,
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745195444/confidence-presence_webp.webp'
      },
      {
        id: 'strategic-4-2',
        text: 'Ser percebida com mais elegância e autoridade',
        styleCategory: 'Natural',
        points: 0,
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745195445/elegance-authority_webp.webp'
      },
      {
        id: 'strategic-4-3',
        text: 'Vestir minha autenticidade com leveza',
        styleCategory: 'Natural',
        points: 0,
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745195446/authentic-style_webp.webp'
      },
      {
        id: 'strategic-4-4',
        text: 'Ser reconhecida e admirada pela imagem que transmito',
        styleCategory: 'Natural',
        points: 0,
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745195447/admired-image_webp.webp'
      }
    ]
  }
];
