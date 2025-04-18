
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import QuizPage from '@/components/QuizPage'; // Corrected path
import ResultPage from '@/pages/ResultPage';
import EditorPage from '@/pages/EditorPage';

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
  return <RouterProvider router={router} />;
}

export default App;
