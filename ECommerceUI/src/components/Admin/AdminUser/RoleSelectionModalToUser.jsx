import React, { useState, useEffect } from "react";
import { getAllRoles } from "../../../api/roles";
import { getRolesToUser } from "../../../api/users";

const RoleSelectionModalToUser = ({ isOpen, onClose, onSave, userId }) => {
  const [roles, setRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      const allRolesData = await getAllRoles(-1, -1);
      const assignedRolesData = await getRolesToUser(userId);
      
      const initialSelectedRoles = allRolesData.roles.filter((role) =>
        (assignedRolesData.roles || []).includes(role.name)
      );
      
      setRoles(allRolesData.roles);
      setSelectedRoles(initialSelectedRoles);
    };

    if (isOpen) {
      fetchRoles();
    }
  }, [isOpen, userId]);

  const handleCheckboxChange = (role) => {
    setSelectedRoles((prevSelectedRoles) => {
      const updatedRoles = [...prevSelectedRoles];
      const existingRole = updatedRoles.find((r) => r.id === role.id);

      if (existingRole) {
        return updatedRoles.filter((r) => r.id !== role.id);
      } else {
        return [...updatedRoles, role];
      }
    });
  };

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-lg z-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Select Roles</h2>
        <ul className="divide-y divide-gray-200 mb-4">
          {roles.map((role) => (
            <li key={role.id} className="py-2 flex items-center justify-between">
              <span className="text-base text-gray-700">{role.name}</span>
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600"
                checked={selectedRoles.some((r) => r.id === role.id)}
                onChange={() => handleCheckboxChange(role)}
              />
            </li>
          ))}
        </ul>
        <div className="flex justify-end">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300 mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            onClick={() => onSave(selectedRoles.map((role) => role.name))}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default RoleSelectionModalToUser;
