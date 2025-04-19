
import React from 'react';

export const TransformationSection: React.FC = () => {
  const steps = [
    {
      title: "Descoberta",
      description: "Entenda profundamente seu estilo único e como ele reflete sua essência"
    },
    {
      title: "Transformação",
      description: "Aprenda a expressar sua autenticidade através de escolhas conscientes"
    },
    {
      title: "Realização",
      description: "Sinta-se confiante e verdadeiramente você em cada look que criar"
    }
  ];

  return (
    <div className="space-y-12">
      <h2 className="text-3xl font-playfair text-[#1A1F2C] text-center">
        Sua Jornada de Transformação
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div 
            key={step.title}
            className="text-center space-y-4 p-6 bg-white/60 rounded-lg hover:bg-white/80 transition-all duration-300"
          >
            <div className="text-2xl font-playfair text-[#9b87f5]">
              {index + 1}
            </div>
            <h3 className="text-xl font-semibold text-[#1A1F2C]">
              {step.title}
            </h3>
            <p className="text-[#6E59A5]">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
