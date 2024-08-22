import { showInfoToast } from '../utils/toastUtils';
import api from './apiClient';

const AUTH_ENDPOINT = '/auth';

export const login = async (userNameOrEmail, password) => {
  try {
    const response = await api.post(`${AUTH_ENDPOINT}/Login`, { userNameOrEmail, password })
    return response.data;
  } catch (error) {
    console.error('API isteği başarısız:', error);
  }
};

export const refreshTokenLogin = async (refreshToken) => {
  try {
    const response = await api.post(`${AUTH_ENDPOINT}/RefreshTokenLogin`, { refreshToken })
    return response.data;
  } catch (error) {
    console.error('API isteği başarısız:', error);
  }
};

export const passwordReset = async (email) => {
  try {
    const response = await api.post(`${AUTH_ENDPOINT}/password-reset`, { email })
    showInfoToast("Mail adresinizi kontrol ediniz!")
    return response.data;
  } catch (error) {
    console.error('API isteği başarısız:', error);
  }
}

export const verifyResetToken = async (resetToken, userId) => {
  try {
    const response = await api.post(`${AUTH_ENDPOINT}/verify-reset-token`, { resetToken, userId })
    return response.data;
  } catch (error) {
    console.error('API isteği başarısız:', error);
  }
}
