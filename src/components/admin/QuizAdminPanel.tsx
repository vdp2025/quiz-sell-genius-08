import React, { useState, useEffect } from "react";
import EditorNovo from '../../pages/EditorNovo'; // ajuste o caminho se necessário

export default function QuizAdminPanel() {
  const [quizzes, setQuizzes] = useState([]);
  const [editingQuizId, setEditingQuizId] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("quizzes") || "[]");
    setQuizzes(saved);
  }, [editingQuizId]);

  function saveQuizzes(newQuizzes) {
    setQuizzes(newQuizzes);
    localStorage.setItem("quizzes", JSON.stringify(newQuizzes));
  }

  function handleCreate() {
    const novoQuiz = {
      id: Date.now().toString(),
      nome: "Novo Quiz",
      perguntas: [],
      oferta: { titulo: "", descricao: "", imagem: "", link: "" }
    };
    saveQuizzes([...quizzes, novoQuiz]);
  }

  function handleDelete(id) {
    saveQuizzes(quizzes.filter(q => q.id !== id));
  }

  function handleDuplicate(id) {
    const quiz = quizzes.find(q => q.id === id);
    if (quiz) {
      const copia = { ...quiz, id: Date.now().toString(), nome: quiz.nome + " (Cópia)" };
      saveQuizzes([...quizzes, copia]);
    }
  }

  if (editingQuizId) {
    return <EditorNovo quizId={editingQuizId} onBack={() => setEditingQuizId(null)} />;
  }

  return (
    <div>
      <h2>Painel de Quizzes</h2>
      <button onClick={handleCreate}>Novo Quiz</button>
      <ul>
        {quizzes.map(q => (
          <li key={q.id}>
            {q.nome}
            <button onClick={() => setEditingQuizId(q.id)}>Editar</button>
            <button onClick={() => handleDuplicate(q.id)}>Duplicar</button>
            <button onClick={() => handleDelete(q.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}