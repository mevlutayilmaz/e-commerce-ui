import React, { useState, useEffect } from "react";
import {
  createRole,
  getAllRoles,
  removeRole,
  updateRole,
} from "../../api/roles";
import AdminPagination from "../../components/Admin/AdminPagination";
import ConfirmDialog from "../../components/ConfirmDialog";

const ITEMS_PER_PAGE = 10;

const AdminRoles = () => {
  const [roleName, setRoleName] = useState("");
  const [roles, setRoles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [editingRoleId, setEditingRoleId] = useState(null);
  const [editingRoleName, setEditingRoleName] = useState("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null);

  const fetchRoles = async () => {
    const data = await getAllRoles(currentPage, ITEMS_PER_PAGE);
    if (data) {
      setRoles(data.roles);
      setPageCount(Math.ceil(data.totalCount / ITEMS_PER_PAGE));
    }
  };

  useEffect(() => {
    fetchRoles();
  }, [currentPage]);

  const handleAddRole = async () => {
    await createRole(roleName);
    fetchRoles();
    setRoleName("");
  };

  const handleOpenConfirmDialog = (id) => {
    setRoleToDelete(id);
    setShowConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setRoleToDelete(null);
    setShowConfirmDialog(false);
  };

  const handleRemoveRole = async () => {
    if (roleToDelete) {
      await removeRole(roleToDelete);
      setRoles(roles.filter((role) => role.id !== roleToDelete));
      handleCloseConfirmDialog();
    }
  };

  const handleEditRole = (id, name) => {
    setEditingRoleId(id);
    setEditingRoleName(name);
  };

  const handleSaveRole = async () => {
    await updateRole(editingRoleId, editingRoleName);
    setRoles(roles.map(role => role.id === editingRoleId ? { ...role, name: editingRoleName } : role));
    setEditingRoleId(null);
    setEditingRoleName("");
  };

  const handleCancelEdit = () => {
    setEditingRoleId(null);
    setEditingRoleName("");
  };

  return (
    <div className="p-6 min-h-[calc(100vh-13rem)]">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Add New Role
        </h2>
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
            placeholder="Enter role name"
          />
          <button
            onClick={handleAddRole}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Add Role
          </button>
        </div>

        <h2 className="text-xl font-semibold mb-4">Roles List</h2>
        <ul className="border rounded-lg divide-y">
          {roles.map((role) => (
            <li
              key={role.id}
              className="flex justify-between items-center p-4 hover:bg-gray-50 transition-colors"
            >
              {editingRoleId === role.id ? (
                <input
                  type="text"
                  value={editingRoleName}
                  onChange={(e) => setEditingRoleName(e.target.value)}
                  className="flex-1 px-4 py-2 mr-5 border rounded-lg focus:outline-none focus:border-indigo-500"
                />
              ) : (
                <span className="font-medium text-gray-800">{role.name}</span>
              )}
              <div className="flex gap-2">
                {editingRoleId === role.id ? (
                  <>
                    <button
                      onClick={handleSaveRole}
                      className="bg-green-500 text-white px-5 py-1 rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="bg-gray-500 text-white px-3 py-1 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditRole(role.id, role.name)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition-colors"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleOpenConfirmDialog(role.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <AdminPagination
            currentPage={currentPage}
            pageCount={pageCount}
            onPageChange={setCurrentPage}
          />
        </div>

        {showConfirmDialog && (
          <ConfirmDialog
            isOpen={showConfirmDialog}
            onClose={handleCloseConfirmDialog}
            onConfirm={handleRemoveRole}
            message="Are you sure you want to delete this role?"
            title="Remove Role"
          />
        )}
      </div>
    </div>
  );
};

export default AdminRoles;
