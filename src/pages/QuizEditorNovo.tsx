import React, { useState, useEffect } from "react";

export default function QuizEditorNovo({ quizId, onBack }) {
  const [quiz, setQuiz] = useState(null);
  const [tab, setTab] = useState('intro'); // intro | questions | result

  useEffect(() => {
    const quizzes = JSON.parse(localStorage.getItem("quizzes") || "[]");
    const found = quizzes.find(q => q.id === quizId);
    setQuiz(found);
  }, [quizId]);

  function handleSave() {
    const quizzes = JSON.parse(localStorage.getItem("quizzes") || "[]");
    const idx = quizzes.findIndex(q => q.id === quiz.id);
    quizzes[idx] = quiz;
    localStorage.setItem("quizzes", JSON.stringify(quizzes));
    alert("Quiz salvo!");
    if (onBack) onBack();
  }

  if (!quiz) return <div>Carregando...</div>;

  return (
    <div>
      <button onClick={onBack}>Voltar</button>
      <h2>Editando: {quiz.nome}</h2>
      <div style={{ marginBottom: 16 }}>
        <button onClick={() => setTab('intro')}>Introdução</button>
        <button onClick={() => setTab('questions')}>Perguntas</button>
        <button onClick={() => setTab('result')}>Resultado</button>
      </div>

      {tab === 'intro' && (
        <div>
          <h3>Editar Introdução</h3>
          <input
            value={quiz.introText || ""}
            onChange={e => setQuiz({ ...quiz, introText: e.target.value })}
            placeholder="Texto de introdução"
          />
          {/* Adicione outros campos conforme seu QuizIntro */}
        </div>
      )}

      {tab === 'questions' && (
        <div>
          <h3>Editar Perguntas</h3>
          {/* Campos para editar perguntas, opções, etc */}
          {quiz.perguntas.map((p, idx) => (
            <div key={p.id} style={{ border: "1px solid #ccc", margin: 8, padding: 8 }}>
              <input
                value={p.texto}
                onChange={e => {
                  const perguntas = [...quiz.perguntas];
                  perguntas[idx].texto = e.target.value;
                  setQuiz({ ...quiz, perguntas });
                }}
                placeholder="Texto da pergunta"
              />
              <div>
                <b>Opções:</b>
                {p.opcoes.map((op, oIdx) => (
                  <div key={oIdx}>
                    <input
                      value={op}
                      onChange={e => {
                        const perguntas = [...quiz.perguntas];
                        perguntas[idx].opcoes[oIdx] = e.target.value;
                        setQuiz({ ...quiz, perguntas });
                      }}
                      placeholder={`Opção ${oIdx + 1}`}
                    />
                    <button onClick={() => {
                      const perguntas = [...quiz.perguntas];
                      perguntas[idx].opcoes.splice(oIdx, 1);
                      setQuiz({ ...quiz, perguntas });
                    }} disabled={p.opcoes.length <= 1}>Remover</button>
                  </div>
                ))}
                <button onClick={() => {
                  const perguntas = [...quiz.perguntas];
                  perguntas[idx].opcoes.push("");
                  setQuiz({ ...quiz, perguntas });
                }}>Adicionar Opção</button>
              </div>
              <button onClick={() => {
                const perguntas = quiz.perguntas.filter((_, i) => i !== idx);
                setQuiz({ ...quiz, perguntas });
              }}>Remover Pergunta</button>
            </div>
          ))}
          <button onClick={() => {
            setQuiz({
              ...quiz,
              perguntas: [
                ...quiz.perguntas,
                { id: Date.now().toString(), texto: "", opcoes: [""] }
              ]
            });
          }}>Adicionar Pergunta</button>
        </div>
      )}

      {tab === 'result' && (
        <div>
          <h3>Editar Resultado</h3>
          <input
            value={quiz.resultText || ""}
            onChange={e => setQuiz({ ...quiz, resultText: e.target.value })}
            placeholder="Texto do resultado"
          />
          {/* Adicione outros campos conforme seu QuizResult */}
        </div>
      )}

      <br />
      <button onClick={handleSave}>Salvar Quiz</button>
    </div>
  );
}