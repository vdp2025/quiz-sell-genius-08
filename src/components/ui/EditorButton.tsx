
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './button';
import { Edit } from 'lucide-react';

const EditorButton: React.FC = () => {
  return (
    <Link to="/admin/editor">
      <Button>
        <Edit className="w-5 h-5 mr-2" />
        Editor Visual (Em Breve)
      </Button>
    </Link>
  );
};

export default EditorButton;
