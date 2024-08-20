import axios from "axios";
import AuthService from "../services/AuthService";
import {
  showErrorToast,
  showSuccessToast,
  showInfoToast,
} from "../utils/toastUtils";

const API_URL = "https://localhost:7041/api";

export const getAllRoles = async (pageCount, itemCount) => {
  const token = await AuthService.getAccessToken();
  if (token) {
    try {
      const response = await axios.get(
        `${API_URL}/Roles/GetAllRoles?pageCount=${pageCount}&itemCount=${itemCount}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) return response.data;
      else showErrorToast("Failed to fetch roles. Please try again.");
    } catch (error) {
      showErrorToast("An error occurred. Please try again. (getAllRoles)");
    }
  } else showInfoToast("(Unauthorization) Please log in!");
};

export const getRoleById = async (id) => {
  const token = await AuthService.getAccessToken();
  if (token) {
    try {
      const response = await axios.get(`${API_URL}/Role/GetRoleById/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) return response.data;
      else showErrorToast("Failed to fetch order. Please try again.");
    } catch (error) {
      showErrorToast("An error occurred. Please try again. (getRoleById)");
    }
  } else showInfoToast("(Unauthorization) Please log in!");
};

export const createRole = async (name) => {
  const token = await AuthService.getAccessToken();
  if (token) {
    try {
      const response = await axios.post(
        `${API_URL}/Roles`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        response.data.succeeded
          ? showSuccessToast("Rol oluşturuldu.")
          : showErrorToast("Rol oluşturulurken bir hatayla karşılaşıldı!");
      } else showErrorToast("Failed to create role. Please try again.");
    } catch (error) {
      showErrorToast("An error occurred. Please try again. (createRole)");
    }
  } else showInfoToast("(Unauthorization) Please log in!");
};

export const removeRole = async (id) => {
  const token = await AuthService.getAccessToken();
  if (token) {
    try {
      const response = await axios.delete(`${API_URL}/Roles/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        response.data.succeeded
          ? showSuccessToast("Rol silindi.")
          : showErrorToast("Rol silinirken bir hatayla karşılaşıldı!");
      } else showErrorToast("Failed to remove role. Please try again.");
    } catch (error) {
      showErrorToast("An error occurred. Please try again. (deleteRole)");
    }
  } else showInfoToast("(Unauthorization) Please log in!");
};

export const updateRole = async (id, name) => {
  const token = await AuthService.getAccessToken();
  if (token) {
    try {
      const response = await axios.put(
        `${API_URL}/Roles`,
        { id, name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        response.data.succeeded
          ? showSuccessToast("Rol güncellendi.")
          : showErrorToast("Rol güncellenirken bir hatayla karşılaşıldı!");
      } else showErrorToast("Failed to update role. Please try again.");
    } catch (error) {
      showErrorToast("An error occurred. Please try again. (updateRole)");
    }
  } else showInfoToast("(Unauthorization) Please log in!");
};
