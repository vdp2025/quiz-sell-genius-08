import React from 'react';

const OfertaPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fffaf7] px-4 py-8">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8 flex flex-col items-center">
        <h1 className="font-playfair text-3xl md:text-4xl font-bold text-[#aa6b5d] mb-6 text-center">Oferta Especial</h1>
        <p className="text-lg text-[#432818] mb-8 text-center">Garanta agora o Guia de Estilo e Imagem + Bônus Exclusivos para transformar sua imagem e se vestir com autenticidade!</p>
        <img
          src="https://res.cloudinary.com/dqljyf76t/image/upload/v1745193439/9a20446f-e01f-48f4-96d0-f4b37cc06625_ebd68o.jpg"
          alt="Oferta Guia de Estilo"
          className="w-full max-w-xs rounded-lg shadow-md mb-8"
          width={320}
          height={427}
        />
        <div className="bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] p-6 rounded-lg mb-6 border border-[#B89B7A]/10 glass-panel">
          <h3 className="text-xl font-medium text-[#aa6b5d] mb-4">O Guia de Estilo e Imagem + Bônus Exclusivos</h3>
          <ul className="space-y-3 text-left max-w-xl mx-auto text-[#432818]">
            <li>Looks com intenção e identidade</li>
            <li>Cores, modelagens e tecidos a seu favor</li>
            <li>Imagem alinhada aos seus objetivos</li>
            <li>Guarda-roupa funcional, sem compras por impulso</li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-[#B89B7A]/20 card-elegant mb-8 max-w-md mx-auto">
          <h3 className="text-xl font-medium text-center text-[#aa6b5d] mb-4">O Que Você Recebe Hoje</h3>
          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center p-2 border-b border-[#B89B7A]/10">
              <span>Guia Principal</span>
              <span className="font-medium">R$ 67,00</span>
            </div>
            <div className="flex justify-between items-center p-2 border-b border-[#B89B7A]/10">
              <span>Bônus - Peças-chave</span>
              <span className="font-medium">R$ 79,00</span>
            </div>
            <div className="flex justify-between items-center p-2 border-b border-[#B89B7A]/10">
              <span>Bônus - Visagismo Facial</span>
              <span className="font-medium">R$ 29,00</span>
            </div>
            <div className="flex justify-between items-center p-2 pt-3 font-bold">
              <span>Valor Total</span>
              <div className="relative">
                <span>R$ 175,00</span>
                <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-[#ff5a5a] transform -translate-y-1/2 -rotate-3"></div>
              </div>
            </div>
          </div>
          <div className="text-center p-4 bg-[#f9f4ef] rounded-lg">
            <p className="text-sm text-[#aa6b5d] uppercase font-medium">Hoje por apenas</p>
            <p className="text-4xl font-bold gold-text">R$ 39,00</p>
            <p className="text-xs text-[#3a3a3a]/60 mt-1">Pagamento único ou em 4X de R$ 10,86 sem juros</p>
          </div>
          <div className="mt-4">
            <img
              src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744920983/Espanhol_Portugu%C3%AAs_8_cgrhuw.webp"
              alt="Métodos de pagamento"
              className="w-full rounded-lg"
            />
          </div>
        </div>
        <a
          href="https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white py-4 px-8 rounded-md shadow-md transition-colors btn-3d mb-2 bg-gradient-to-r from-[#4CAF50] to-[#45a049] text-lg font-semibold"
        >
          Garantir Meu Guia + Bônus Especiais
        </a>
        <p className="text-sm text-[#aa6b5d] mt-2 text-center">
          Oferta exclusiva nesta página
        </p>
      </div>
    </div>
  );
};

export default OfertaPage;
