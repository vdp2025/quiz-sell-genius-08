
import { QuizQuestion as Question } from '@/types/quiz';

export const strategicQuestions: Question[] = [
  {
    id: 'struggle',
    title: 'Qual sua maior dificuldade com seu estilo pessoal atualmente?',
    type: 'text',
    multiSelect: 1,
    imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911578/BANNER_CONSULTORIA_GISELE_GALV%C3%83O_s2fliv.webp',
    options: [
      { id: 'option1', text: 'Não sei quais roupas combinam com meu corpo' },
      { id: 'option2', text: 'Tenho muitas roupas, mas sinto que não tenho o que vestir' },
      { id: 'option3', text: 'Não consigo criar looks que expressem minha personalidade' },
      { id: 'option4', text: 'Minhas roupas não me fazem sentir confiante' }
    ]
  },
  {
    id: 'wardrobe',
    title: 'Como você descreveria seu guarda-roupa atual?',
    type: 'text',
    multiSelect: 1,
    imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745574295/mulher-indecisa-guarda-roupa_gzyuhh.jpg',
    options: [
      { id: 'option1', text: 'Desorganizado, com peças que não uso há anos' },
      { id: 'option2', text: 'Cheio de roupas similares e repetitivas' },
      { id: 'option3', text: 'Básico demais, sem peças que expressem minha personalidade' },
      { id: 'option4', text: 'Confuso, com estilos muito diferentes e sem coerência' }
    ]
  },
  {
    id: 'shopping',
    title: 'Como você se sente quando vai às compras?',
    type: 'text',
    multiSelect: 1,
    imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911564/Design_sem_nome_17_vq40co.webp',
    options: [
      { id: 'option1', text: 'Perdida, sem saber o que realmente combina comigo' },
      { id: 'option2', text: 'Ansiosa, comprando por impulso e depois me arrependendo' },
      { id: 'option3', text: 'Frustrada, experimentando muitas coisas e levando poucas' },
      { id: 'option4', text: 'Estressada, sem paciência para achar o que preciso' }
    ]
  },
  {
    id: 'confidence',
    title: 'O que você mais deseja alcançar com seu estilo pessoal?',
    type: 'text',
    multiSelect: 1,
    imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911674/Qual_seu_prop%C3%B3sito_para_a_vida_4_fcgev0.webp',
    options: [
      { id: 'option1', text: 'Mais confiança no trabalho e na vida pessoal' },
      { id: 'option2', text: 'Expressar minha personalidade através das roupas' },
      { id: 'option3', text: 'Praticidade e facilidade para me vestir todos os dias' },
      { id: 'option4', text: 'Valorizar meu corpo e destacar minhas qualidades' }
    ]
  },
  {
    id: 'transformation',
    title: 'Qual transformação você espera em sua vida com um estilo bem definido?',
    type: 'text',
    multiSelect: 1,
    imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745574294/antes-depois-transformacao_ud8zzm.jpg',
    options: [
      { id: 'option1', text: 'Economizar tempo e dinheiro em compras desnecessárias' },
      { id: 'option2', text: 'Ser reconhecida pelo meu bom gosto e estilo único' },
      { id: 'option3', text: 'Sentir-me mais confiante nas minhas interações sociais' },
      { id: 'option4', text: 'Ter um guarda-roupa versátil que funciona em qualquer ocasião' }
    ]
  },
  {
    id: 'investment',
    title: 'Quanto você já investiu para resolver suas questões de estilo?',
    type: 'text',
    multiSelect: 1,
    imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745574294/guarda-roupa-otimizado_tzlfto.jpg',
    options: [
      { id: 'option1', text: 'Apenas em roupas, sem orientação profissional' },
      { id: 'option2', text: 'Tentei algumas dicas gratuitas da internet' },
      { id: 'option3', text: 'Comprei cursos básicos online' },
      { id: 'option4', text: 'Já contratei consultoria de imagem antes' }
    ]
  },
  {
    id: 'expectation',
    title: 'O que você espera de um guia de estilo personalizado?',
    type: 'text',
    multiSelect: 1,
    imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911656/Qual_seu_prop%C3%B3sito_para_a_vida_13_khgpku.webp',
    options: [
      { id: 'option1', text: 'Uma lista clara de peças essenciais para meu estilo' },
      { id: 'option2', text: 'Orientações sobre cores que combinam com meu tom de pele' },
      { id: 'option3', text: 'Dicas para valorizar meu tipo de corpo' },
      { id: 'option4', text: 'Inspirações de looks para diferentes ocasiões' }
    ]
  }
];
