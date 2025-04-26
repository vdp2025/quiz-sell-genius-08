import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  PencilRuler, 
  PanelTop, 
  BarChart4, 
  Settings,
  Layers 
} from 'lucide-react';

const navLinks = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: <LayoutDashboard className="w-5 h-5" />
  },
  {
    title: 'Editor Unificado',
    href: '/admin/editor-unificado',
    icon: <Layers className="w-5 h-5" />,
    highlight: true
  },
  {
    title: 'Construtor de Quiz',
    href: '/admin/quiz-builder',
    icon: <PencilRuler className="w-5 h-5" />
  },
  {
    title: 'Editor de Resultado',
    href: '/admin/editor-resultado',
    icon: <PanelTop className="w-5 h-5" />
  },
  {
    title: 'UTM Analytics',
    href: '/admin/utm-analytics',
    icon: <BarChart4 className="w-5 h-5" />
  },
  {
    title: 'Configurações',
    href: '/admin/settings',
    icon: <Settings className="w-5 h-5" />
  }
];

export function AdminNavigation() {
  return (
    <div className="h-full flex flex-col bg-[#1A1F2C] text-white">
      <div className="p-4 border-b border-[#2A2F3E]">
        <h1 className="text-xl font-bold">Quiz Admin</h1>
      </div>
      
      <nav className="flex-1 overflow-auto py-6 px-3">
        <ul className="space-y-1">
          {navLinks.map((link, index) => (
            <li key={index}>
              <NavLink
                to={link.href}
                className={({ isActive }) => 
                  cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 transition-colors",
                    isActive 
                      ? "bg-[#9b87f5] text-white" 
                      : "text-gray-400 hover:bg-[#2A2F3E] hover:text-white",
                    link.highlight && !isActive ? "border border-[#9b87f5]/50 text-[#9b87f5]" : ""
                  )
                }
              >
                {link.icon}
                <span>{link.title}</span>
                {link.highlight && (
                  <span className="ml-auto text-xs bg-[#9b87f5]/20 text-[#9b87f5] px-1.5 py-0.5 rounded">Novo</span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-[#2A2F3E]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#9b87f5]"></div>
          <div>
            <p className="text-sm font-medium">Administrador</p>
            <p className="text-xs text-gray-400">admin@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
} 