import React, { useEffect, useState } from "react";

export default function Index() {
  const [quizData, setQuizData] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("quizData") || "null");
    if (saved) setQuizData(saved);
  }, []);

  if (!quizData) return <div>Carregando quiz...</div>;

  return (
    <div>
      <h1>{quizData.intro.titulo}</h1>
      <p>{quizData.intro.descricao}</p>
      {quizData.perguntas.map((pergunta, idx) => (
        <div key={pergunta.id} style={{ marginBottom: 24 }}>
          <h3>{pergunta.texto}</h3>
          <ul>
            {pergunta.opcoes.map((opcao, oIdx) => (
              <li key={oIdx}>{opcao}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}