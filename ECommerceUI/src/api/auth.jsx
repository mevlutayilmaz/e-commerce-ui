import axios from 'axios';
import { showInfoToast } from '../utils/toastUtils';

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

export const passwordReset = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/Auth/password-reset`, {email})
    if(response.status === 200) showInfoToast("Mail adresini kontrol et!")
  } catch (error) {
  }
}

export const verifyResetToken = async (resetToken, userId) => {
  try {
    const response = await axios.post(`${API_URL}/Auth/verify-reset-token`, {resetToken, userId})
    return response.data    
  } catch (error) {
  }
}
