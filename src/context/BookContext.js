import { createContext, useReducer, useEffect } from 'react';
import { getBooks } from '../services/getBooks';

export const BookContext = createContext();

export const bookReducer = (state, action) => {
  switch (action.type) {
    case 'SET_BOOKS':
      return {
        books: action.payload,
        isLoading: false,
      };
    case 'ADD_BOOK':
      return {
        books: [...state.books, action.payload],
        isLoading: false,
      };
    case 'UPDATE_BOOK':
      return {
        books: state.books.map((book) =>
          book._id === action.payload._id ? action.payload : book
        ),
        isLoading: false,
      };
    case 'DELETE_BOOK':
      return {
        books: state.books.filter((book) => book._id !== action.payload._id),
        isLoading: false,
      };
    default:
      return state;
  }
};

export const BookProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookReducer, {
    books: [],
    isLoading: true,
  });

  useEffect(() => {
    getBooks(dispatch);
  }, []);

  return (
    <>
      {state.isLoading ? (
        <span className='loader'></span>
      ) : (
        <BookContext.Provider value={{ ...state, dispatch }}>
          {children}
        </BookContext.Provider>
      )}
    </>
  );
};
