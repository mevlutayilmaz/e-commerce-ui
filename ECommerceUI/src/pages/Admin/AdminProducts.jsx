import React, { useState, useEffect } from "react";
import Modal from "../../components/Admin/AddProductModal";
import UpdateProductModal from "../../components/Admin/UpdateProductModal"; // Yeni modal
import Loading from "../../components/Loading";
import { getAllProduct, removeProduct, updateProduct } from "../../api/products";
import ConfirmDialog from "../../components/ConfirmDialog";

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
      <h2 className="text-2xl font-semibold mb-4">Manage Products</h2>
      <button
        onClick={handleOpenModal}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-4"
      >
        Add New Product
      </button>
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

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Brand
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Model No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 truncate max-w-xs">
                  {product.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate max-w-xs">
                  {product.brand}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate max-w-xs">
                  {product.modelNo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate max-w-xs">
                  ${Intl.NumberFormat("tr-TR").format(product.price)} TL
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate max-w-xs">
                  {product.categoryName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => handleOpenUpdateProductModal(product)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Edit Price
                  </button>
                  <button
                    onClick={() => handleOpenConfirmDialog(product)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-center">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 text-gray-700 border rounded-l-lg mr-2 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2 bg-gray-200 text-gray-700 border">
          Page {currentPage} of {pageCount}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pageCount))}
          disabled={currentPage === pageCount}
          className="px-4 py-2 bg-gray-200 text-gray-700 border rounded-r-lg ml-2 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminProducts;