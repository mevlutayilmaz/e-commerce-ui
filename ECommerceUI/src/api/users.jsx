import axios from 'axios';
import AuthService from '../services/AuthService'
import {showErrorToast, showInfoToast, showSuccessToast} from '../utils/toastUtils'

const API_URL = 'https://localhost:7041/api';

export const signup = async (nameSurname, username, email, password, passwordConfirm) => {
  const response = await axios.post(`${API_URL}/Users/CreateUser`, { nameSurname, username, email, password, passwordConfirm });
  return response.data;
};

export const getAllUsers = async(pageCount, itemCount) => {
  const token = await AuthService.getAccessToken();
  if(token){
    try {
      const response = await axios.get(`${API_URL}/Users?pageCount=${pageCount}&itemCount=${itemCount}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );

      if (response.status === 200) return response.data;
      else showErrorToast("Failed to fetch users. Please try again.");
      
    } catch (error) {
      showErrorToast("An error occurred. Please try again. (getAllUsers)");
    }
  } else showInfoToast("(Unauthorization) Please log in!");
}

export const removeUser = async (id) => {
  const token = await AuthService.getAccessToken();
  if(token){
    try {
      const response = await axios.delete(`${API_URL}/Users/${id}`, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );

      if (response.status === 200) showSuccessToast("Silme işlemi başarılı.");
      else showErrorToast("Failed to remove user. Please try again.");

    } catch (error) {
      showErrorToast("An error occurred. Please try again. (removeUser)");
    }
  }else showInfoToast("(Unauthorization) Please log in!");
}

export const updatePassword = async (userId, resetToken, newPassword, passwordConfirm) => {
  try {
    const response = await axios.post(`${API_URL}/Users/update-password`, {userId, resetToken, newPassword, passwordConfirm})
    return response
  } catch (error) {
  }
}