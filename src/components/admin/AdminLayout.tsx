
import React, { ReactNode } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';
import { GridLayout } from '../shared/GridLayout';
import { BarChart, Edit, FileText, Settings, Users } from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F7]">
      <header className="bg-white border-b p-4 shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link to="/admin" className="text-xl font-bold text-[#432818]">Admin Dashboard</Link>
            <nav className="hidden md:flex space-x-4">
              <Link to="/admin/editor" className="text-[#8F7A6A] hover:text-[#432818]">
                Editor
              </Link>
              <Link to="/admin/quiz-builder" className="text-[#8F7A6A] hover:text-[#432818]">
                Quiz Builder
              </Link>
              <Link to="/admin/settings" className="text-[#8F7A6A] hover:text-[#432818]">
                Configurações
              </Link>
            </nav>
          </div>
          {user && (
            <div className="text-sm text-[#8F7A6A]">Olá, {user.userName}</div>
          )}
        </div>
      </header>
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-white border-t p-3 text-center text-sm text-[#8F7A6A]">
        <div className="container mx-auto">
          Admin Dashboard © {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
};

export default AdminLayout;
