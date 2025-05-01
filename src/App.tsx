import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { QuizPage } from './pages/QuizPage';
import { ResultPage } from './pages/ResultPage';
import { AdminPage } from './pages/admin/AdminPage';
import { EditorPage } from './pages/admin/EditorPage';
import { QuizBuilderPage } from './pages/admin/QuizBuilderPage';
import { SettingsPage } from './pages/admin/SettingsPage';
import { NotFoundPage } from './pages/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/editor" element={<EditorPage />} />
        <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/admin/AdminPage';
import EditorPage from './pages/admin/EditorPage';
import QuizBuilderPage from './pages/admin/QuizBuilderPage';
import SettingsPage from './pages/admin/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/editor" element={<EditorPage />} />
        <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/admin/AdminPage';
import EditorPage from './pages/admin/EditorPage';
import QuizBuilderPage from './pages/admin/QuizBuilderPage';
import SettingsPage from './pages/admin/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/editor" element={<EditorPage />} />
        <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/admin/AdminPage';
import EditorPage from './pages/admin/EditorPage';
import QuizBuilderPage from './pages/admin/QuizBuilderPage';
import SettingsPage from './pages/admin/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/editor" element={<EditorPage />} />
        <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/admin/AdminPage';
import EditorPage from './pages/admin/EditorPage';
import QuizBuilderPage from './pages/admin/QuizBuilderPage';
import SettingsPage from './pages/admin/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/editor" element={<EditorPage />} />
        <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/admin/AdminPage';
import EditorPage from './pages/admin/EditorPage';
import QuizBuilderPage from './pages/admin/QuizBuilderPage';
import SettingsPage from './pages/admin/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/editor" element={<EditorPage />} />
        <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/admin/AdminPage';
import EditorPage from './pages/admin/EditorPage';
import QuizBuilderPage from './pages/admin/QuizBuilderPage';
import SettingsPage from './pages/admin/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/editor" element={<EditorPage />} />
        <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/admin/AdminPage';
import EditorPage from './pages/admin/EditorPage';
import QuizBuilderPage from './pages/admin/QuizBuilderPage';
import SettingsPage from './pages/admin/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/editor" element={<EditorPage />} />
        <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/admin/AdminPage';
import EditorPage from './pages/admin/EditorPage';
import QuizBuilderPage from './pages/admin/QuizBuilderPage';
import SettingsPage from './pages/admin/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/editor" element={<EditorPage />} />
        <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/admin/AdminPage';
import EditorPage from './pages/admin/EditorPage';
import QuizBuilderPage from './pages/admin/QuizBuilderPage';
import SettingsPage from './pages/admin/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/editor" element={<EditorPage />} />
        <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/admin/AdminPage';
import EditorPage from './pages/admin/EditorPage';
import QuizBuilderPage from './pages/admin/QuizBuilderPage';
import SettingsPage from './pages/admin/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/editor" element={<EditorPage />} />
        <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/admin/AdminPage';
import EditorPage from './pages/admin/EditorPage';
import QuizBuilderPage from './pages/admin/QuizBuilderPage';
import SettingsPage from './pages/admin/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/editor" element={<EditorPage />} />
        <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/admin/AdminPage';
import EditorPage from './pages/admin/EditorPage';
import QuizBuilderPage from './pages/admin/QuizBuilderPage';
import SettingsPage from './pages/admin/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/editor" element={<EditorPage />} />
        <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/admin/AdminPage';
import EditorPage from './pages/admin/EditorPage';
import QuizBuilderPage from './pages/admin/QuizBuilderPage';
import SettingsPage from './pages/admin/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/editor" element={<EditorPage />} />
        <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/admin/AdminPage';
import EditorPage from './pages/admin/EditorPage';
import QuizBuilderPage from './pages/admin/QuizBuilderPage';
import SettingsPage from './pages/admin/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/editor" element={<EditorPage />} />
        <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/admin/AdminPage';
import EditorPage from './pages/admin/EditorPage';
import QuizBuilderPage from './pages/admin/QuizBuilderPage';
import SettingsPage from './pages/admin/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/editor" element={<EditorPage />} />
        <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/admin/AdminPage';
import EditorPage from './pages/admin/EditorPage';
import QuizBuilderPage from './pages/admin/QuizBuilderPage';
import SettingsPage from './pages/admin/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/editor" element={<EditorPage />} />
        <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/admin/AdminPage';
import EditorPage from './pages/admin/EditorPage';
import QuizBuilderPage from './pages/admin/QuizBuilderPage';
import SettingsPage from './pages/admin/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/editor" element={<EditorPage />} />
        <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/admin/AdminPage';
