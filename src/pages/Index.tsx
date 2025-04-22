   import { useState } from 'react';
   import QuizIntro from '../components/QuizIntro';
   import QuizPage from '../components/QuizPage';
   import { useQuizContext } from '../context/QuizContext';

   const Index = () => {
     const [started, setStarted] = useState(false);
     const { startQuiz } = useQuizContext();

     // Recebe o nome digitado e dispara o início do quiz
     const handleStart = async (name: string) => {
       setStarted(true);
       console.log(`Quiz started by ${name}`);
       // Se quiser chamar o contexto:
       // await startQuiz(name, /*email*/ '', /*quizId*/ '');
     };

     return (
       <div className="min-h-screen bg-background">
         {!started ? (
           <QuizIntro onStart={handleStart} />
         ) : (
           <QuizPage />
         )}
       </div>
     );
   };

   export default Index;