import axios from "axios";
import AuthService from "../services/AuthService";
import { showErrorToast, showInfoToast, showSuccessToast } from "../utils/toastUtils";

const API_URL = "https://localhost:7041/api";

export const getBasketItems = async () => {
  const token = await AuthService.getAccessToken();
  if (token) {
    try {
      const response = await axios.get(`${API_URL}/Baskets`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      showErrorToast("An error occurred. Please try again. (getBasketItems)");
    }
  } else showInfoToast("(Unauthorization) Please log in!");
};

export const addItemToBasket = async (productId, quantity) => {
  const token = await AuthService.getAccessToken();
  if (token) {
    try {
      const response = await axios.post(
        `${API_URL}/Baskets`,
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) showSuccessToast("Item added to basket successfully!");
      else showErrorToast("Failed to add item. Please try again.");
      
    } catch (error) {
      showErrorToast("An error occurred. Please try again. (addItemToBasket)");
    }
  } else showInfoToast("(Unauthorization) Please log in!");
};

export const updateQuantity = async (basketItemId, quantity) => {
  const token = await AuthService.getAccessToken();
  if (token) {
    try {
      await axios.put(
        `${API_URL}/Baskets`,
        { basketItemId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      showErrorToast("An error occurred. Please try again. (updateQuantity)");
    }
  } else showInfoToast("(Unauthorization) Please log in!");
};

export const removeBasketItem = async (basketItemId) => {
  const token = await AuthService.getAccessToken();
  if (token) {
    try {
      await axios.delete(`${API_URL}/Baskets/${basketItemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      showErrorToast("An error occurred. Please try again. (removeBasketItem)");
    }
  } else showInfoToast("(Unauthorization) Please log in!");
};
