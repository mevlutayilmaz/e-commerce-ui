import axios from 'axios';

const API_URL = 'https://localhost:7041/api';

export const login = async (userNameOrEmail, password) => {
  try {
    const response = await axios.post(`${API_URL}/Auth/Login`, { userNameOrEmail, password });
    return response.data;
  } catch (error) {
    console.error("login error: ", error)
  }
};

export const refreshTokenLogin = async (refreshToken) => {
  try {
    const response = await axios.post(`${API_URL}/Auth/RefreshTokenLogin`, { refreshToken });
    return response.data;
  } catch (error) {
  }
};
