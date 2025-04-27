import './styles/simple.css'; // Usando CSS simples sem diretivas Tailwind
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

createRoot(document.getElementById("root")!).render(<App />);
