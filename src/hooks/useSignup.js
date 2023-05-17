import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useBookContext } from './useBookContext';
import { getBooks } from '../services/getBooks';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const { dispatch: bookDispatch } = useBookContext();

  const signup = async (email, userName, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, userName, password }),
    });

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

  return { signup, isLoading, error };
};

export default useSignup;
