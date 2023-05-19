import { useAuthContext } from './useAuthContext';
import { useBookContext } from './useBookContext';

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: bookDispatch } = useBookContext();

  const logout = async () => {
    const response = await fetch('mybooklist-api.fly.dev/api/auth/logout', {
      method: 'GET',
      credentials: 'include',
    });

    if (response.ok) {
      dispatch({ type: 'LOGOUT' });
      bookDispatch({ type: 'SET_BOOKS', payload: [] });
    }
  };

  return { logout };
};
