import React, {useEffect} from 'react';

const OrderDetailsModal = ({ showModal, setShowModal, orderDetails, completeOrder}) => {
  const handleClose = () => setShowModal(false);

  if (!showModal || !orderDetails) return null;

  const total = orderDetails.basketItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

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

  return (
    <div
      id="order-details-modal"
      tabIndex="-1"
      aria-hidden={!showModal}
      className={`fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full flex justify-center items-center bg-black/50 ${
        showModal ? 'flex' : 'hidden'
      }`}
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-full overflow-y-auto"
        aria-hidden={!showModal}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 p-8">
          <button
            type="button"
            className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            aria-hidden={!showModal}
            onClick={handleClose}
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <p className="font-normal text-base leading-6 text-gray-500 mb-8 text-center">
            {orderDetails.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-4 border-y border-gray-100 mb-4">
            <div>
                <p className="text-sm text-gray-500 mb-1">Delivery Date</p>
                <h6 className="font-semibold text-base text-black">{new Date(orderDetails.createdDate).toLocaleDateString()}</h6>
            </div>
            <div>
                <p className="text-sm text-gray-500 mb-1">Order Code</p>
                <h6 className="font-semibold text-base text-black">#{orderDetails.orderCode}</h6>
            </div>
            <div>
                <p className="text-sm text-gray-500 mb-1">Payment Method</p>
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="24"
                viewBox="0 0 46 32"
                fill="none"
                >
                </svg>
            </div>
            <div>
                <p className="text-sm text-gray-500 mb-1">Address</p>
                <h6 className="font-semibold text-base text-black truncate">
                {orderDetails.address}
                </h6>
            </div>
          </div>

          <div className="max-h-80 overflow-y-auto" aria-hidden={!showModal}>
            {orderDetails.basketItems.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-7 w-full py-1 border-b border-gray-200"
              >
                <div className="col-span-7 min-[500px]:col-span-2 md:col-span-1">
                  <img src={item.imageUrl} alt="basket item" className="w-full h-24 object-contain" />
                </div>
                <div className="col-span-7 min-[500px]:col-span-5 md:col-span-6 min-[500px]:pl-5 max-sm:mt-3 flex flex-col justify-center">
                  <div className="flex flex-col min-[500px]:flex-row min-[500px]:items-center justify-between">
                    <div>
                      <h5 className="font-semibold text-m leading-7 text-black mb-4">
                        {item.name}
                      </h5>
                      <p className="font-normal text-base leading-6 text-gray-500">
                        Quantity : <span className="text-black font-semibold">{item.quantity}</span>
                      </p>
                    </div>

                    <h5 className="font-semibold text-lg text-black sm:text-right mt-2 ml-4 whitespace-nowrap">
                          {Intl.NumberFormat('tr-TR').format(item.price)} TL
                    </h5>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center sm:justify-end w-full my-4">
            <div className="w-full">
              <div className="flex items-center justify-between py-4">
                <p className="font-semibold text-lg leading-8 text-gray-900">Total</p>
                <p className="font-bold text-lg text-indigo-600">{Intl.NumberFormat('tr-TR').format(total)} TL</p>
              </div>
            </div>
          </div>

            {!orderDetails.completed && 
              <div className="flex justify-center">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => {
                  completeOrder(orderDetails.id)}}>
                  Complete Order
                </button>
              </div>}

              {orderDetails.completed && 
                <div className="flex justify-center">
                  <span className="text-green-500 font-bold flex items-center">
                    <svg className="w-6 h-6 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Order Completed
                  </span>
                </div>}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;