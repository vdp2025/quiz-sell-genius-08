import React from 'react';
import Link from 'next/link';

export const EditorNav: React.FC = () => {
  return (
    <nav className="bg-white shadow-sm py-3 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-[#432818] hover:text-[#9b87f5] font-medium">
            Home
          </Link>
          <Link href="/editor" className="text-[#432818] hover:text-[#9b87f5] font-medium">
            Editor Unificado
          </Link>
        </div>
        <div>
          <span className="text-sm text-gray-500">Quiz Sell Genius</span>
        </div>
      </div>
    </nav>
  );
};

export default EditorNav; 