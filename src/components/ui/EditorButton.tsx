
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './button';
import { Edit } from 'lucide-react';

export const EditorButton = () => {
  return (
    <Link to="/admin/resultado-editor">
      <Button className="fixed bottom-6 right-6 bg-[#B89B7A] hover:bg-[#A38A69] shadow-lg z-50">
        <Edit className="w-4 h-4 mr-2" />
        Editar Página
      </Button>
    </Link>
  );
};
