export const getBooks = async (dispatch) => {
  const response = await fetch('http://localhost:5000/api/books', {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    dispatch({ type: 'SET_BOOKS', payload: [] });
  }

  if (response.ok) {
    const json = await response.json();
    dispatch({ type: 'SET_BOOKS', payload: json });
  }
};
