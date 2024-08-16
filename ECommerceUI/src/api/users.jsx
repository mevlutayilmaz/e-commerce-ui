import axios from 'axios';

const API_URL = 'https://localhost:7041/api';

export const signup = async (nameSurname, username, email, password, passwordConfirm) => {
  const response = await axios.post(`${API_URL}/Users/CreateUser`, { nameSurname, username, email, password, passwordConfirm });
  return response.data;
};