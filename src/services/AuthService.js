const API_URL = 'https://api.mybooklist.vzmars.com/api';
// const API_URL = 'http://localhost:8080/api';

export const isAuthenticated = () => {
  return fetch(`${API_URL}/auth`, {
    method: 'GET',
    credentials: 'include',
  });
};

export const userLogin = (email, password) => {
  return fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });
};

export const userLogout = () => {
  return fetch(`${API_URL}/auth/logout`, {
    method: 'GET',
    credentials: 'include',
  });
};

export const userSignup = (email, userName, password) => {
  return fetch(`${API_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ email, userName, password }),
  });
};
