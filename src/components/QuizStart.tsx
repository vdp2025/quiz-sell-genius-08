
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useQuiz } from '@/context/QuizContext';
import { toast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export const QuizStart: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { startQuiz } = useQuiz();
  const { user } = useAuth();

  const handleStartQuiz = async () => {
    try {
      if (!name.trim()) {
        toast({
          title: "Campo obrigatório",
          description: "Por favor, informe seu nome para começar.",
          variant: "destructive",
        });
        return;
      }

      if (!email.trim()) {
        toast({
          title: "Campo obrigatório",
          description: "Por favor, informe seu email para começar.",
          variant: "destructive",
        });
        return;
      }

      await startQuiz(name, email, 'default-quiz');
      localStorage.setItem('userName', name);
      localStorage.setItem('userEmail', email);
      
      // Redirecionar para a página do quiz
      window.location.href = '/quiz';
      
    } catch (error) {
      console.error('Error starting quiz:', error);
      toast({
        title: "Erro ao iniciar o quiz",
        description: "Não foi possível iniciar o quiz. Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="relative flex flex-col items-center text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-playfair text-[#432818] mb-6">
          Descubra seu Estilo Pessoal
        </h1>
        
        <p className="text-lg text-[#8F7A6A] mb-8">
          Responda ao nosso quiz de estilo e descubra qual é o seu estilo predominante. 
          Este conhecimento vai transformar a maneira como você se veste!
        </p>

        <Button 
          onClick={() => setIsDialogOpen(true)}
          className="bg-[#B89B7A] hover:bg-[#A38A69] py-6 px-8 text-lg"
        >
          Começar Quiz
        </Button>
        
        {/* Link para área administrativa - visível apenas em desenvolvimento */}
        <div className="mt-8 text-sm text-[#8F7A6A]">
          <Link to="/admin" className="underline hover:text-[#432818]">
            Área Administrativa
          </Link>
        </div>
      </motion.div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-playfair text-[#432818]">
              Vamos começar!
            </DialogTitle>
            <DialogDescription>
              Por favor, preencha seus dados para iniciar o quiz.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right text-sm font-medium col-span-1">
                Nome
              </label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="email" className="text-right text-sm font-medium col-span-1">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button 
              onClick={handleStartQuiz}
              className="bg-[#B89B7A] hover:bg-[#A38A69]"
            >
              Iniciar Quiz
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuizStart;
