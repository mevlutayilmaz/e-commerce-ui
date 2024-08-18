import React, { useState, useEffect } from "react";
import { getAllOrders, getOrderById } from "../../api/orders";
import Loading from "../../components/Loading";
import OrderDetailsModal from "../../components/Admin/AdminOrder/OrderDetailsModal";
import OrderTable from "../../components/Admin/AdminOrder/OrderTable"
import Pagination from "../../components/Admin/AdminPagination";

const ITEMS_PER_PAGE = 10;

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showOrderDetailsModal, setShowOrderDetailsModal] = useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const data = await getAllOrders(currentPage, ITEMS_PER_PAGE);
      setOrders(data.orders);
      const totalCount = data.totalCount;
      setPageCount(Math.ceil(totalCount / ITEMS_PER_PAGE));
      setLoading(false);
    };

    fetchOrders();
  }, [currentPage]);


  const handleOpenOrderDetailsModal = async (orderId) => {
    const orderDetails = await getOrderById(orderId);
    setSelectedOrderDetails(orderDetails);
    setShowOrderDetailsModal(true);
  };

  if (loading) return <Loading />;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-semibold mb-4">Manage Orders</h2>

      <OrderTable orders={orders} onOpenDetails={handleOpenOrderDetailsModal} />

      <Pagination
        currentPage={currentPage}
        pageCount={pageCount}
        onPageChange={setCurrentPage}
      />

      {showOrderDetailsModal &&
        <OrderDetailsModal
          showModal={showOrderDetailsModal}
          setShowModal={setShowOrderDetailsModal}
          orderDetails={selectedOrderDetails}
        />}
    </div>
  );
};

export default AdminOrders;