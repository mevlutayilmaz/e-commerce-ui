import axios from "axios";
import AuthService from "../services/AuthService";

const API_URL = "https://localhost:7041/api";

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

      return response.data;
    } catch (error) {
      console.error("Basket items fetch error:", error);
    }
  }
};
