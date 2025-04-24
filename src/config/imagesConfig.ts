export interface ImagesConfig {
  mockups: {
    revistasGuia: string;
    celularPecasChave: string;
    pecasChavePorDentro: string;
    revistaPecasChaveCapa: string;
    todosProdutosBonus: string;
    completoComBonus: string;
    tableteModeloGuia: string;
  };
  depoimentos: string;
  garantia: { dias7: string; };
  visagismo: { tablet: string; capa: string; };
  perguntasEstrategicas: string[];
  antesEDepois: string;
  mentoraGisele: { perfil: string; espelho: string; acessibilidade: string; };
  checkoutLink: string;
}

export const imagesConfig: ImagesConfig = {
  mockups: {
    revistasGuia: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_14_oxegnd.webp',
    celularPecasChave: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911677/C%C3%B3pia_de_MOCKUPS_15_-_Copia_grstwl.webp',
    pecasChavePorDentro: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745515075/Espanhol_Portugu%C3%AAs_1_uru4r3.webp',
    revistaPecasChaveCapa: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911668/C%C3%B3pia_de_Passo_5_Pe%C3%A7as_chaves_Documento_A4_lxmekf.webp',
    todosProdutosBonus: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_13_znzbks.webp',
    completoComBonus: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744920983/Espanhol_Portugu%C3%AAs_8_cgrhuw.webp',
    tableteModeloGuia: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071347/MOCKUP_TABLETE_-_GUIA_DE_IMAGEM_E_ESTILO_ncctzi.webp',
  },
  depoimentos: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744916217/Mockups_p%C3%A1gina_de_venda_Guia_de_Estilo_1_vostj4.webp',
  garantia: { dias7: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744916216/C%C3%B3pia_de_01._P%C3%A1gina_-_Produto_de_Entrada_2_hamaox.webp' },
  visagismo: {
    tablet: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745515076/C%C3%B3pia_de_MOCKUPS_10_-_Copia_bvoccn.webp',
    capa: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911666/C%C3%B3pia_de_Template_Dossi%C3%AA_Completo_2024_15_-_Copia_ssrhu3.webp',
  },
  perguntasEstrategicas: [
    'https://res.cloudinary.com/dqljyf76t/image/upload/v1745193445/4fb35a75-02dd-40b9-adae-854e90228675_ibkrmt.webp',
    'https://res.cloudinary.com/dqljyf76t/image/upload/v1745459978/20250423_1704_Transforma%C3%A7%C3%A3o_no_Closet_Moderno_simple_compose_01jsj3xvy6fpfb6pyd5shg5eak_1_appany.webp',
    'https://res.cloudinary.com/dqljyf76t/image/upload/v1745193439/2dd7e159-43a1-40b0-8075-ba6f591074c1_gpsauh.webp',
    'https://res.cloudinary.com/dqljyf76t/image/upload/v1745193438/5702e50d-7785-426a-a0c6-3c47af176523_p9acfp.webp',
    'https://res.cloudinary.com/dqljyf76t/image/upload/v1745193438/6cceaaa9-9383-4890-95a4-da036f8421e3_u7tuaw.webp',
    'https://res.cloudinary.com/dqljyf76t/image/upload/v1745515862/Sem_nome_1000_x_1000_px_1280_x_720_px_vmqk3j.webp',
  ],
  antesEDepois: 'https://res.cloudinary.com/dzt2fe3ij/image/upload/v1745104587/Captura_de_tela_2025-03-31_034319_peuoc8.webp',
  mentoraGisele: {
    perfil: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911667/WhatsApp_Image_2025-04-02_at_09.40.53_cv8p5y.webp',
    espelho: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744921536/Sem_nome_1080_x_1000_px_z0chuv.webp',
    acessibilidade: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745347467/GISELE-GALV%C3%83O-POSE-ACESSIBILIDADE_i23qvj.webp',
  },
  checkoutLink: 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912',
};
