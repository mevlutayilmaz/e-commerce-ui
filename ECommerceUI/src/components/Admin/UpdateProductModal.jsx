import React, { useState, useEffect } from "react";

const UpdateProductModal = ({ showModal, setShowModal, currentPrice, setNewPrice, onUpdate }) => {
  const [price, setPrice] = useState(currentPrice || 0);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  const handleSave = () => {
    setNewPrice(price);
    onUpdate(price);
  };

  return (
    showModal && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-gray-800 opacity-50"></div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative z-10">
          <h3 className="text-lg font-semibold mb-4">Update Price</h3>
          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">New Price</label>
            <input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
            >
              Save
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default UpdateProductModal;
