import { createContext, useReducer, useEffect } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        user: null,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useEffect(() => {
    const getAuthStatus = async () => {
      const response = await fetch('http://localhost:5000/api/auth', {
        method: 'GET',
        credentials: 'include',
      });

      const json = await response.json();

      dispatch({ type: 'LOGIN', payload: json.user });
    };

    getAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
