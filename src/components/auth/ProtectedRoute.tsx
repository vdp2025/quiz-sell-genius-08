
import { Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // Automatically allows access without authentication check
  return <Outlet />;
};

export default ProtectedRoute;
