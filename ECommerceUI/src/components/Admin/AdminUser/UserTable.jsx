import React, {useState} from "react";
import RoleSelectionModalToUser from "./RoleSelectionModalToUser";
import { assignRoleToUser } from "../../../api/users";

const UserTable = ({ users, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null)

  const openModal = (user) => {
    setSelectedUser(user)
    setIsModalOpen(true)
  };

  const closeModal = () => {
    setSelectedUser(null)
      setIsModalOpen(false);
  };

  const handleSave = async (roles) => {
    if(selectedUser){
      await assignRoleToUser(selectedUser.id, roles)
      closeModal();
    }
  };

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100 text-left text-xs font-semibold uppercase tracking-widest text-gray-500">
            <th className="px-5 py-3">User</th>
            <th className="px-5 py-3">User Name</th>
            <th className="px-5 py-3">Two Factor Auth.</th> 
            <th className="px-5 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-500">
          {users.map((user) => {
            const bgColor = getRandomColor();

            return (
              <tr key={user.id}>
                <td
                  key={user.email}
                  className="border-b border-gray-200 bg-white px-5 py-5 text-sm"
                >
                  <div className="flex items-center">
                    <div
                      className="h-10 w-10 flex-shrink-0 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: `${bgColor}33`,
                        color: bgColor,
                      }}
                    >
                      <span className="text-lg font-semibold">
                        {user.nameSurname.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="ml-3">
                      <p className="whitespace-no-wrap text-gray-600 font-semibold">
                        {user.nameSurname}
                      </p>
                      <p className="whitespace-no-wrap text-gray-400">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                  <p className="whitespace-no-wrap">{user.userName}</p>
                </td>
                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm text-center">
                  {user.twoFactorEnabled ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  )}
                </td>

                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                  <button
                    type="button"
                    className="w-fit inline-flex justify-center rounded-lg border border-gray-200 bg-white px-2 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto"
                    onClick={() => openModal(user)}
                  >
                    Add Role
                  </button>
                  <button
                    type="button"
                    className="ml-2 w-fit rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900 lg:w-auto"
                    onClick={() => onDelete(user)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {isModalOpen && <RoleSelectionModalToUser
          isOpen={isModalOpen}
          onClose={closeModal}
          onSave={handleSave}
          userId={selectedUser.id}
            />}
    </div>
  );
};

export default UserTable;
