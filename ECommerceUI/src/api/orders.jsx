import axios from "axios";
import AuthService from "../services/AuthService";
import {
  showErrorToast,
  showSuccessToast,
  showInfoToast,
} from "../utils/toastUtils";

const API_URL = "https://localhost:7041/api";

export const getAllOrders = async (pageCount, itemCount) => {
  const token = await AuthService.getAccessToken();
  if (token) {
    try {
      const response = await axios.get(
        `${API_URL}/Orders?pageCount=${pageCount}&itemCount=${itemCount}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) return response.data;
      else showErrorToast("Failed to fetch products. Please try again.");
    } catch (error) {
      showErrorToast("An error occurred. Please try again. (getAllOrders)");
    }
  } else showInfoToast("(Unauthorization) Please log in!");
};

export const createOrder = async (description, address) => {
  const token = await AuthService.getAccessToken();
  if (token) {
    try {
      const response = await axios.post(
        `${API_URL}/Orders`,
        { description, address },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) showSuccessToast("Siparişiniz oluşturuldu.");
      else showErrorToast("Failed to create order. Please try again.");

    } catch (error) {
      showErrorToast("An error occurred. Please try again. (createOrder)");
    }
  } else showInfoToast("(Unauthorization) Please log in!");
};

export const getOrderById = async (id) => {
  const token = await AuthService.getAccessToken();
  if(token){
    try {
      const response = await axios.get(`${API_URL}/Orders/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }        
      )

      if (response.status === 200) return response.data
      else showErrorToast("Failed to fetch order. Please try again.");

    } catch (error) {
      showErrorToast("An error occurred. Please try again. (getOrderById)");
    }
  } else showInfoToast("(Unauthorization) Please log in!"); 
}

export const completeOrder = async (id) => {
  const token = await AuthService.getAccessToken();
  if(token){
    try {
      const response = await axios.get(`${API_URL}/Orders/complete-order/${id}`, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      )

      if (response.status === 200) {
        showSuccessToast("Sipariş başarılı bir şekilde tamamlandı. Bilgilendirme için email adresini kontrol et.")
        return true
      }
      else showErrorToast("Failed to complete order. Please try again.");

    } catch (error) {
      showErrorToast("An error occurred. Please try again. (completeOrder)");
    }
  } else showInfoToast("(Unauthorization) Please log in!"); 
}
