
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { AuthProvider } from "./context/AuthContext";
import { QuizProvider } from "./context/QuizContext";
import Index from "./pages/Index";
import ResultPage from "./pages/ResultPage";
import NotFound from "./pages/NotFound";
import EditorPage from "./pages/admin/EditorPage";
import QuizEditorPage from "./pages/admin/QuizEditorPage";
import EditorTestPage from "./pages/EditorTestPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <QuizProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/resultado" element={<ResultPage />} />
              <Route path="/admin/editor" element={<EditorPage />} />
              <Route path="/admin/quiz-editor" element={<QuizEditorPage />} />
              <Route path="/editor" element={<EditorTestPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </QuizProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
