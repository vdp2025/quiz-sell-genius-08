
import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleAdminAccess = () => {
    // Auto-login as admin
    login('Admin', true);
    navigate('/admin');
  };

  const handleUserAccess = () => {
    // Auto-login as regular user
    login('User');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF7F3]">
      <Card className="w-[350px] bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-playfair text-[#432818]">Acesso</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            className="w-full bg-[#B89B7A] hover:bg-[#9A7D5D]" 
            onClick={handleAdminAccess}
          >
            Continuar como Admin
          </Button>
          <Button 
            className="w-full bg-[#d1bca4] hover:bg-[#c0ab93]" 
            onClick={handleUserAccess}
          >
            Continuar como Usuário
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
