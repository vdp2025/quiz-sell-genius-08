
import React from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Sidebar, SidebarProvider } from '../ui/sidebar';
import { Home, Settings, ClipboardList, Edit, LogOut } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { user, isAdmin, logout } = useAuth();
  const location = useLocation();

  if (!user || !isAdmin) {
    toast({
      title: "Access Denied",
      description: "You must be logged in as an admin to access this area.",
      variant: "destructive"
    });
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive"
      });
    }
  };

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
          <div className="mt-auto p-4">
            <button
              onClick={handleLogout}
              className="flex items-center px-3 py-2 text-sm text-[#8F7A6A] rounded-md hover:bg-[#FAF9F7] hover:text-[#432818] w-full"
            >
              <LogOut className="w-4 h-4 mr-3" />
              Sign Out
            </button>
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
