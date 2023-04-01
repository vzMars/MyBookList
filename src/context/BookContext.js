import { createContext, useReducer, useEffect } from 'react';

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
    books: null,
    isLoading: true,
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
