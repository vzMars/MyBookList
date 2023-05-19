export const getBooks = async (dispatch) => {
  const response = await fetch(
    'https://mybooklist-api.onrender.com/api/books',
    {
      method: 'GET',
      credentials: 'include',
    }
  );

  if (!response.ok) {
    dispatch({ type: 'SET_BOOKS', payload: [] });
  }

  if (response.ok) {
    const json = await response.json();
    dispatch({ type: 'SET_BOOKS', payload: json });
  }
};
