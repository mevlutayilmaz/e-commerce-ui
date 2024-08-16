import React from "react";
import NavLinks from "./NavLinks";
import IconLinks from "./IconLinks";

const MobileMenu = ({ mobileMenuOpen, setMobileMenuOpen, searchQuery, setSearchQuery, links, iconLinks }) => (
  mobileMenuOpen && (
    <section
      className={`block md:hidden absolute left-0 right-0 z-50 h-screen w-full bg-white ${
        mobileMenuOpen ? "none" : "block"
      }`}
    >
      <div className="mx-auto">
        <div className="mx-auto flex w-full justify-center gap-3 py-4">
          <IconLinks iconLinks={iconLinks} />
        </div>
        <NavLinks links={links} />
      </div>
    </section>
  )
);

export default MobileMenu;
