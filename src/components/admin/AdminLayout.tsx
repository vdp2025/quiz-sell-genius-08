
import React, { ReactNode } from 'react';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      <header className="bg-white border-b border-[#B89B7A]/20 h-16 flex items-center px-6">
        <h1 className="text-xl font-medium text-[#432818]">Admin Panel</h1>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default AdminLayout;
