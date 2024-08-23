import api from "./apiClient";

const ORDERS_ENDPOINT = '/orders'

export const getAllOrders = async (pageCount, itemCount) => {
  try {
    const response = await api.get(ORDERS_ENDPOINT, { params: { pageCount, itemCount }, requiresAuth: true })
    return response.data;
  } catch (error) {
    console.error('API isteği başarısız:', error);
  }
};

export const createOrder = async (description, address) => {
  try {
    const response = await api.post(ORDERS_ENDPOINT, { description, address }, { requiresAuth: true, successMessage: 'Siparişiniz oluşturuldu!' })
    return response.data;
  } catch (error) {
    console.error('API isteği başarısız:', error);
  }
};

export const getOrderById = async (id) => {
  try {
    const response = await api.get(`${ORDERS_ENDPOINT}/${id}`, { requiresAuth: true })
    return response.data;
  } catch (error) {
    console.error('API isteği başarısız:', error);
  }
}

export const completeOrder = async (id) => {
  try {
    const response = await api.get(`${ORDERS_ENDPOINT}/complete-order/${id}`, { requiresAuth: true, successMessage: 'Sipariş başarılı bir şekilde tamamlandı. Bilgilendirme için email adresinizi kontrol ediniz.' })
    return response.data;
  } catch (error) {
    console.error('API isteği başarısız:', error);
  }
}
