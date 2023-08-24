import { userLogout } from '../services/AuthService';
import { useAuthContext } from './useAuthContext';
import { useBookContext } from './useBookContext';

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: bookDispatch } = useBookContext();

  const logout = async () => {
    const response = await userLogout();

    if (response.ok) {
      dispatch({ type: 'LOGOUT' });
      bookDispatch({ type: 'SET_BOOKS', payload: [] });
    }
  };

  return { logout };
};
