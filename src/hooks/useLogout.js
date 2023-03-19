import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = async () => {
    const response = await fetch('http://localhost:5000/api/auth/logout', {
      method: 'GET',
      credentials: 'include',
    });

    if (response.ok) {
      dispatch({ type: 'LOGOUT' });
    }
  };

  return { logout };
};
