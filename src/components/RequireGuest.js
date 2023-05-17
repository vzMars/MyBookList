import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const RequireGuest = () => {
  const { user } = useAuthContext();
  return !user ? <Outlet /> : <Navigate to='/' />;
};

export default RequireGuest;
