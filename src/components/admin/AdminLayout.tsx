
import React from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Sidebar, SidebarProvider } from '../ui/sidebar';
import { Home, Settings, ClipboardList } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { user } = useAuth();
  const location = useLocation();

  // Para aplicações em produção, você deve verificar se o usuário tem permissão de administrador
  const isAuthenticated = true; 

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar className="w-64 border-r border-[#B89B7A]/20 bg-white">
          <div className="p-6">
            <Link to="/admin" className="flex items-center">
              <h2 className="text-xl font-playfair text-[#432818]">Painel de Admin</h2>
            </Link>
          </div>
          <div className="px-3">
            <div className="space-y-1">
              <Link 
                to="/admin" 
                className={`flex items-center px-3 py-2 text-sm rounded-md ${
                  location.pathname === '/admin' 
                    ? 'bg-[#FAF9F7] text-[#432818] font-medium' 
                    : 'text-[#8F7A6A] hover:bg-[#FAF9F7] hover:text-[#432818]'
                }`}
              >
                <Home className="w-4 h-4 mr-3" />
                Dashboard
              </Link>
              
              <Link 
                to="/admin/quiz-builder" 
                className={`flex items-center px-3 py-2 text-sm rounded-md ${
                  location.pathname.includes('/admin/quiz-builder') 
                    ? 'bg-[#FAF9F7] text-[#432818] font-medium' 
                    : 'text-[#8F7A6A] hover:bg-[#FAF9F7] hover:text-[#432818]'
                }`}
              >
                <ClipboardList className="w-4 h-4 mr-3" />
                Editor do Quiz
              </Link>
              
              <p className="px-3 pt-5 pb-2 text-xs font-medium text-[#B89B7A] uppercase">
                Configurações
              </p>
              
              <Link 
                to="/admin/settings" 
                className="flex items-center px-3 py-2 text-sm text-[#8F7A6A] rounded-md hover:bg-[#FAF9F7] hover:text-[#432818]"
              >
                <Settings className="w-4 h-4 mr-3" />
                Configurações
              </Link>
              
              <a 
                href="/" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-3 py-2 text-sm text-[#8F7A6A] rounded-md hover:bg-[#FAF9F7] hover:text-[#432818]"
              >
                <ClipboardList className="w-4 h-4 mr-3" />
                Ver Quiz
              </a>
            </div>
          </div>
        </Sidebar>
        <main className="flex-1 overflow-auto bg-[#FAF9F7]">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
