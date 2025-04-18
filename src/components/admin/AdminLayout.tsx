
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Sidebar, SidebarProvider } from '../ui/sidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { user } = useAuth();
  const location = useLocation();

  // Para fins de desenvolvimento, vamos desabilitar temporariamente a proteção de rota
  // para que possamos acessar o editor sem autenticação
  const isAuthenticated = true; // Temporariamente permitindo acesso

  // Protect admin routes - redirect to home if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar className="w-64 border-r border-[#B89B7A]/20 bg-white">
          <div className="p-4">
            <h2 className="text-lg font-semibold text-[#432818]">Admin Panel</h2>
          </div>
          <nav className="px-2 py-2">
            <a 
              href="/admin/editor" 
              className="flex items-center px-4 py-2 text-sm text-[#432818] hover:bg-[#FAF9F7] rounded-md"
            >
              Editor de Páginas
            </a>
          </nav>
        </Sidebar>
        <main className="flex-1 overflow-auto bg-[#FAF9F7]">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
