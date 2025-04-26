import React from 'react';
import { EditorMockProvider } from '@/components/unified-editor/EditorMockProvider';
import { UnifiedEditor } from '@/components/unified-editor';

const EditorPage: React.FC = () => {
  React.useEffect(() => {
    document.title = 'Editor Unificado | Quiz Sell Genius';
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <header className="bg-white shadow-sm py-3 px-4 border-b">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold text-[#432818]">Quiz Sell Genius</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a 
                  href="/" 
                  className="text-[#432818] hover:text-[#9b87f5] font-medium"
                >
                  Voltar para Home
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      
      <main className="flex-1 overflow-hidden">
        <EditorMockProvider>
          <UnifiedEditor />
        </EditorMockProvider>
      </main>
    </div>
  );
};

export default EditorPage; 