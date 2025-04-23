
import React from 'react';

const MotivationSection = () => {
  return (
    <div className="text-center mb-10 space-y-4">
      <h2 className="text-2xl md:text-3xl font-playfair text-[#aa6b5d]">
        Você já descobriu seu Estilo e isso é muito poderoso.
      </h2>
      <p className="text-lg text-[#432818]">
        Conhecimento é clareza.<br />
        E clareza muda o jeito que você se vê, se escolhe, se posiciona.
      </p>

      <div className="grid md:grid-cols-2 gap-6 text-left mt-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <p className="text-[#432818] leading-relaxed">
            <em>
              Mas é na ação que a verdadeira transformação acontece.
              É quando você aplica o que aprendeu… que o espelho começa a
              contar uma nova história.
            </em>
          </p>
          <p className="text-[#432818] mt-4 leading-relaxed">
            <strong>
              Não é sobre mudar quem você é.<br />
              É sobre finalmente Vestir-se de Você.
            </strong>
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <p className="text-[#432818] leading-relaxed">
            E pra isso, eu preparei o caminho completo.<br />
            Simples. Prático. Estratégico.
          </p>
          <p className="text-[#432818] mt-4 leading-relaxed">
            <strong>
              Pra você transformar estilo em presença.<br />
              E imagem em poder.
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MotivationSection;
