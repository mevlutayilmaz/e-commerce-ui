import { showSuccessToast, showWarningToast } from "../utils/toastUtils";
import api from "./apiClient";

const ROLES_ENPOINT = '/roles'

export const getAllRoles = async (pageCount, itemCount) => {
  try {
    const response = await api.get(`${ROLES_ENPOINT}/GetAllRoles`, { params: { pageCount, itemCount }, requiresAuth: true })
    return response.data;
  } catch (error) {
    console.error('API isteği başarısız:', error);
  }
};

export const getRoleById = async (id) => {
  try {
    const response = await api.get(`${ROLES_ENPOINT}/GetRoleById/${id}`, { requiresAuth: true })
    return response.data;
  } catch (error) {
    console.error('API isteği başarısız:', error);
  }
};

export const createRole = async (name) => {
  try {
    const response = await api.post(ROLES_ENPOINT, { name }, { requiresAuth: true })
    response.data.succeeded
      ? showSuccessToast("Rol oluşturuldu.")
      : showWarningToast("Rol oluşturulurken bir hatayla karşılaşıldı!");
    return response.data;
  } catch (error) {
    console.error('API isteği başarısız:', error);
  }
};

export const removeRole = async (id) => {
  try {
    const response = await api.delete(`${ROLES_ENPOINT}/${id}`, { requiresAuth: true })
    response.data.succeeded
      ? showSuccessToast("Rol silindi.")
      : showWarningToast("Rol silinirken bir hatayla karşılaşıldı!");
    return response.data;
  } catch (error) {
    console.error('API isteği başarısız:', error);
  }
};

export const updateRole = async (id, name) => {
  try {
    const response = await api.put(ROLES_ENPOINT, { id, name }, { requiresAuth: true })
    response.data.succeeded
      ? showSuccessToast("Rol güncellendi.")
      : showWarningToast("Rol güncellenirken bir hatayla karşılaşıldı!");
    return response.data;
  } catch (error) {
    console.error('API isteği başarısız:', error);
  }
};
