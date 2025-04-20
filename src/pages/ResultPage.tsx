// Este arquivo contém todos os componentes da página de resultado modularizados

// 1. PrimaryStyleBlock
export { default as PrimaryStyleBlock } from '@/components/result/PrimaryStyleBlock';

// 2. TransformationBlock
export const TransformationBlock = () => (
  <div className="space-y-6 mb-10 text-center">
    <h2 className="text-2xl md:text-3xl font-playfair text-[#aa6b5d]">
      Você já descobriu seu Estilo e isso é muito poderoso.
    </h2>
    <p className="text-lg text-[#432818]">
      Conhecimento é clareza.<br />
      E clareza muda o jeito que você se vê, se escolhe, se posiciona.
    </p>
    <div className="grid md:grid-cols-2 gap-6 text-left mt-8">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <p className="text-[#432818] leading-relaxed italic">
          Mas é na ação que a verdadeira transformação acontece. É quando você aplica o que aprendeu… que o espelho começa a contar uma nova história.
        </p>
        <p className="text-[#432818] mt-4 font-bold">
          Não é sobre mudar quem você é.<br />
          É sobre finalmente Vestir-se de Você.
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <p className="text-[#432818] leading-relaxed">
          E pra isso, eu preparei o caminho completo.<br />
          Simples. Prático. Estratégico.
        </p>
        <p className="text-[#432818] mt-4 font-bold">
          Pra você transformar estilo em presença.<br />
          E imagem em poder.
        </p>
      </div>
    </div>
  </div>
);

// 3. GuideOfferBlock
export { default as GuideOfferBlock } from '@/components/result/GuideOfferBlock';

// 4. TestimonialsBlock
export { default as TestimonialsBlock } from '@/components/result/TestimonialsBlock';

// 5. MentorBlock
export { default as MentorBlock } from '@/components/result/MentorBlock';

// 6. GuaranteeBlock
export { default as GuaranteeBlock } from '@/components/result/GuaranteeBlock';

// 7. FinalOfferBlock
export { default as FinalOfferBlock } from '@/components/result/FinalOfferBlock';
