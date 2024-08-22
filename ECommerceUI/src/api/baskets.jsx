import api from "./apiClient";

const BASKETS_ENDPOINT = "/baskets"

export const getBasketItems = async () => {
  try {
    const response = await api.get(BASKETS_ENDPOINT, { requiresAuth: true })
    return response.data;
  } catch (error) {
    console.error('API isteği başarısız:', error);
  }
};

export const addItemToBasket = async (productId, quantity) => {
  try {
    const response = await api.post(BASKETS_ENDPOINT, { productId, quantity }, { requiresAuth: true, successMessage: 'Ürün sepete başarıyla eklendi!' })
    return response.data;
  } catch (error) {
    console.error('API isteği başarısız:', error);
  }
};

export const updateQuantity = async (basketItemId, quantity) => {
  try {
    const response = await api.put(BASKETS_ENDPOINT, { basketItemId, quantity }, { requiresAuth: true })
    return response.data;
  } catch (error) {
    console.error('API isteği başarısız:', error);
  }
};

export const removeBasketItem = async (basketItemId) => {
  try {
    const response = await api.delete(`${BASKETS_ENDPOINT}/${basketItemId}`, { requiresAuth: true })
    return response.data;
  } catch (error) {
    console.error('API isteği başarısız:', error);
  }
};
