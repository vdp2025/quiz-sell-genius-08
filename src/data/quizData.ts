// ... existing code ...

// Adicione ou modifique as questões estratégicas
export const strategicQuestions = [
  {
    id: 'strategic-1',
    text: 'Você já se sentiu insegura ao escolher o que vestir?',
    description: 'Muitas mulheres enfrentam esse desafio diariamente, mas existe uma solução.',
    isStrategic: true,
    strategicImageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1746334756/ChatGPT_Image_4_de_mai._de_2025_01_42_42_jlugsc.webp',
    options: [
      { id: 'strategic-1-1', text: 'Sim, frequentemente' },
      { id: 'strategic-1-2', text: 'Às vezes' },
      { id: 'strategic-1-3', text: 'Raramente' }
    ]
  },
  {
    id: 'strategic-2',
    text: 'Quanto tempo você gasta escolhendo roupas pela manhã?',
    description: 'Conhecer seu estilo pode economizar tempo valioso no seu dia a dia.',
    isStrategic: true,
    strategicImageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1746334754/ChatGPT_Image_4_de_mai._de_2025_00_30_44_naqom0.webp',
    options: [
      { id: 'strategic-2-1', text: 'Mais de 20 minutos' },
      { id: 'strategic-2-2', text: 'Entre 10 e 20 minutos' },
      { id: 'strategic-2-3', text: 'Menos de 10 minutos' }
    ]
  },
  {
    id: 'strategic-3',
    text: 'Você já comprou roupas que nunca usou?',
    description: 'Entender seu estilo pessoal ajuda a fazer escolhas mais conscientes.',
    isStrategic: true,
    strategicImageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1746334753/ChatGPT_Image_4_de_mai._de_2025_01_30_01_vbiysd.webp',
    options: [
      { id: 'strategic-3-1', text: 'Sim, várias vezes' },
      { id: 'strategic-3-2', text: 'Algumas vezes' },
      { id: 'strategic-3-3', text: 'Raramente ou nunca' }
    ]
  },
  {
    id: 'strategic-4',
    text: 'Você sente que sua imagem reflete quem você realmente é?',
    description: 'Alinhar sua imagem com sua essência é fundamental para sua autoconfiança.',
    isStrategic: true,
    strategicImageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1746334752/ChatGPT_Image_4_de_mai._de_2025_01_00_30_qckn7n.webp',
    options: [
      { id: 'strategic-4-1', text: 'Não, sinto que poderia me expressar melhor' },
      { id: 'strategic-4-2', text: 'Parcialmente' },
      { id: 'strategic-4-3', text: 'Sim, estou satisfeita com minha imagem' }
    ]
  },
  {
    id: 'strategic-5',
    text: 'Você gostaria de economizar dinheiro em compras de roupas?',
    description: 'Conhecer seu estilo pode reduzir significativamente seus gastos com moda.',
    isStrategic: true,
    strategicImageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1746334752/ChatGPT_Image_4_de_mai._de_2025_01_38_24_vdlamr.webp',
    options: [
      { id: 'strategic-5-1', text: 'Sim, definitivamente' },
      { id: 'strategic-5-2', text: 'Talvez' },
      { id: 'strategic-5-3', text: 'Não é minha prioridade' }
    ]
  }
];

// ... existing code ...

// Certifique-se de incluir as questões estratégicas no array de questões
export const allQuestions = [
  // ... existing questions ...
  ...strategicQuestions,
  // ... more existing questions ...
];

// ... existing code ...