import { createContext, useReducer, useEffect } from 'react';

export const BookContext = createContext();

export const bookReducer = (state, action) => {
  switch (action.type) {
    case 'SET_BOOKS':
      return {
        books: action.payload,
      };
    case 'ADD_BOOK':
      return {
        books: [action.payload, ...state.books],
      };
    default:
      return state;
  }
};

export const BookProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookReducer, {
    books: null,
  });

  useEffect(() => {
    const getBooks = async () => {
      const response = await fetch('http://localhost:5000/api/books', {
        method: 'GET',
        credentials: 'include',
      });

      const json = await response.json();

      dispatch({ type: 'SET_BOOKS', payload: json });
    };

    getBooks();
  }, []);

  return (
    <BookContext.Provider value={{ ...state, dispatch }}>
      {children}
    </BookContext.Provider>
  );
};
