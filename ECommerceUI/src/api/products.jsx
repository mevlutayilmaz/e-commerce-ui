import api from './apiClient';

const PRODUCTS_ENDPOINT = "/products"

export const getAllProduct = async (pageCount, itemCount, categoryId, sortBy, isAscending) => {
  try {
    const params = {
      "pageCount": pageCount,
      "itemCount": itemCount,
      ...(sortBy && {"sortBy": sortBy}),
      ...(isAscending != null && {"isAscending": isAscending}),
      ...(categoryId && { "categoryId": categoryId })
    };

    const response = await api.get(`${PRODUCTS_ENDPOINT}/GetAllProduct`, { params })
    return response.data;
  } catch (error) {
    console.error('API isteği başarısız:', error);
  }
};

export const getProductById = async (id) => {
  try {
    const response = await api.get(`${PRODUCTS_ENDPOINT}/GetProduct/${id}`)
    return response.data;
  } catch (error) {
    console.error('API isteği başarısız:', error);
  }
};

export const searchProduct = async (pageCount, itemCount, query) => {
  try {
    const params = {
      "pageCount": pageCount,
      "itemCount": itemCount,
      "query": query
    };

    const response = await api.get(`${PRODUCTS_ENDPOINT}/SearchProduct`, { params })
    return response.data;
  } catch (error) {
    console.error('API isteği başarısız:', error);
  }
};

export const createProduct = async (name, brand, modelNo, price, categoryId, imageUrl) => {
  try {
    const product = {
      name,
      brand,
      modelNo,
      price,
      categoryId,
      imageUrl
    }

    const response = await api.post(`${PRODUCTS_ENDPOINT}/CreateProduct`, { product }, { requiresAuth: true, successMessage: 'Ürün oluşturma işlemi başarılı!' })
    return response.data;
  } catch (error) {
    console.error('API isteği başarısız:', error);
  }
}

export const removeProduct = async (id) => {
  try {
    const response = await api.delete(`${PRODUCTS_ENDPOINT}/RemoveProduct/${id}`, { requiresAuth: true, successMessage: 'Ürün silme işlemi başarılı!' })
    return response.data;
  } catch (error) {
    console.error('API isteği başarısız:', error);
  }
}

export const updateProduct = async (id, price) => {
  try {
    const response = await api.put(`${PRODUCTS_ENDPOINT}/UpdateProduct`, { id, price }, { requiresAuth: true, successMessage: 'Ürün güncelleme işlemi başarılı!' })
    return response.data;
  } catch (error) {
    console.error('API isteği başarısız:', error);
  }
}
