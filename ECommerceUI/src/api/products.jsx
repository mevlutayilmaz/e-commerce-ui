import axios from 'axios';
import AuthService from "../services/AuthService";
import { showErrorToast, showSuccessToast, showInfoToast } from '../utils/toastUtils';

const API_URL = 'https://localhost:7041/api';

export const getAllProduct = async (pageCount, itemCount, categoryId, sortBy, isAscending) => {
  try {
    const params = {
      "pageCount": pageCount,
      "itemCount": itemCount,
      ...(sortBy && {"sortBy": sortBy}),
      ...(isAscending != null && {"isAscending": isAscending}),
      ...(categoryId && { "categoryId": categoryId })
    };
    const response = await axios.get(`${API_URL}/Products/GetAllProduct`, {
      params: params
    });

    if(response.status !== 200) showErrorToast("Failed to fetch products. Please try again.")
    else return response.data;
  } catch (error) {
    showErrorToast("Failed to fetch products. Please try again.")
  }
};

export const getProductById = async (id) => {
  const response = await axios.get(`${API_URL}/Products/GetProduct/${id}`);
  return response.data;
};

export const searchProduct = async (pageCount, itemCount, query) => {
  try {
    const params = {
      "pageCount": pageCount,
      "itemCount": itemCount,
      "query": query
    };
    const response = await axios.get(`${API_URL}/Products/SearchProduct`, {
      params: params
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const createProduct = async (name, brand, modelNo, price, categoryId, imageUrl) => {
  const token = await AuthService.getAccessToken();
  if(token){
    const product = {
      name,
      brand,
      modelNo,
      price,
      categoryId,
      imageUrl
    }
    
    try {
      const response = await axios.post(`${API_URL}/Products/CreateProduct`, 
        { product },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) showSuccessToast("The product was created successfully!");
      else showErrorToast("Failed to create product. Please try again.");

    } catch (error) {
      showErrorToast("An error occurred. Please try again. (createProduct)");
    }
  } else showInfoToast("(Unauthorization) Please log in!");
}

export const removeProduct = async (id) => {
  const token = await AuthService.getAccessToken();
  if(token) {
    try {
      const response = await axios.delete(`${API_URL}/Products/RemoveProduct/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) showSuccessToast("The product was deleted successfully!");
      else showErrorToast("Failed to delete product. Please try again.");
    } catch (error) {
      showErrorToast("An error occurred. Please try again. (removeProduct)");
    }
  } else showInfoToast("(Unauthorization) Please log in!");
}

export const updateProduct = async (id, price) => {
  const token = await AuthService.getAccessToken();
  if(token) {
    try {
      console.log(id, price);
      
      const response = await axios.put(`${API_URL}/Products/UpdateProduct`,
        {id, price},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) showSuccessToast("The product was updated successfully!");
      else showErrorToast("Failed to update product. Please try again.");
    } catch (error) {
      showErrorToast("An error occurred. Please try again. (updateProduct)");
    }
  } else showInfoToast("(Unauthorization) Please log in!");
}
