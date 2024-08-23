import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaProductHunt, FaBox, FaUsers, FaChevronRight , FaLink, FaUserShield, FaUserLock} from 'react-icons/fa';

const AdminSidebar = ({menus}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <div
        className={`fixed top-0 left-0 z-40 w-64 h-screen p-4 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} bg-white dark:bg-gray-800 shadow-lg`}
        aria-labelledby="sidebar-label"
      >
        <h5 id="sidebar-label" className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Menu</h5>
        <div className="py-4">
          <ul className="space-y-2 font-medium">
            <li>
              <Link to={menus.includes("Products") ? "/admin/products" : "#"} onClick={toggleSidebar} className={`flex items-center justify-between p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${!menus.includes("Products") && 'opacity-50 cursor-not-allowed'}`}>
                <div className="flex items-center">
                  <FaProductHunt className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="ms-3">Products</span>
                </div>
                {!menus.includes("Products") && <FaUserLock className="text-red-500" title="Unauthorized Access" />}
              </Link>
            </li>
            <li>
              <Link to={menus.includes("Orders") ? "/admin/orders" : "#"} onClick={toggleSidebar} className={`flex items-center justify-between p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${!menus.includes("Orders") && 'opacity-50 cursor-not-allowed'}`}>
                <div className="flex items-center">
                  <FaBox className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="ms-3">Orders</span>
                </div>
                {!menus.includes("Orders") && <FaUserLock className="text-red-500" title="Unauthorized Access" />}
              </Link>
            </li>
            <li>
              <Link to={menus.includes("Users") ? "/admin/users" : "#"} onClick={toggleSidebar} className={`flex items-center justify-between p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${!menus.includes("Users") && 'opacity-50 cursor-not-allowed'}`}>
                <div className="flex items-center">
                  <FaUsers className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="ms-3">Users</span>
                </div>
                {!menus.includes("Users") && <FaUserLock className="text-red-500" title="Unauthorized Access" />}
              </Link>
            </li>
            <li>
              <Link to={menus.includes("Application Services") ? "/admin/endpoints" : "#"} onClick={toggleSidebar} className={`flex items-center justify-between p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${!menus.includes("Application Services") && 'opacity-50 cursor-not-allowed'}`}>
                <div className="flex items-center">
                  <FaLink className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="ms-3">Endpoints</span>
                </div>
                {!menus.includes("Application Services") && <FaUserLock className="text-red-500" title="Unauthorized Access" />}
              </Link>
            </li>
            <li>
              <Link to={menus.includes("Roles") ? "/admin/roles" : "#"} onClick={toggleSidebar} className={`flex items-center justify-between p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${!menus.includes("Roles") && 'opacity-50 cursor-not-allowed'}`}>
                <div className="flex items-center">
                  <FaUserShield className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="ms-3">Roles</span>
                </div>
                {!menus.includes("Roles") && <FaUserLock className="text-red-500" title="Unauthorized Access" />}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <button
        className={`fixed top-1/2 transform -translate-y-1/2 left-0 z-50 ${isOpen ? 'hidden' : 'bg-blue-700'} hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 text-white font-medium rounded-r-lg text-sm p-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 transition-transform duration-300 ease-in-out`}
        onClick={toggleSidebar}
      >
        <FaChevronRight className={`transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          className="fixed top-0 left-0 z-30 w-full h-screen bg-black opacity-50"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default AdminSidebar;