import EditorPage from './pages/admin/EditorPage';
import QuizBuilderPage from './pages/admin/QuizBuilderPage';
import SettingsPage from './pages/admin/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/editor" element={<EditorPage />} />
        <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/admin/AdminPage';
import EditorPage from './pages/admin/EditorPage';
import QuizBuilderPage from './pages/admin/QuizBuilderPage';
import SettingsPage from './pages/admin/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/editor" element={<EditorPage />} />
        <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/admin/AdminPage';
import EditorPage from './pages/admin/EditorPage';
import QuizBuilderPage from './pages/admin/QuizBuilderPage';
import SettingsPage from './pages/admin/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/editor" element={<EditorPage />} />
        <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/admin/AdminPage';
import EditorPage from './pages/admin/EditorPage';
import QuizBuilderPage from './pages/admin/QuizBuilderPage';
import SettingsPage from './pages/admin/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/editor" element={<EditorPage />} />
        <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/admin/AdminPage';
import EditorPage from './pages/admin/EditorPage';
import QuizBuilderPage from './pages/admin/QuizBuilderPage';
import SettingsPage from './pages/admin/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/editor" element={<EditorPage />} />
        <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/admin/AdminPage';
import EditorPage from './pages/admin/EditorPage';
import QuizBuilderPage from './pages/admin/QuizBuilderPage';
import SettingsPage from './pages/admin/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/editor" element={<EditorPage />} />
        <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/admin/AdminPage';
import EditorPage from './pages/admin/EditorPage';
import QuizBuilderPage from './pages/admin/QuizBuilderPage';
import SettingsPage from './pages/admin/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/editor" element={<EditorPage />} />
        <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/admin/AdminPage';
import EditorPage from './pages/admin/EditorPage';
import QuizBuilderPage from './pages/admin/QuizBuilderPage';
import SettingsPage from './pages/admin/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/editor" element={<EditorPage />} />
        <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/admin/AdminPage';
import EditorPage from './pages/admin/EditorPage';
import QuizBuilderPage from './pages/admin/QuizBuilderPage';
import SettingsPage from './pages/admin/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/editor" element={<EditorPage />} />
        <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/admin/AdminPage';
import EditorPage from './pages/admin/EditorPage';
import QuizBuilderPage from './pages/admin/QuizBuilderPage';
import SettingsPage from './pages/admin/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/editor" element={<EditorPage />} />
        <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/admin/AdminPage';
import EditorPage from './pages/admin/EditorPage';
import QuizBuilderPage from './pages/admin/QuizBuilderPage';
import SettingsPage from './pages/admin/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/editor" element={<EditorPage />} />
        <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/admin/AdminPage';
import EditorPage from './pages/admin/EditorPage';
import QuizBuilderPage from './pages/admin/QuizBuilderPage';
import SettingsPage from './pages/admin/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/editor" element={<EditorPage />} />
        <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/admin/AdminPage';
import EditorPage from './pages/admin/EditorPage';
import QuizBuilderPage from './pages/admin/QuizBuilderPage';
import SettingsPage from './pages/admin/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/editor" element={<EditorPage />} />
        <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/admin/AdminPage';
import EditorPage from './pages/admin/EditorPage';
import QuizBuilderPage from './pages/admin/QuizBuilderPage';
import SettingsPage from './pages/admin/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/editor" element={<EditorPage />} />
        <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/admin/AdminPage';
import EditorPage from './pages/admin/EditorPage';
import QuizBuilderPage from './pages/admin/QuizBuilderPage';
import SettingsPage from './pages/admin/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/editor" element={<EditorPage />} />
        <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/admin/AdminPage';
import EditorPage from './pages/admin/EditorPage';
import QuizBuilderPage from './pages/admin/QuizBuilderPage';
import SettingsPage from './pages/admin/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/editor" element={<EditorPage />} />
        <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/admin/AdminPage';
import EditorPage from './pages/admin/EditorPage';
import QuizBuilderPage from './pages/admin/QuizBuilderPage';
import SettingsPage from './pages/admin/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/editor" element={<EditorPage />} />
        <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/admin/AdminPage';
import EditorPage from './pages/admin/EditorPage';
import QuizBuilderPage from './pages/admin/QuizBuilderPage';
import SettingsPage from './pages/admin/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/editor" element={<EditorPage />} />
        <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/admin/AdminPage';
import EditorPage from './pages/admin/EditorPage';
import QuizBuilderPage from './pages/admin/QuizBuilderPage';
import SettingsPage from './pages/admin/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/editor" element={<EditorPage />} />
        <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/admin/AdminPage';
