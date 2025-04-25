import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Sidebar, SidebarProvider } from '../ui/sidebar';
import { Home, Settings, ClipboardList, Edit, LogOut, BarChart3 } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();

  // Removido: autenticação e logout

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

              <Link 
                to="/admin/resultado-editor" 
                className={`flex items-center px-3 py-2 text-sm rounded-md ${
                  location.pathname.includes('/admin/resultado-editor') 
                    ? 'bg-[#FAF9F7] text-[#432818] font-medium' 
                    : 'text-[#8F7A6A] hover:bg-[#FAF9F7] hover:text-[#432818]'
                }`}
              >
                <Edit className="w-4 h-4 mr-3" />
                Editor de Resultado
              </Link>

              <Link 
                to="/admin/utm-analytics" 
                className={`flex items-center px-3 py-2 text-sm rounded-md ${
                  location.pathname.includes('/admin/utm-analytics') 
                    ? 'bg-[#FAF9F7] text-[#432818] font-medium' 
                    : 'text-[#8F7A6A] hover:bg-[#FAF9F7] hover:text-[#432818]'
                }`}
              >
                <BarChart3 className="w-4 h-4 mr-3" />
                UTM Analytics
              </Link>
              
              <p className="px-3 pt-5 pb-2 text-xs font-medium text-[#B89B7A] uppercase">
                Configurações
              </p>
              
              <Link 
                to="/admin/settings" 
                className={`flex items-center px-3 py-2 text-sm rounded-md ${
                  location.pathname === '/admin/settings' 
                    ? 'bg-[#FAF9F7] text-[#432818] font-medium' 
                    : 'text-[#8F7A6A] hover:bg-[#FAF9F7] hover:text-[#432818]'
                }`}
              >
                <Settings className="w-4 h-4 mr-3" />
                Configurações
              </Link>
            </div>
          </div>
          {/* Removido: botão de logout */}
        </Sidebar>
        <main className="flex-1 overflow-auto bg-[#FAF9F7]">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;