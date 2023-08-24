import { createContext, useReducer, useEffect } from 'react';
import { isAuthenticated } from '../services/AuthService';
import Loader from '../components/Loader';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        user: action.payload,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        user: null,
        isLoading: false,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isLoading: true,
  });

  useEffect(() => {
    isAuthenticated()
      .then((res) => res.json())
      .then((json) => {
        if (json.user === null) throw new Error();
        dispatch({ type: 'LOGIN', payload: json.user });
      })
      .catch(() => {
        dispatch({ type: 'LOGOUT' });
      });
  }, []);

  return (
    <>
      {state.isLoading ? (
        <Loader />
      ) : (
        <AuthContext.Provider value={{ ...state, dispatch }}>
          {children}
        </AuthContext.Provider>
      )}
    </>
  );
};
