import React, { useState, useEffect } from "react";
import QuizIntro from '../../components/QuizIntro';
import QuizPage from '../../components/QuizPage';
import QuizResult from '../../components/QuizResult';

export default function QuizEditorPage() {
  const [tab, setTab] = useState('intro'); // intro | questions | result
  const [quizData, setQuizData] = useState({
    intro: { titulo: "", descricao: "" },
    perguntas: [
      { id: "1", texto: "Pergunta exemplo", opcoes: ["Opção 1", "Opção 2"] }
    ],
    resultado: { titulo: "", descricao: "", imagem: "", oferta: "" }
  });

  // Carregar dados salvos
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("quizData") || "null");
    if (saved) setQuizData(saved);
  }, []);

  // Salvar dados
  function handleSave() {
    localStorage.setItem("quizData", JSON.stringify(quizData));
    alert("Quiz salvo!");
  }

  // Handlers para editar cada parte
  function handleIntroChange(field, value) {
    setQuizData({ ...quizData, intro: { ...quizData.intro, [field]: value } });
  }
  function handlePerguntaChange(idx, field, value) {
    const perguntas = [...quizData.perguntas];
    perguntas[idx][field] = value;
    setQuizData({ ...quizData, perguntas });
  }
  function handleOptionChange(qIdx, oIdx, value) {
    const perguntas = [...quizData.perguntas];
    perguntas[qIdx].opcoes[oIdx] = value;
    setQuizData({ ...quizData, perguntas });
  }
  function handleAddPergunta() {
    setQuizData({
      ...quizData,
      perguntas: [
        ...quizData.perguntas,
        { id: Date.now().toString(), texto: "", opcoes: [""] }
      ]
    });
  }
  function handleRemovePergunta(idx) {
    const perguntas = quizData.perguntas.filter((_, i) => i !== idx);
    setQuizData({ ...quizData, perguntas });
  }
  function handleAddOption(qIdx) {
    const perguntas = [...quizData.perguntas];
    perguntas[qIdx].opcoes.push("");
    setQuizData({ ...quizData, perguntas });
  }
  function handleRemoveOption(qIdx, oIdx) {
    const perguntas = [...quizData.perguntas];
    perguntas[qIdx].opcoes.splice(oIdx, 1);
    setQuizData({ ...quizData, perguntas });
  }
  function handleResultChange(field, value) {
    setQuizData({ ...quizData, resultado: { ...quizData.resultado, [field]: value } });
  }

  return (
    <div>
      <h2>Editor Visual do Quiz</h2>
      <div style={{ marginBottom: 16 }}>
        <button onClick={() => setTab('intro')}>Introdução</button>
        <button onClick={() => setTab('questions')}>Perguntas</button>
        <button onClick={() => setTab('result')}>Resultado</button>
      </div>

      {tab === 'intro' && (
        <div>
          <h3>Editar Introdução</h3>
          <input
            value={quizData.intro.titulo}
            onChange={e => handleIntroChange("titulo", e.target.value)}
            placeholder="Título da introdução"
          />
          <input
            value={quizData.intro.descricao}
            onChange={e => handleIntroChange("descricao", e.target.value)}
            placeholder="Descrição da introdução"
          />
          <h4>Preview</h4>
          <QuizIntro
            onStart={() => {}}
            titulo={quizData.intro.titulo}
            descricao={quizData.intro.descricao}
          />
        </div>
      )}

      {tab === 'questions' && (
        <div>
          <h3>Editar Perguntas</h3>
          {quizData.perguntas.map((p, idx) => (
            <div key={p.id} style={{ border: "1px solid #ccc", margin: 8, padding: 8 }}>
              <input
                value={p.texto}
                onChange={e => handlePerguntaChange(idx, "texto", e.target.value)}
                placeholder="Texto da pergunta"
              />
              <div>
                <b>Opções:</b>
                {p.opcoes.map((op, oIdx) => (
                  <div key={oIdx}>
                    <input
                      value={op}
                      onChange={e => handleOptionChange(idx, oIdx, e.target.value)}
                      placeholder={`Opção ${oIdx + 1}`}
                    />
                    <button onClick={() => handleRemoveOption(idx, oIdx)} disabled={p.opcoes.length <= 1}>Remover</button>
                  </div>
                ))}
                <button onClick={() => handleAddOption(idx)}>Adicionar Opção</button>
              </div>
              <button onClick={() => handleRemovePergunta(idx)}>Remover Pergunta</button>
            </div>
          ))}
          <button onClick={handleAddPergunta}>Adicionar Pergunta</button>
          <h4>Preview</h4>
          <QuizPage quiz={quizData} modoPreview />
        </div>
      )}

      {tab === 'result' && (
        <div>
          <h3>Editar Resultado</h3>
          <input
            value={quizData.resultado.titulo}
            onChange={e => handleResultChange("titulo", e.target.value)}
            placeholder="Título do resultado"
          />
          <input
            value={quizData.resultado.descricao}
            onChange={e => handleResultChange("descricao", e.target.value)}
            placeholder="Descrição do resultado"
          />
          <input
            value={quizData.resultado.imagem}
            onChange={e => handleResultChange("imagem", e.target.value)}
            placeholder="URL da imagem"
          />
          <input
            value={quizData.resultado.oferta}
            onChange={e => handleResultChange("oferta", e.target.value)}
            placeholder="Texto da oferta"
          />
          <h4>Preview</h4>
          <QuizResult
            titulo={quizData.resultado.titulo}
            descricao={quizData.resultado.descricao}
            imagem={quizData.resultado.imagem}
            oferta={quizData.resultado.oferta}
          />
        </div>
      )}

      <br />
      <button onClick={handleSave}>Salvar Quiz</button>
    </div>
  );
}