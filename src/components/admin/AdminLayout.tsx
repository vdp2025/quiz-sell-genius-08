
import React, { ReactNode } from 'react';
import { useAuth } from '@/context/AuthContext';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b p-4 shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <div className="text-xl font-bold text-[#432818]">Admin Dashboard</div>
          {user && (
            <div className="text-sm text-[#8F7A6A]">Olá, {user.userName}</div>
          )}
        </div>
      </header>
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
};

export { AdminLayout };
export default AdminLayout;
