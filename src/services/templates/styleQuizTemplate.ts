import { QuizStep } from '@/types/quizBuilder';
import { generateId } from '@/utils/idGenerator';

export const styleQuizTemplate: QuizStep[] = [
  {
    id: 'step-welcome',
    title: 'Boas-vindas',
    components: [
      {
        id: generateId(),
        type: 'header',
        order: 0,
        data: {
          title: 'DESCUBRA SEU ESTILO PESSOAL',
          subtitle: 'Responda o quiz e saiba qual estilo combina mais com você'
        },
        style: {
          paddingY: '20',
          paddingX: '10'
        }
      },
      {
        id: generateId(),
        type: 'image',
        order: 1,
        data: {
          imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp',
          alt: 'Logo Gisele Galvão'
        }
      },
      {
        id: generateId(),
        type: 'text',
        order: 2,
        data: {
          text: 'Este quiz foi desenvolvido para ajudá-la a identificar seu estilo pessoal predominante e como ele pode influenciar suas escolhas de moda e imagem pessoal.'
        },
        style: {
          paddingY: '10',
          paddingX: '20',
          fontSize: 16
        }
      },
      {
        id: generateId(),
        type: 'continueButton',
        order: 3,
        data: {
          buttonText: 'Começar Quiz',
          buttonColor: '#B89B7A',
          buttonTextColor: '#FFFFFF'
        }
      }
    ]
  },
  {
    id: 'step-q1',
    title: 'Questão 1',
    components: [
      {
        id: generateId(),
        type: 'multipleChoice',
        order: 0,
        data: {
          question: 'QUAL O SEU TIPO DE ROUPA FAVORITA?',
          multiSelect: 3,
          displayType: 'text',
          options: [
            'Looks confortáveis, soltos ao corpo, práticos para usar e para cuidar.',
            'Roupas discretas, com caimento clássico e que passam despercebidas.',
            'Roupas confortáveis mas com um toque de estilo.',
            'Peças com toques refinados, caimento perfeito, atual, mas sem modismos.',
            'Roupas delicadas de cores suaves, fluídas no corpo.',
            'Roupas que marquem meu corpo, decotes, fendas.',
            'Peças estruturadas, assimétricas, modernas.',
            'Formas e peças marcantes, em um mix no look.'
          ],
          fullOptions: [
            { text: 'Looks confortáveis, soltos ao corpo, práticos para usar e para cuidar.', styleCategory: 'Natural', points: 3 },
            { text: 'Roupas discretas, com caimento clássico e que passam despercebidas.', styleCategory: 'Clássico', points: 3 },
            { text: 'Roupas confortáveis mas com um toque de estilo.', styleCategory: 'Contemporâneo', points: 3 },
            { text: 'Peças com toques refinados, caimento perfeito, atual, mas sem modismos.', styleCategory: 'Elegante', points: 3 },
            { text: 'Roupas delicadas de cores suaves, fluídas no corpo.', styleCategory: 'Romântico', points: 3 },
            { text: 'Roupas que marquem meu corpo, decotes, fendas.', styleCategory: 'Sexy', points: 3 },
            { text: 'Peças estruturadas, assimétricas, modernas.', styleCategory: 'Dramático', points: 3 },
            { text: 'Formas e peças marcantes, em um mix no look.', styleCategory: 'Criativo', points: 3 }
          ],
          showContinueButton: true,
          buttonText: 'Continuar'
        }
      }
    ]
  },
  {
    id: 'step-q2',
    title: 'Questão 2',
    components: [
      {
        id: generateId(),
        type: 'multipleChoice',
        order: 0,
        data: {
          question: 'RESUMA A SUA PERSONALIDADE:',
          multiSelect: 3,
          displayType: 'text',
          options: [
            'Informal, espontânea, alegre, essencialista.',
            'Conservadora, séria, organizada.',
            'Informada, ativa, prática.',
            'Exigente, sofisticada, seletiva.',
            'Feminina, meiga, delicada, sensível.',
            'Glamorosa, vaidosa, sensual.',
            'Sou cosmopolita, moderna e audaciosa.',
            'Exótica, aventureira, livre.'
          ],
          fullOptions: [
            { text: 'Informal, espontânea, alegre, essencialista.', styleCategory: 'Natural', points: 3 },
            { text: 'Conservadora, séria, organizada.', styleCategory: 'Clássico', points: 3 },
            { text: 'Informada, ativa, prática.', styleCategory: 'Contemporâneo', points: 3 },
            { text: 'Exigente, sofisticada, seletiva.', styleCategory: 'Elegante', points: 3 },
            { text: 'Feminina, meiga, delicada, sensível.', styleCategory: 'Romântico', points: 3 },
            { text: 'Glamorosa, vaidosa, sensual.', styleCategory: 'Sexy', points: 3 },
            { text: 'Sou cosmopolita, moderna e audaciosa.', styleCategory: 'Dramático', points: 3 },
            { text: 'Exótica, aventureira, livre.', styleCategory: 'Criativo', points: 3 }
          ],
          showContinueButton: true,
          buttonText: 'Continuar'
        }
      }
    ]
  },
  {
    id: 'step-q3',
    title: 'Questão 3',
    components: [
      {
        id: generateId(),
        type: 'multipleChoice',
        order: 0,
        data: {
          question: 'QUAL VISUAL VOCÊ MAIS SE IDENTIFICA?',
          multiSelect: 3,
          displayType: 'both',
          gridColumns: 2,
          imageHeight: 180,
          options: [
            'Visual leve, despojado e natural.',
            'Visual clássico e tradicional.',
            'Visual casual com toque atual.',
            'Visual refinado e imponente.',
            'Visual romântico, feminino e delicado.',
            'Visual sensual, com saia justa e decote.',
            'Visual marcante e urbano (jeans + jaqueta).',
            'Visual criativo, colorido e ousado.'
          ],
          fullOptions: [
            { text: 'Visual leve, despojado e natural.', imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/2_ziffwx.webp', styleCategory: 'Natural', points: 3 },
            { text: 'Visual clássico e tradicional.', imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/3_asaunw.webp', styleCategory: 'Clássico', points: 3 },
            { text: 'Visual casual com toque atual.', imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/13_uvbciq.webp', styleCategory: 'Contemporâneo', points: 3 },
            { text: 'Visual refinado e imponente.', imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/5_dhrgpf.webp', styleCategory: 'Elegante', points: 3 },
            { text: 'Visual romântico, feminino e delicado.', imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/6_gnoxfg.webp', styleCategory: 'Romântico', points: 3 },
            { text: 'Visual sensual, com saia justa e decote.', imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735327/7_ynez1z.webp', styleCategory: 'Sexy', points: 3 },
            { text: 'Visual marcante e urbano (jeans + jaqueta).', imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/8_yqu3hw.webp', styleCategory: 'Dramático', points: 3 },
            { text: 'Visual criativo, colorido e ousado.', imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/9_x6so6a.webp', styleCategory: 'Criativo', points: 3 }
          ],
          showContinueButton: true,
          buttonText: 'Continuar'
        }
      }
    ]
  },
  {
    id: 'step-q4',
    title: 'Questão 4',
    components: [
      {
        id: generateId(),
        type: 'multipleChoice',
        order: 0,
        data: {
          question: 'QUAIS DETALHES VOCÊ GOSTA?',
          multiSelect: 3,
          displayType: 'text',
          options: [
            'Poucos detalhes, básico e prático.',
            'Bem discretos e sutis, clean e clássico.',
            'Básico, mas com um toque de estilo.',
            'Detalhes refinados, chic e que deem status.',
            'Detalhes delicados, laços, babados.',
            'Roupas que valorizem meu corpo: couro, zíper, fendas.',
            'Detalhes marcantes, firmeza e peso.',
            'Detalhes diferentes do convencional, produções ousadas.'
          ],
          fullOptions: [
            { text: 'Poucos detalhes, básico e prático.', styleCategory: 'Natural', points: 3 },
            { text: 'Bem discretos e sutis, clean e clássico.', styleCategory: 'Clássico', points: 3 },
            { text: 'Básico, mas com um toque de estilo.', styleCategory: 'Contemporâneo', points: 3 },
            { text: 'Detalhes refinados, chic e que deem status.', styleCategory: 'Elegante', points: 3 },
            { text: 'Detalhes delicados, laços, babados.', styleCategory: 'Romântico', points: 3 },
            { text: 'Roupas que valorizem meu corpo: couro, zíper, fendas.', styleCategory: 'Sexy', points: 3 },
            { text: 'Detalhes marcantes, firmeza e peso.', styleCategory: 'Dramático', points: 3 },
            { text: 'Detalhes diferentes do convencional, produções ousadas.', styleCategory: 'Criativo', points: 3 }
          ],
          showContinueButton: true,
          buttonText: 'Continuar'
        }
      }
    ]
  },
  {
    id: 'step-q5',
    title: 'Questão 5',
    components: [
      {
        id: generateId(),
        type: 'multipleChoice',
        order: 0,
        data: {
          question: 'QUAIS ESTAMPAS VOCÊ MAIS SE IDENTIFICA?',
          multiSelect: 3,
          displayType: 'text',
          options: [
            'Estampas clean, com poucas informações.',
            'Estampas clássicas e atemporais.',
            'Atemporais, mas que tenham uma pegada de atual e moderna.',
            'Estampas clássicas e atemporais, mas sofisticadas.',
            'Estampas florais e/ou delicadas como bolinhas, borboletas e corações.',
            'Estampas de animal print, como onça, zebra e cobra.',
            'Estampas geométricas, abstratas e exageradas como grandes poás.',
            'Estampas diferentes do usual, como africanas, xadrez grandes.'
          ],
          fullOptions: [
            { text: 'Estampas clean, com poucas informações.', styleCategory: 'Natural', points: 3 },
            { text: 'Estampas clássicas e atemporais.', styleCategory: 'Clássico', points: 3 },
            { text: 'Atemporais, mas que tenham uma pegada de atual e moderna.', styleCategory: 'Contemporâneo', points: 3 },
            { text: 'Estampas clássicas e atemporais, mas sofisticadas.', styleCategory: 'Elegante', points: 3 },
            { text: 'Estampas florais e/ou delicadas como bolinhas, borboletas e corações.', styleCategory: 'Romântico', points: 3 },
            { text: 'Estampas de animal print, como onça, zebra e cobra.', styleCategory: 'Sexy', points: 3 },
            { text: 'Estampas geométricas, abstratas e exageradas como grandes poás.', styleCategory: 'Dramático', points: 3 },
            { text: 'Estampas diferentes do usual, como africanas, xadrez grandes.', styleCategory: 'Criativo', points: 3 }
          ],
          showContinueButton: true,
          buttonText: 'Continuar'
        }
      }
    ]
  },
  {
    id: 'step-q6',
    title: 'Questão 6',
    components: [
      {
        id: generateId(),
        type: 'multipleChoice',
        order: 0,
        data: {
          question: 'QUAL CASACO É SEU FAVORITO?',
          multiSelect: 3,
          displayType: 'both',
          gridColumns: 2,
          imageHeight: 180,
          options: [
            'Cardigã bege confortável e casual.',
            'Blazer verde estruturado.',
            'Trench coat bege tradicional.',
            'Blazer branco refinado.',
            'Casaco pink vibrante e moderno.',
            'Jaqueta vinho de couro estilosa.',
            'Jaqueta preta estilo rocker.',
            'Casaco estampado criativo e colorido.'
          ],
          fullOptions: [
            { text: 'Cardigã bege confortável e casual.', imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735372/29_sdogoy.webp', styleCategory: 'Natural', points: 3 },
            { text: 'Blazer verde estruturado.', imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735372/30_nfth8k.webp', styleCategory: 'Clássico', points: 3 },
            { text: 'Trench coat bege tradicional.', imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735372/31_tcmhcl.webp', styleCategory: 'Contemporâneo', points: 3 },
            { text: 'Blazer branco refinado.', imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735377/32_h78pd8.webp', styleCategory: 'Elegante', points: 3 },
            { text: 'Casaco pink vibrante e moderno.', imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735377/33_u8pldd.webp', styleCategory: 'Romântico', points: 3 },
            { text: 'Jaqueta vinho de couro estilosa.', imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735377/34_peadir.webp', styleCategory: 'Sexy', points: 3 },
            { text: 'Jaqueta preta estilo rocker.', imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735379/35_pulzso.webp', styleCategory: 'Dramático', points: 3 },
            { text: 'Casaco estampado criativo e colorido.', imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735377/36_cympaq.webp', styleCategory: 'Criativo', points: 3 }
          ],
          showContinueButton: true,
          buttonText: 'Continuar'
        }
      }
    ]
  },
  {
    id: 'step-q7',
    title: 'Questão 7',
    components: [
      {
        id: generateId(),
        type: 'multipleChoice',
        order: 0,
        data: {
          question: 'QUAL SUA CALÇA FAVORITA?',
          multiSelect: 3,
          displayType: 'both',
          gridColumns: 2,
          imageHeight: 180,
          options: [
            'Calça fluida acetinada bege.',
            'Calça de alfaiataria cinza.',
            'Jeans reto e básico.',
            'Calça reta bege de tecido.',
            'Calça ampla rosa alfaiatada.',
            'Legging preta de couro.',
            'Calça reta preta de couro.',
            'Calça estampada floral leve e ampla.'
          ],
          fullOptions: [
            { text: 'Calça fluida acetinada bege.', imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735419/38_iilv0l.webp', styleCategory: 'Natural', points: 3 },
            { text: 'Calça de alfaiataria cinza.', imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735417/39_arsswu.webp', styleCategory: 'Clássico', points: 3 },
            { text: 'Jeans reto e básico.', imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735419/40_beq52x.webp', styleCategory: 'Contemporâneo', points: 3 },
            { text: 'Calça reta bege de tecido.', imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735419/41_hconq4.webp', styleCategory: 'Elegante', points: 3 },
            { text: 'Calça ampla rosa alfaiatada.', imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735420/42_q8xws1.webp', styleCategory: 'Romântico', points: 3 },
            { text: 'Legging preta de couro.', imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735424/43_ljy7sh.webp', styleCategory: 'Sexy', points: 3 },
            { text: 'Calça reta preta de couro.', imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735424/44_nqgvoq.webp', styleCategory: 'Dramático', points: 3 },
            { text: 'Calça estampada floral leve e ampla.', imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735425/45_lp64m8.webp', styleCategory: 'Criativo', points: 3 }
          ],
          showContinueButton: true,
          buttonText: 'Continuar'
        }
      }
    ]
  },
  {
    id: 'step-q8',
    title: 'Questão 8',
    components: [
      {
        id: generateId(),
        type: 'multipleChoice',
        order: 0,
        data: {
          question: 'QUAL DESSES SAPATOS VOCÊ TEM OU MAIS GOSTA?',
          multiSelect: 3,
          displayType: 'both',
          gridColumns: 2,
          imageHeight: 180,
          options: [
            'Tênis nude casual e confortável.',
            'Scarpin nude de salto baixo.',
            'Sandália dourada com salto bloco.',
            'Scarpin nude salto alto e fino.',
            'Sandália anabela off white.',
            'Sandália rosa de tiras finas.',
            'Scarpin preto moderno com vinil transparente.',
            'Scarpin colorido estampado.'
          ],
          fullOptions: [
            { text: 'Tênis nude casual e confortável.', imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735426/47_bi6vgf.webp', styleCategory: 'Natural', points: 3 },
            { text: 'Scarpin nude de salto baixo.', imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735427/48_ymo1ur.webp', styleCategory: 'Clássico', points: 3 },
            { text: 'Sandália dourada com salto bloco.', imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735427/49_apcrwa.webp', styleCategory: 'Contemporâneo', points: 3 },
            { text: 'Scarpin nude salto alto e fino.', imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735428/50_qexxxo.webp', styleCategory: 'Elegante', points: 3 },
            { text: 'Sandália anabela off white.', imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735428/51_xbgntp.webp', styleCategory: 'Romântico', points: 3 },
            { text: 'Sandália rosa de tiras finas.', imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735429/52_edlp0e.webp', styleCategory: 'Sexy', points: 3 },
            { text: 'Scarpin preto moderno com vinil transparente.', imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735429/53_bfdp6f.webp', styleCategory: 'Dramático', points: 3 },
            { text: 'Scarpin colorido estampado.', imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735430/54_xnilkc.webp', styleCategory: 'Criativo', points: 3 }
          ],
          showContinueButton: true,
          buttonText: 'Continuar'
        }
      }
    ]
  },
  {
    id: 'step-q9',
    title: 'Questão 9',
    components: [
      {
        id: generateId(),
        type: 'multipleChoice',
        order: 0,
        data: {
          question: 'QUE TIPO DE ACESSÓRIOS VOCÊ GOSTA?',
          multiSelect: 3,
          displayType: 'text',
          options: [
            'Pequenos e discretos, às vezes nem uso.',
            'Brincos pequenos e discretos. Corrente fininha.',
            'Acessórios que elevem meu look com um toque moderno.',
            'Acessórios sofisticados, joias ou semijoias.',
            'Peças delicadas e com um toque feminino.',
            'Brincos longos, colares que valorizem minha beleza.',
            'Acessórios pesados, que causem um impacto.',
            'Acessórios diferentes, grandes e marcantes.'
          ],
          fullOptions: [
            { text: 'Pequenos e discretos, às vezes nem uso.', styleCategory: 'Natural', points: 3 },
            { text: 'Brincos pequenos e discretos. Corrente fininha.', styleCategory: 'Clássico', points: 3 },
            { text: 'Acessórios que elevem meu look com um toque moderno.', styleCategory: 'Contemporâneo', points: 3 },
            { text: 'Acessórios sofisticados, joias ou semijoias.', styleCategory: 'Elegante', points: 3 },
            { text: 'Peças delicadas e com um toque feminino.', styleCategory: 'Romântico', points: 3 },
            { text: 'Brincos longos, colares que valorizem minha beleza.', styleCategory: 'Sexy', points: 3 },
            { text: 'Acessórios pesados, que causem um impacto.', styleCategory: 'Dramático', points: 3 },
            { text: 'Acessórios diferentes, grandes e marcantes.', styleCategory: 'Criativo', points: 3 }
          ],
          showContinueButton: true,
          buttonText: 'Continuar'
        }
      }
    ]
  },
  {
    id: 'step-q10',
    title: 'Questão 10',
    components: [
      {
        id: generateId(),
        type: 'multipleChoice',
        order: 0,
        data: {
          question: 'VOCÊ ESCOLHE CERTOS TECIDOS, PRINCIPALMENTE PORQUE ELES...',
          multiSelect: 3,
          displayType: 'text',
          options: [
            'São fáceis de cuidar.',
            'São de excelente qualidade.',
            'São fáceis de cuidar e modernos.',
            'São sofisticados.',
            'São delicados.',
            'São perfeitos ao meu corpo.',
            'São diferentes, e trazem um efeito para minha roupa.',
            'São exclusivos, criam identidade no look.'
          ],
          fullOptions: [
            { text: 'São fáceis de cuidar.', styleCategory: 'Natural', points: 3 },
            { text: 'São de excelente qualidade.', styleCategory: 'Clássico', points: 3 },
            { text: 'São fáceis de cuidar e modernos.', styleCategory: 'Contemporâneo', points: 3 },
            { text: 'São sofisticados.', styleCategory: 'Elegante', points: 3 },
            { text: 'São delicados.', styleCategory: 'Romântico', points: 3 },
            { text: 'São perfeitos ao meu corpo.', styleCategory: 'Sexy', points: 3 },
            { text: 'São diferentes, e trazem um efeito para minha roupa.', styleCategory: 'Dramático', points: 3 },
            { text: 'São exclusivos, criam identidade no look.', styleCategory: 'Criativo', points: 3 }
          ],
          showContinueButton: true,
          buttonText: 'Finalizar Quiz'
        }
      }
    ]
  },
  {
    id: 'step-strategic1',
    title: 'Questão Estratégica 1',
    components: [
      {
        id: generateId(),
        type: 'multipleChoice',
        order: 0,
        data: {
          question: 'VOCÊ JÁ SE SENTIU INSEGURA SOBRE SEU ESTILO?',
          multiSelect: 1,
          displayType: 'text',
          options: [
            'Sim, frequentemente não sei o que combina comigo',
            'Às vezes tenho dúvidas sobre o que vestir',
            'Raramente, geralmente sei o que funciona para mim',
            'Não, tenho total confiança no meu estilo'
          ],
          fullOptions: [
            { text: 'Sim, frequentemente não sei o que combina comigo', styleCategory: 'Natural', points: 0, isStrategic: true },
            { text: 'Às vezes tenho dúvidas sobre o que vestir', styleCategory: 'Clássico', points: 0, isStrategic: true },
            { text: 'Raramente, geralmente sei o que funciona para mim', styleCategory: 'Contemporâneo', points: 0, isStrategic: true },
            { text: 'Não, tenho total confiança no meu estilo', styleCategory: 'Elegante', points: 0, isStrategic: true }
          ],
          showContinueButton: true,
          buttonText: 'Continuar'
        }
      }
    ]
  },
  {
    id: 'step-strategic2',
    title: 'Questão Estratégica 2',
    components: [
      {
        id: generateId(),
        type: 'multipleChoice',
        order: 0,
        data: {
          question: 'O QUE VOCÊ MAIS GOSTARIA DE MUDAR NO SEU GUARDA-ROUPA?',
          multiSelect: 1,
          displayType: 'text',
          options: [
            'Ter roupas que realmente combinem entre si',
            'Ter peças que valorizem meu corpo',
            'Ter um visual mais sofisticado e elegante',
            'Ter um estilo mais moderno e atual',
            'Ter mais confiança para me vestir'
          ],
          fullOptions: [
            { text: 'Ter roupas que realmente combinem entre si', styleCategory: 'Natural', points: 0, isStrategic: true },
            { text: 'Ter peças que valorizem meu corpo', styleCategory: 'Clássico', points: 0, isStrategic: true },
            { text: 'Ter um visual mais sofisticado e elegante', styleCategory: 'Contemporâneo', points: 0, isStrategic: true },
            { text: 'Ter um estilo mais moderno e atual', styleCategory: 'Elegante', points: 0, isStrategic: true },
            { text: 'Ter mais confiança para me vestir', styleCategory: 'Romântico', points: 0, isStrategic: true }
          ],
          showContinueButton: true,
          buttonText: 'Continuar'
        }
      }
    ]
  },
  {
    id: 'step-strategic3',
    title: 'Questão Estratégica 3',
    components: [
      {
        id: generateId(),
        type: 'multipleChoice',
        order: 0,
        data: {
          question: 'QUANTO VOCÊ ESTARIA DISPOSTA A INVESTIR EM UM GUIA COMPLETO DE ESTILO PERSONALIZADO?',
          multiSelect: 1,
          displayType: 'text',
          options: [
            'Até R$ 97',
            'Entre R$ 97 e R$ 197',
            'Entre R$ 197 e R$ 397',
            'Acima de R$ 397',
            'Não estaria disposta a investir'
          ],
          fullOptions: [
            { text: 'Até R$ 97', styleCategory: 'Natural', points: 0, isStrategic: true },
            { text: 'Entre R$ 97 e R$ 197', styleCategory: 'Clássico', points: 0, isStrategic: true },
            { text: 'Entre R$ 197 e R$ 397', styleCategory: 'Contemporâneo', points: 0, isStrategic: true },
            { text: 'Acima de R$ 397', styleCategory: 'Elegante', points: 0, isStrategic: true },
            { text: 'Não estaria disposta a investir', styleCategory: 'Romântico', points: 0, isStrategic: true }
          ],
          showContinueButton: true,
          buttonText: 'Ver Resultado'
        }
      }
    ]
  }
];
