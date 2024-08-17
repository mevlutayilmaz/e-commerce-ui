import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getAllCategories } from '../../../api/categories'
import { createProduct } from '../../../api/products';

const Modal = ({ showModal, setShowModal }) => {
  const handleClose = () => setShowModal(false);
  const [categories, setCategories] = useState([])
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getAllCategories()
      setCategories(data.categories)
    };

    showModal && fetchCategories();

    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  const onSubmit = async (data) => {   
    await createProduct(data.name, data.brand, data.modelNo, data.price, data.category, data.imageUrl);
    setShowModal(false)
  };

  return (
    <div 
      id="crud-modal" 
      tabIndex="-1" 
      aria-hidden={!showModal}
      className={`fixed top-0 right-0 left-0 z-50 w-full h-full md:inset-0 max-h-full overflow-y-auto ${showModal ? 'flex' : 'hidden'} justify-center items-center bg-black/50`}
    >
      <div 
        className="relative p-4 w-full max-w-md max-h-full"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Create New Product
            </h3>
            <button 
              type="button" 
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={handleClose}
            >
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form className="p-4 md:p-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                <input type="text" name="name" id="name" {...register('name', { required: 'Name is required' })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand</label>
                <input type="text" name="brand" id="brand" {...register('brand', { required: 'Brand is required' })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product brand" required />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="model" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Model No</label>
                <input type="text" name="model" id="model" {...register('modelNo', { required: 'Model no is required' })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type model no" required />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                <input type="number" name="price" id="price" {...register('price', { required: 'Password is required' })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                <select id="category" {...register('category', { required: 'Category is required' })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                  <option>Select category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
              <div className="col-span-2">
                <label htmlFor="imageUrl" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image Url</label>
                <input type="url" name="imageUrl" id="imageUrl" {...register('imageUrl', { required: 'Password is required' })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product image url" required />
              </div>
            </div>
            <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
              Add new product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
