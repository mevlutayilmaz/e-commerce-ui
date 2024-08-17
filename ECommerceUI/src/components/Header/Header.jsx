import React, { useState, useEffect } from "react";
import { CiHeart, CiUser } from "react-icons/ci";
import { IoBagHandleSharp } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import IconLinks from "./IconLinks";
import MobileMenu from "./MobileMenu";
import { getBasketItems, removeBasketItem, updateQuantity } from "../../api/baskets";
import { createOrder } from '../../api/orders'
import { showSuccessToast, showInfoToast } from '../../utils/toastUtils'
import ShoppingCart from "./ShoppingCart";

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

  useEffect(() => {
    const fetchBasketItems = async () => {
      const data = await getBasketItems();
      if(data) setBasketItems(data);
      else setBasketItems([])
    };

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

      <ShoppingCart
        open={open}
        setOpen={setOpen}
        basketItems={basketItems}
        handleRemoveItem={handleRemoveItem}
        handleQuantityChange={handleQuantityChange}
        handleCompleteTheOrder={handleCompleteTheOrder}
      />
    </>
  );
};

export default Header;
