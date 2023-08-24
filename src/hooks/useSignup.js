import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useBookContext } from './useBookContext';
import { getBooks } from '../services/BookService';
import { userSignup } from '../services/AuthService';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const { dispatch: bookDispatch } = useBookContext();

  const signup = async (email, userName, password) => {
    setIsLoading(true);
    setError(null);

    const response = await userSignup(email, userName, password);
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      const books = await getBooks();
      dispatch({ type: 'LOGIN', payload: json.user });
      bookDispatch({ type: 'SET_BOOKS', payload: books });
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};

export default useSignup;
