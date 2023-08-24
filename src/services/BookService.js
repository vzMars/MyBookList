const API_URL = 'https://api.mybooklist.vzmars.com/api';
// const API_URL = 'http://localhost:8080/api';

export const getBooks = async () => {
  try {
    const response = await fetch(`${API_URL}/books`, {
      method: 'GET',
      credentials: 'include',
    });

    const json = await response.json();

    return json;
  } catch (err) {
    return [];
  }
};

export const bookSearch = (query) => {
  return fetch(`${API_URL}/books/search/${query}`, {
    method: 'GET',
    credentials: 'include',
  });
};

export const getUserProfile = (userName) => {
  return fetch(`${API_URL}/books/user/${userName}`, {
    method: 'GET',
    credentials: 'include',
  });
};

export const removeBook = (id) => {
  return fetch(`${API_URL}/books/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
};

export const updateBookStatus = (id, updatedStatus) => {
  return fetch(`${API_URL}/books/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updatedStatus),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
};

export const getBookDetails = (id) => {
  return fetch(`${API_URL}/books/${id}`, {
    method: 'GET',
    credentials: 'include',
  });
};

export const addNewBook = (book) => {
  return fetch(`${API_URL}/books`, {
    method: 'POST',
    body: JSON.stringify(book),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
};
