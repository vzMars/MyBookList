import { createContext, useReducer, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

export const BookContext = createContext();

export const bookReducer = (state, action) => {
  switch (action.type) {
    case 'SET_BOOKS':
      return {
        books: action.payload,
      };
    case 'ADD_BOOK':
      return {
        books: [...state.books, action.payload],
      };
    case 'UPDATE_BOOK':
      return {
        books: state.books.map((book) =>
          book._id === action.payload._id ? action.payload : book
        ),
      };
    case 'DELETE_BOOK':
      return {
        books: state.books.filter((book) => book._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const BookProvider = ({ children }) => {
  const { user } = useAuthContext();
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

      if (response.ok) {
        dispatch({ type: 'SET_BOOKS', payload: json });
      }
    };

    if (user) {
      getBooks();
    }
  }, [user]);

  return (
    <BookContext.Provider value={{ ...state, dispatch }}>
      {children}
    </BookContext.Provider>
  );
};
