import React, { useEffect, useState } from 'react';
import { getAllUsers, removeUser } from '../../api/users';
import Loading from '../../components/Loading';
import Pagination from '../../components/Admin/AdminPagination';
import ConfirmDialog from '../../components/ConfirmDialog';
import UserTable from '../../components/Admin/AdminUser/UserTable';

const ITEMS_PER_PAGE = 10;

const AdminUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageCount, setPageCount] = useState(1)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const data = await getAllUsers(currentPage, ITEMS_PER_PAGE)
      setUsers(data.users);
      setPageCount(Math.ceil(data.totalCount / ITEMS_PER_PAGE));
      setLoading(false);
    }

    fetchUsers();
  }, [currentPage])

  const handleOpenConfirmDialog = (user) => {
    setUserToDelete(user);
    setShowConfirmDialog(true);
  };
  const handleCloseConfirmDialog = () => {
    setUserToDelete(null);
    setShowConfirmDialog(false);
  };

  const handleDeleteUser = async () => {
    if (userToDelete) {
      await removeUser(userToDelete.id);
      setUsers(users.filter(user => user.id !== userToDelete.id));
      handleCloseConfirmDialog();
    }
  };

  if(loading) return <Loading />

  return (
    <>
      <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
        <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
        <div className="overflow-y-hidden rounded-lg border">
          
          <UserTable 
            users={users}
            onDelete={handleOpenConfirmDialog}
          />

          <Pagination
            currentPage={currentPage}
            pageCount={pageCount}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {showConfirmDialog && (
        <ConfirmDialog
          isOpen={showConfirmDialog}
          onClose={handleCloseConfirmDialog}
          onConfirm={handleDeleteUser}
          message="Are you sure you want to delete this user?"
          title="Remove User"
        />
      )}

    </>
  );
};

export default AdminUsers;
