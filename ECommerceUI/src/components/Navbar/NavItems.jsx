import React from "react";
import AuthService from "../../services/AuthService";
import AdminPanel from "../../pages/Admin/AdminPanel";

export const NavItemsLeft = () => {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Catalog", href: "#" },
    { label: "About US", href: "#" },
    { label: "Contact US", href: "#" },
  ];

  return (
    <div className="mx-7 flex gap-8">
      {navItems.map((item, index) => (
        <a
          key={index}
          className="font-light text-white duration-100 hover:text-stone-300 hover:underline"
          href={item.href}
        >
          {item.label}
        </a>
      ))}
    </div>
  );
};

export const NavItemsRight = () => {
  return (
    <div className="ml-auto flex gap-4 px-5">
      <a
        className="font-light text-white duration-100 hover:text-stone-300 hover:underline"
        href="/Login"
      >
        Login
      </a>
      <span className="text-white">|</span>
      <a
        className="font-light text-white duration-100 hover:text-stone-300 hover:underline"
        href="/Signup"
      >
        Sign Up
      </a>
    </div>
  );
};

export const NavItemsLogout = () => {

  const handleLogout = () => {
    AuthService.logout();
  };

  return (
    <div className="ml-auto flex gap-4 px-5">
      <a
        className="font-light text-white duration-100 hover:text-stone-300 hover:underline"
        href="/admin"
      >
        Admin Panel
      </a>
      <span className="text-white">|</span>
      <a
        className="font-light text-white duration-100 hover:text-red-600 hover:underline"
        onClick={handleLogout}
        href="/login"
      >
        Logout
      </a>
    </div>
  );
};
