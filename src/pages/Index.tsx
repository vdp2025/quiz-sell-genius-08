-import QuizIntro from '../components/QuizIntro';
+import QuizIntro from '../components/QuizIntro';
// ... other imports ...

 const Index = () => {
   const [started, setStarted] = useState(false);
   const { quizCompleted } = useQuizContext();

-  const handleStart = () => {
-    setStarted(true);
-    console.log('Quiz started');
-  };
+  const handleStart = (name: string) => {
+    setStarted(true);
+    console.log(`Quiz started by ${name}`);
+  };

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