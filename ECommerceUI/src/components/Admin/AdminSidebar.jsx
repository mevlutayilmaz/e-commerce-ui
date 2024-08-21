import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaProductHunt, FaBox, FaUsers, FaChevronRight , FaLink, FaUserShield} from 'react-icons/fa';

const AdminSidebar = () => {
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
              <Link to="/admin/products" onClick={toggleSidebar} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <FaProductHunt className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ms-3">Products</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/orders" onClick={toggleSidebar} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <FaBox className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ms-3">Orders</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/users" onClick={toggleSidebar} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <FaUsers className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ms-3">Users</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/endpoints" onClick={toggleSidebar} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <FaLink className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ms-3">Endpoints</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/roles" onClick={toggleSidebar} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <FaUserShield className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ms-3">Roles</span>
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