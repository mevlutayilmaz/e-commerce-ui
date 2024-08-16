import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaProductHunt, FaBox, FaUsers, FaChevronRight } from 'react-icons/fa';

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Button to toggle the sidebar */}
      <div
        className={`fixed top-1/2 transform -translate-y-1/2 left-0 z-50 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 transition-transform duration-300 ${isOpen ? 'translate-x-64' : ''}`}
        onClick={toggleSidebar}
      >
        <FaChevronRight className={`transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-40 w-64 h-screen p-4 transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} bg-white dark:bg-gray-800 shadow-lg`}
        aria-labelledby="sidebar-label"
      >
        <h5 id="sidebar-label" className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Menu</h5>
        <button
          type="button"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={toggleSidebar}
        >
          <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
        <div className="py-4">
          <ul className="space-y-2 font-medium">
            <li>
              <Link to="/admin/products" onClick={closeSidebar} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <FaProductHunt className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ms-3">Products</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/orders" onClick={closeSidebar} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <FaBox className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ms-3">Orders</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/users" onClick={closeSidebar} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <FaUsers className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ms-3">Users</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Background overlay */}
      {isOpen && (
        <div
          className="fixed top-0 left-0 z-30 w-full h-screen bg-black opacity-50"
          onClick={toggleSidebar} // Close sidebar on clicking overlay
        />
      )}
    </>
  );
};

export default AdminSidebar;