import EditorPage from './pages/admin/EditorPage';
import QuizBuilderPage from './pages/admin/QuizBuilderPage';
import SettingsPage from './pages/admin/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/editor" element={<EditorPage />} />
        <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/admin/AdminPage';
import EditorPage from './pages/admin/EditorPage';
import QuizBuilderPage from './pages/admin/QuizBuilderPage';
import SettingsPage from './pages/admin/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/editor" element={<EditorPage />} />
        <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/admin/AdminPage';
import EditorPage from './pages/admin/EditorPage';
import QuizBuilderPage from './pages/admin/QuizBuilderPage';
import SettingsPage from './pages/admin/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/editor" element={<EditorPage />} />
        <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/admin/AdminPage';
import EditorPage from './pages/admin/EditorPage';
import QuizBuilderPage from './pages/admin/QuizBuilderPage';
import SettingsPage from './pages/admin/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/editor" element={<EditorPage />} />
        <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/admin/AdminPage';
import EditorPage from './pages/admin/EditorPage';
import QuizBuilderPage from './pages/admin/QuizBuilderPage';
import SettingsPage from './pages/admin/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/editor" element={<EditorPage />} />
        <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/admin/AdminPage';
import EditorPage from './pages/admin/EditorPage';
import QuizBuilderPage from './pages/admin/QuizBuilderPage';
import SettingsPage from './pages/admin/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/editor" element={<EditorPage />} />
        <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/admin/AdminPage';
import EditorPage from './pages/admin/EditorPage';
import QuizBuilderPage from './pages/admin/QuizBuilderPage';
import SettingsPage from './pages/admin/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/editor" element={<EditorPage />} />
        <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/admin/AdminPage';
import EditorPage from './pages/admin/EditorPage';
import QuizBuilderPage from './pages/admin/QuizBuilderPage';
import SettingsPage from './pages/admin/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/editor" element={<EditorPage />} />
        <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/admin/AdminPage';
import EditorPage from './pages/admin/EditorPage';
import QuizBuilderPage from './pages/admin/QuizBuilderPage';
import SettingsPage from './pages/admin/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/editor" element={<EditorPage />} />
        <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/admin/AdminPage';
import EditorPage from './pages/admin/EditorPage';
import QuizBuilderPage from './pages/admin/QuizBuilderPage';
import SettingsPage from './pages/admin/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/editor" element={<EditorPage />} />
        <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/admin/AdminPage';
import EditorPage from './pages/admin/EditorPage';
import QuizBuilderPage from './pages/admin/QuizBuilderPage';
import SettingsPage from './pages/admin/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/editor" element={<EditorPage />} />
        <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/admin/AdminPage';
import EditorPage from './pages/admin/EditorPage';
import QuizBuilderPage from './pages/admin/QuizBuilderPage';
import SettingsPage from './pages/admin/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/editor" element={<EditorPage />} />
        <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/admin/AdminPage';
import EditorPage from './pages/admin/EditorPage';
import QuizBuilderPage from './pages/admin/QuizBuilderPage';
import SettingsPage from './pages/admin/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/editor" element={<EditorPage />} />
        <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/admin/AdminPage';
import EditorPage from './pages/admin/EditorPage';
import QuizBuilderPage from './pages/admin/QuizBuilderPage';
import SettingsPage from './pages/admin/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/editor" element={<EditorPage />} />
        <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/admin/AdminPage';
import EditorPage from './pages/admin/EditorPage';
import QuizBuilderPage from './pages/admin/QuizBuilderPage';
import SettingsPage from './pages/admin/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/editor" element={<EditorPage />} />
        <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/admin/AdminPage';
import EditorPage from './pages/admin/EditorPage';
import QuizBuilderPage from './pages/admin/QuizBuilderPage';
import SettingsPage from './pages/admin/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/editor" element={<EditorPage />} />
        <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/admin/AdminPage';
import EditorPage from './pages/admin/EditorPage';
import QuizBuilderPage from './pages/admin/QuizBuilderPage';
import SettingsPage from './pages/admin/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/editor" element={<EditorPage />} />
        <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/admin/AdminPage';
import EditorPage from './pages/admin/EditorPage';
import QuizBuilderPage from './pages/admin/QuizBuilderPage';
import SettingsPage from './pages/admin/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/editor" element={<EditorPage />} />
        <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/admin/AdminPage';
import EditorPage from './pages/admin/EditorPage';
import QuizBuilderPage from './pages/admin/QuizBuilderPage';
import SettingsPage from './pages/admin/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/resultado" element={<ResultPage />} />
