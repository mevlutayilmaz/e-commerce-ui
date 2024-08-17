import React, { useState, useEffect } from "react";
import Modal from "../../components/Admin/AdminProduct/AddProductModal";
import UpdateProductModal from "../../components/Admin/AdminProduct/UpdateProductModal";
import Loading from "../../components/Loading";
import { getAllProduct, removeProduct, updateProduct } from "../../api/products";
import ConfirmDialog from "../../components/ConfirmDialog";
import Pagination from "../../components/Admin/AdminPagination";
import ProductList from "../../components/Admin/AdminProduct/ProductList";

const ITEMS_PER_PAGE = 10;

const AdminProducts = () => {
  const [showModal, setShowModal] = useState(false);
  const [showUpdateProductModal, setShowUpdateProductModal] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newPrice, setNewPrice] = useState(0);
  const [productToDelete, setProductToDelete] = useState(null);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleOpenUpdateProductModal = (product) => {
    setSelectedProduct(product);
    setNewPrice(product.price);
    setShowUpdateProductModal(true);
  };
  const handleCloseUpdateProductModal = () => setShowUpdateProductModal(false);

  const handleOpenConfirmDialog = (product) => {
    setProductToDelete(product);
    setShowConfirmDialog(true);
  };
  const handleCloseConfirmDialog = () => {
    setProductToDelete(null);
    setShowConfirmDialog(false);
  };

  const handleDeleteProduct = async () => {
    if (productToDelete) {
      await removeProduct(productToDelete.id);
      setProducts(products.filter(product => product.id !== productToDelete.id));
      handleCloseConfirmDialog();
    }
  };

  const handleUpdatePrice = async (price) => {
    if (selectedProduct) {
      await updateProduct(selectedProduct.id, price);
      setProducts(products.map(product =>
        product.id === selectedProduct.id ? { ...product, price } : product
      ));
      handleCloseUpdateProductModal();
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const data = await getAllProduct(currentPage, ITEMS_PER_PAGE);
      setProducts(data.products);
      const totalCount = data.totalCount;
      setPageCount(Math.ceil(totalCount / ITEMS_PER_PAGE));
      setLoading(false);
    };

    fetchProducts();
  }, [currentPage]);

  if (loading) return <Loading />;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Manage Products</h2>
        <button
          onClick={handleOpenModal}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Add New Product
        </button>
      </div>

      {showModal && <Modal showModal={showModal} setShowModal={setShowModal} />}
      {showUpdateProductModal && (
        <UpdateProductModal
          showModal={showUpdateProductModal}
          setShowModal={setShowUpdateProductModal}
          currentPrice={selectedProduct?.price}
          onUpdate={handleUpdatePrice}
          setNewPrice={setNewPrice}
        />
      )}
      {showConfirmDialog && (
        <ConfirmDialog
          isOpen={showConfirmDialog}
          onClose={handleCloseConfirmDialog}
          onConfirm={handleDeleteProduct}
          message="Are you sure you want to delete this product?"
          title="Remove Product"
        />
      )}

      <ProductList
        products={products}
        onEdit={handleOpenUpdateProductModal}
        onDelete={handleOpenConfirmDialog}
      />

      <Pagination
        currentPage={currentPage}
        pageCount={pageCount}
        onPageChange={setCurrentPage}
      />    
    </div>
  );
};

export default AdminProducts;