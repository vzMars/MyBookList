import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useBookContext } from './useBookContext';
import { getBooks } from '../services/getBooks';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const { dispatch: bookDispatch } = useBookContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      'https://api.mybooklist.vzmars.com/api/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      dispatch({ type: 'LOGIN', payload: json.user });
      getBooks(bookDispatch);
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
