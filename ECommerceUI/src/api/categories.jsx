import axios from "axios";

const API_URL = "https://localhost:7041/api";

export const getRootCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/Categories/GetRootCategories`);
    return response.data;
  } catch (error) {}
};

export const getSubCategories = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/Categories/GetSubCategories/${id}`);
    return response.data;
  } catch (error) {}
};

export const getAllCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/Categories/GetAllCategories`);
    return response.data;
  } catch (error) {}
};
