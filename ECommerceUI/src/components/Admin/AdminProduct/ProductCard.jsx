import React from 'react';

const ProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-3 h-48 flex flex-col">
      <div className="p-1 flex-grow">
        <h3 className="text-base font-medium text-gray-900 truncate whitespace-normal line-clamp-2">
          {product.name}
        </h3>
        <p className="text-gray-500 text-xs truncate">Brand: {product.brand}</p>
        <p className="text-gray-500 text-xs truncate">
          Model No: {product.modelNo}
        </p>
        <p className="text-gray-500 text-xs truncate">
          Category: {product.categoryName}
        </p>
        <p className="text-gray-700 font-medium text-sm">
          {Intl.NumberFormat('tr-TR').format(product.price)} TL
        </p>
      </div>
      <div className="flex justify-between mt-1">
        <button
          onClick={onEdit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;