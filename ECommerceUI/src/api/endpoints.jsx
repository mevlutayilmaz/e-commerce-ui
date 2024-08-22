import api from './apiClient';

const APP_ENDPOINT = '/ApplicationServices';
const ENDPOINTS_ENDPOINT = '/AuthorizationEndpoints';

export const getAuthorizeDefinitonEnpoints = async () => {
  try {
    const response = await api.get(APP_ENDPOINT, { requiresAuth: true })
    return response.data;
  } catch (error) {
    console.error('API isteği başarısız:', error);
  }
};

export const getRolesToEndpoint = async (code, menu) => {
  try {
    const response = await api.get(ENDPOINTS_ENDPOINT, { params: { code, menu } })
    return response.data;
  } catch (error) {
    console.error('API isteği başarısız:', error);
  }
}

export const assingRoleEndpoint = async (roles, menu, code) => {
  try {
    const response = await api.post(ENDPOINTS_ENDPOINT, { roles, menu, code }, { successMessage: "Endpoint'e rol atama işlemi başarılı!" })
    return response.data;
  } catch (error) {
    console.error('API isteği başarısız:', error);
  }
}
  