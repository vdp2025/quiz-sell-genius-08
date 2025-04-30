import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';

// Import pages here
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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/editor" element={<EditorPage />} />
          <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/editor" element={<EditorPage />} />
          <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/editor" element={<EditorPage />} />
          <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/editor" element={<EditorPage />} />
          <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/editor" element={<EditorPage />} />
          <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/editor" element={<EditorPage />} />
          <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/editor" element={<EditorPage />} />
          <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/editor" element={<EditorPage />} />
          <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/editor" element={<EditorPage />} />
          <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/editor" element={<EditorPage />} />
          <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/editor" element={<EditorPage />} />
          <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/editor" element={<EditorPage />} />
          <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/editor" element={<EditorPage />} />
          <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/editor" element={<EditorPage />} />
          <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/editor" element={<EditorPage />} />
          <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/editor" element={<EditorPage />} />
          <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/editor" element={<EditorPage />} />
          <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/editor" element={<EditorPage />} />
          <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/editor" element={<EditorPage />} />
          <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/editor" element={<EditorPage />} />
          <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/editor" element={<EditorPage />} />
          <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/editor" element={<EditorPage />} />
          <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/editor" element={<EditorPage />} />
          <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/editor" element={<EditorPage />} />
          <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/editor" element={<EditorPage />} />
          <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/editor" element={<EditorPage />} />
          <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/editor" element={<EditorPage />} />
          <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/editor" element={<EditorPage />} />
          <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/editor" element={<EditorPage />} />
          <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/editor" element={<EditorPage />} />
          <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/editor" element={<EditorPage />} />
          <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/editor" element={<EditorPage />} />
          <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/editor" element={<EditorPage />} />
          <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/editor" element={<EditorPage />} />
          <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/editor" element={<EditorPage />} />
          <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/editor" element={<EditorPage />} />
          <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/editor" element={<EditorPage />} />
          <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/editor" element={<EditorPage />} />
          <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/editor" element={<EditorPage />} />
          <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/editor" element={<EditorPage />} />
          <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/editor" element={<EditorPage />} />
          <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/editor" element={<EditorPage />} />
          <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/editor" element={<EditorPage />} />
          <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/editor" element={<EditorPage />} />
          <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/editor" element={<EditorPage />} />
          <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/editor" element={<EditorPage />} />
          <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/editor" element={<EditorPage />} />
          <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/editor" element={<EditorPage />} />
          <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/editor" element={<EditorPage />} />
          <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/editor" element={<EditorPage />} />
          <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/editor" element={<EditorPage />} />
          <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/editor" element={<EditorPage />} />
          <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/editor" element={<EditorPage />} />
          <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/editor" element={<EditorPage />} />
          <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/editor" element={<EditorPage />} />
          <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

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
