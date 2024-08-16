import React, { useState, useEffect } from "react";
import DesktopMenuButton from "./DesktopMenuButton";
import { NavItemsLeft, NavItemsRight, NavItemsLogout } from "./NavItems";
import CategoryMenu from "./CategoryMenu";
import SubCategoryMenu from "./SubCategoryMenu";
import { getRootCategories, getSubCategories } from "../../api/categories";
import { IoMdClose } from "react-icons/io";
import AuthService from "../../services/AuthService";

const Navbar = () => {
  const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [rootCategories, setRootCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getRootCategories();
        setRootCategories(data.categories);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSubCategories = async () => {
      if (selectedCategory) {
        try {
          const data = await getSubCategories(selectedCategory);
          setSubCategories(data.subCategories);
        } catch (error) {
          console.log(error.message);
        }
      }
    };

    fetchSubCategories();
  }, [selectedCategory]);

  useEffect(() => {
    const checkAuthStatus = () => {
      const expired = AuthService.isTokenExpired();
      setIsAuthenticated(!expired)
    };
    checkAuthStatus();

    // const interval = setInterval(checkAuthStatus, 1000);
    // return () => clearInterval(interval); 
  }, []);

  const closeSubMenu = () => {
    setDesktopMenuOpen(false);
    setSelectedCategory(null);
  };

  const openDesktopMenu = () => {
    setDesktopMenuOpen((prev) => !prev);
  };

  return (
    <>
      <nav className="md:block hidden relative bg-slate-900">
        <div className="mx-auto h-12 w-full max-w-[1200px] items-center md:flex">
          <DesktopMenuButton onClick={openDesktopMenu} />
          <NavItemsLeft />
          {isAuthenticated ? <NavItemsLogout /> : <NavItemsRight />}
        </div>
      </nav>
      {desktopMenuOpen && (
        <section className="absolute left-0 right-0 z-10 w-full border-b border-r border-l bg-white">
          <div
            className="hidden mx-auto md:flex max-w-[1200px] py-4"
            onMouseLeave={closeSubMenu}
          >
            <CategoryMenu
              rootCategories={rootCategories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            <SubCategoryMenu
              selectedCategory={selectedCategory}
              subCategories={subCategories}
              setSelectedCategory={setSelectedCategory}
            />
            <button onClick={closeSubMenu} className="absolute top-5 right-5">
              <IoMdClose className="w-6 h-6" />
            </button>
          </div>
        </section>
      )}
    </>
  );
};

export default Navbar;
