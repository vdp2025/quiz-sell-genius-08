
import React from 'react';
import { Card } from '@/components/ui/card';

const Testimonials = () => {
  return (
    <Card className="p-6 bg-[#f9ede8] border-[#aa6b5d]/20">
      <h3 className="text-xl font-playfair text-[#aa6b5d] mb-4">
        Depoimentos Reais:
      </h3>
      <img 
        src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744916217/Mockups_p%C3%A1gina_de_venda_Guia_de_Estilo_1_vostj4.webp"
        alt="Depoimentos de clientes"
        className="w-full rounded-lg"
      />
    </Card>
  );
};

export default Testimonials;
