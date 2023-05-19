import { createContext, useReducer, useEffect } from 'react';

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
    const getAuthStatus = async () => {
      const response = await fetch(
        'https://api.mybooklist.vzmars.com/api/auth',
        {
          method: 'GET',
          credentials: 'include',
        }
      );

      const json = await response.json();

      dispatch({ type: 'LOGIN', payload: json.user });
    };

    getAuthStatus();
  }, []);

  return (
    <>
      {state.isLoading ? (
        <span className='loader'></span>
      ) : (
        <AuthContext.Provider value={{ ...state, dispatch }}>
          {children}
        </AuthContext.Provider>
      )}
    </>
  );
};
