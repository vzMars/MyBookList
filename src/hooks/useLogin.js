import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useBookContext } from './useBookContext';
import { userLogin } from '../services/AuthService';
import { getBooks } from '../services/BookService';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const { dispatch: bookDispatch } = useBookContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await userLogin(email, password);
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.message);
    }

    if (response.ok) {
      const books = await getBooks();
      dispatch({ type: 'LOGIN', payload: json.user });
      bookDispatch({ type: 'SET_BOOKS', payload: books });
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
