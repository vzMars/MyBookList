const API_URL = 'https://api.mybooklist.vzmars.com/api';
// const API_URL = 'http://localhost:8080/api';

export const getAllUsers = async () => {
  return fetch(`${API_URL}/auth/users`, {
    method: 'GET',
    credentials: 'include',
  });
};
