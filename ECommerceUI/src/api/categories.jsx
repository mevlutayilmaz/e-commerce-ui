import api from "./apiClient";

const CATEGORIES_ENDPOINT = '/categories'

export const getRootCategories = async () => {
  try {
    const response = await api.get(`${CATEGORIES_ENDPOINT}/GetRootCategories`)
    return response.data;
  } catch (error) {
    console.error('API isteği başarısız:', error);
  }
};

export const getSubCategories = async (id) => {
  try {
    const response = await api.get(`${CATEGORIES_ENDPOINT}/GetSubCategories/${id}`)
    return response.data;
  } catch (error) {
    console.error('API isteği başarısız:', error);
  }
};

export const getAllCategories = async () => {
  try {
    const response = await api.get(`${CATEGORIES_ENDPOINT}/GetAllCategories`)
    return response.data;
  } catch (error) {
    console.error('API isteği başarısız:', error);
  }
};
