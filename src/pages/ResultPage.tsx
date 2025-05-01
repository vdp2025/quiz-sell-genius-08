
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuizLogic } from '../hooks/useQuizLogic';
import { QuizResult as QuizResultType } from '../types/quiz';
import { Block, EditorBlock, BlockType } from '@/types/editor';
import { cn } from '@/lib/utils';
import BackupResultPage from '../backup/ResultPage.backup';
import { useResultPageConfig } from '@/hooks/useResultPageConfig';

// Component to render the result blocks
import { BlockRenderer as PreviewBlockRenderer } from '@/components/editor/preview/BlockRenderer';

const ResultPage = () => {
  const quizLogic = useQuizLogic();
  const { quizResult, resetQuiz } = quizLogic;
  const navigate = useNavigate();
  const [localResult, setLocalResult] = useState<QuizResultType | null>(null);
  const [useBlockBased, setUseBlockBased] = useState<boolean>(true);
  
  // Get the style type from the result
  const styleType = quizResult?.primaryStyle?.category || localResult?.primaryStyle?.category;
  
  // Load the page configuration for this style
  const { resultPageConfig, loading } = styleType 
    ? useResultPageConfig(styleType) 
    : { resultPageConfig: null, loading: false };

  useEffect(() => {
    // If there's no result from context, try to load from localStorage
    if (!quizResult) {
      try {
        const savedResult = localStorage.getItem('quizResult');
        if (savedResult) {
          setLocalResult(JSON.parse(savedResult));
        } else {
          // No result found, redirect to homepage
          navigate('/');
        }
      } catch (error) {
        console.error("Error loading quiz result:", error);
        navigate('/');
      }
    }
    
    // Check if the user has created a block-based page
    if (styleType && resultPageConfig && resultPageConfig.blocks && resultPageConfig.blocks.length > 0) {
      setUseBlockBased(true);
    } else {
      setUseBlockBased(false);
    }
  }, [quizResult, navigate, resultPageConfig, styleType]);

  const resultToUse = quizResult || localResult;

  if (!resultToUse || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center p-4">
          <h2 className="text-xl font-semibold mb-2">Carregando resultado...</h2>
        </div>
      </div>
    );
  }

  // If we're using block-based rendering and have blocks in the config
  if (useBlockBased && resultPageConfig?.blocks && resultPageConfig.blocks.length > 0) {
    return (
      <div 
        className="min-h-screen"
        style={{
          backgroundColor: resultPageConfig.globalStyles?.backgroundColor || '#FFFAF7',
          color: resultPageConfig.globalStyles?.textColor || '#432818',
          fontFamily: resultPageConfig.globalStyles?.fontFamily || 'inherit'
        }}
      >
        <div className="container mx-auto py-8 px-4">
          {/* Render the blocks - ensure blocks are properly typed as EditorBlock */}
          <div className="space-y-6">
            {resultPageConfig.blocks.map((block) => {
              // Ensure the block is compatible with EditorBlock by checking/fixing the type property
              const editorBlock: EditorBlock = {
                ...block,
                type: block.type as BlockType // Cast to ensure type compatibility
              };
              
              return (
                <PreviewBlockRenderer 
                  key={editorBlock.id} 
                  block={editorBlock} 
                  onSelect={() => {}} 
                  isPreview={true}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Use the backup result page component if no blocks are configured
  return <BackupResultPage />;
};

export default ResultPage;
