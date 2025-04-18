
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import QuizPage from '@/components/QuizPage'; // Corrected path
import ResultPage from '@/pages/ResultPage';
import EditorPage from '@/pages/EditorPage';
import { AuthProvider } from '@/context/AuthContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <QuizPage />,
  },
  {
    path: '/resultado',
    element: <ResultPage />,
  },
  {
    path: '/editor',
    element: <EditorPage />,
  }
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
