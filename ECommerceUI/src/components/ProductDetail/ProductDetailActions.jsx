import React from "react";
import { addItemToBasket } from "../../api/baskets";

const ProductActions = ({ productId, quantity }) => {
  const handleAddToCart = async () => await addItemToBasket(productId, quantity);;

  return (
    <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
      <a
        href="#"
        title=""
        className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        role="button"
      >
        <svg
          className="w-5 h-5 -ms-2 me-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
          />
        </svg>
        Add to favorites
      </a>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          handleAddToCart();
        }}
        title=""
        className="text-white mt-4 sm:mt-0 bg-black hover:bg-gray-800 focus:ring-4 focus:ring-gray-400 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 flex items-center justify-center"
        role="button"
      >
        <svg
          className="w-5 h-5 -ms-2 me-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
          />
        </svg>
        Add to cart
      </a>
    </div>
  );
};

export default ProductActions;
