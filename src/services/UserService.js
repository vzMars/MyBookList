// const API_URL = 'https://api.mybooklist.vzmars.com/api';
const API_URL = 'https://localhost:7089/api';

export const getAllUsers = async () => {
  return fetch(`${API_URL}/user`, {
    method: 'GET',
    credentials: 'include',
  });
};

export const getUserProfile = (username) => {
  return fetch(`${API_URL}/user/${username}`, {
    method: 'GET',
    credentials: 'include',
  });
};
