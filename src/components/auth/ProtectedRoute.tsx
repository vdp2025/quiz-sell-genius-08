
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const ProtectedRoute = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  // Se não estiver autenticado, redireciona para a página de login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Se não for admin, redireciona para a página principal
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Se estiver autenticado e for admin, renderiza as rotas filhas
  return <Outlet />;
};

export default ProtectedRoute;
