import axios from 'axios';
import { showInfoToast, showErrorToast, showSuccessToast } from '../utils/toastUtils';
import AuthService from '../services/AuthService';

const API_URL = 'https://localhost:7041/api';

export const getAuthorizeDefinitonEnpoints = async () => {
  const token = await AuthService.getAccessToken();
  if(token){
    try {
      const response = await axios.get(`${API_URL}/ApplicationServices`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );

      if(response.status == 200) return response.data;
      else showErrorToast("Failed to fetch authorize definition endpoints. Please try again.");

    } catch (error) {
      showErrorToast("An error occurred. Please try again. (getAuthorizeDefinitonEnpoints)");
    }
  } else showInfoToast("(Unauthorization) Please log in!"); 
};

export const getRolesToEndpoint = async (code, menu) => {
  try {
    const params = {
      "Code": code,
      "Menu": menu
    }
    const response = await axios.get(`${API_URL}/AuthorizationEndpoints`, {
        params: params
      }
    )

    if (response.status === 200) return response.data;
    else showErrorToast("Roller çekilirken hatayla karşılaşıldı!")
    
  } catch (error) {
    showErrorToast("An error occurred. Please try again. (getRolesToEndpoint)");
  }
}

export const assingRoleEndpoint = async (roles, menu, code) => {
  try {
    const response = await axios.post(`${API_URL}/AuthorizationEndpoints`, { roles, menu, code })

    if(response.status === 200) showSuccessToast("Endpoint'e rol atama işlemi başarılı.");
    else showErrorToast("Endpoint'e rol atanırken bir hatayla karşılaşıldı!")

    
  } catch (error) {
    showErrorToast("An error occurred. Please try again. (assingRoleEndpoint)");
  }
}
  