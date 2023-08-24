import { createContext, useReducer, useEffect } from 'react';
import { getBooks } from '../services/BookService';
import Loader from '../components/Loader';

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
          book.id === action.payload.id &&
          book.user.id === action.payload.user.id
            ? action.payload
            : book
        ),
        isLoading: false,
      };
    case 'DELETE_BOOK':
      return {
        books: state.books.filter(
          (book) =>
            !(
              book.id === action.payload.id &&
              book.user.id === action.payload.user.id
            )
        ),
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
    getBooks().then((books) => dispatch({ type: 'SET_BOOKS', payload: books }));
  }, []);

  return (
    <>
      {state.isLoading ? (
        <Loader />
      ) : (
        <BookContext.Provider value={{ ...state, dispatch }}>
          {children}
        </BookContext.Provider>
      )}
    </>
  );
};
