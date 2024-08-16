import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../components/Admin/AdminSidebar';

const AdminLayout = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1">
        <div className="bg-white ">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
