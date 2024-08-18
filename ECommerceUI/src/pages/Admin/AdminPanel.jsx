import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AdminSidebar from '../../components/Admin/AdminSidebar';

const AdminLayout = () => {
  const location = useLocation();

  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1">
        <div className="bg-white ">
          {location.pathname === '/admin' ? (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-13rem)] pt-10">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to the Admin Panel!</h1>
              <p className="text-lg text-gray-600">Select a section from the sidebar to get started.</p>
              <svg className="w-24 h-24 text-blue-500 mt-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;