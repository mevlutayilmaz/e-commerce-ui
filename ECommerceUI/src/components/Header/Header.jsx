import React, { useState, useEffect } from "react";
import { CiHeart, CiUser } from "react-icons/ci";
import { IoBagHandleSharp } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import IconLinks from "./IconLinks";
import MobileMenu from "./MobileMenu";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { getBasketItems, removeBasketItem, updateQuantity } from "../../api/baskets";
import { createOrder } from '../../api/orders'
import { showSuccessToast, showInfoToast } from '../../utils/toastUtils'

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [basketItems, setBasketItems] = useState([]);

  const links = [
    { text: "Home", url: "/" },
    { text: "Catalog", url: "#" },
    { text: "About Us", url: "#" },
    { text: "Contact Us", url: "#" },
  ];

  const iconLinks = [
    {
      href: "#",
      icon: <CiHeart className="h-6 w-6" />,
      text: "Wishlist",
    },
    {
      href: "#",
      icon: <IoBagHandleSharp className="h-6 w-6" />,
      text: "Cart",
      onClick: () => setOpen(true),
    },
    {
      href: "#",
      icon: <CiUser className="h-6 w-6" />,
      text: "Account",
    },
  ];

  const fetchBasketItems = async () => {
    const data = await getBasketItems();
    if(data) setBasketItems(data);
    else setBasketItems([])
  };

  useEffect(() => {
    open && fetchBasketItems();
  }, [open]);

  const handleRemoveItem = async (basketItemId) => {
    try {
      await removeBasketItem(basketItemId);      
      setBasketItems(basketItems.filter(item => item.basketItemId !== basketItemId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleQuantityChange = async (basketItemId, newQuantity) => {
    try {
      await updateQuantity(basketItemId, newQuantity);
      setBasketItems(basketItems.map(item => 
        item.basketItemId === basketItemId ? { ...item, quantity: newQuantity } : item
      )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleCompleteTheOrder = async (description, address) => {
    if(basketItems == null || basketItems.length <= 0)
      showInfoToast('Sepette ürün bulunmamaktadır!')
    else{
      await createOrder(description, address);
      setOpen(false);
      showSuccessToast('Sipariş oluşturuldu.')
    }
  }

  return (
    <>
      <header className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5">
        <Logo />
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <RxHamburgerMenu className="w-8 h-8" />
          </button>
        </div>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <IconLinks iconLinks={iconLinks} />
      </header>
      <MobileMenu
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        links={links}
        iconLinks={iconLinks}
      />

      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <DialogPanel
                transition
                className="pointer-events-auto w-screen max-w-xl transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
              >
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <DialogTitle className="text-lg font-medium text-gray-900">
                        Shopping cart
                      </DialogTitle>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                        >
                          <span className="absolute -inset-0.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        <ul
                          role="list"
                          className="-my-6 divide-y divide-gray-200"
                        >
                          {basketItems.map((basketItem, index) => (
                            <li key={index} className="flex py-6">
                              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                  src={basketItem.imageUrl}
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3 className="flex-1">
                                      {basketItem.name}
                                    </h3>
                                    <p className="ml-4 whitespace-nowrap">
                                      {Intl.NumberFormat("tr-TR").format(basketItem.price)} TL
                                    </p>
                                  </div>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm mt-4">
                                  <div className="flex items-start space-x-2">
                                    <button
                                      type="button"
                                      onClick={() => handleQuantityChange(basketItem.basketItemId, basketItem.quantity - 1)}
                                      disabled={basketItem.quantity <= 1}
                                      className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                      <svg className="w-3 h-3 mx-auto" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                        <path d="M20 12H4"></path>
                                      </svg>
                                    </button>
                                    <span className="text-gray-900 font-medium">{basketItem.quantity}</span>
                                    <button
                                      type="button"
                                      onClick={() => handleQuantityChange(basketItem.basketItemId, basketItem.quantity + 1)}
                                      className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 focus:outline-none"
                                    >
                                      <svg className="w-3 h-3 mx-auto" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                        <path d="M12 4v16m8-8H4"></path>
                                      </svg>
                                    </button>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveItem(basketItem.basketItemId)}
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>{Intl.NumberFormat("tr-TR").format(basketItems.reduce((sum, basketItem) => sum + basketItem.price * basketItem.quantity, 0))} TL</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Shipping and taxes calculated at checkout.
                    </p>
                    <div className="mt-6">
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleCompleteTheOrder('açıklama', 'adres');
                        }}
                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                      >
                        Complete the Order
                      </a>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or{" "}
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Header;
