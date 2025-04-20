
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './button';
import { Edit } from 'lucide-react';

export const EditorButton = () => {
  return (
    <Link to="/admin/resultado-editor">
      <Button className="fixed bottom-4 right-4 bg-[#B89B7A] hover:bg-[#A38A69] z-50 shadow-lg text-white flex items-center py-6 px-6">
        <Edit className="w-5 h-5 mr-2" />
        Editor de Página de Resultados
      </Button>
    </Link>
  );
};
