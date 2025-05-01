
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simples validação para demonstração
    if (email === 'admin@example.com' && password === 'admin123') {
      // Login como admin
      login('Admin', true);
      navigate('/admin');
    } else if (email && password) {
      // Login como usuário normal
      login(email.split('@')[0]);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF7F3]">
      <Card className="w-[350px] bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-playfair text-[#432818]">Login</CardTitle>
          <CardDescription>
            Entre com suas credenciais para acessar o sistema.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  placeholder="seu-email@exemplo.com" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Senha</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="********" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <Button className="w-full mt-6 bg-[#B89B7A] hover:bg-[#9A7D5D]" type="submit">
              Entrar
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center text-xs text-muted-foreground">
          <p>Para fins de teste:</p>
          <p>Admin: admin@example.com / admin123</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
