import React from "react";

const NavLinks = ({ links }) => (
  <ul className="text-center font-medium">
    {links.map((link, index) => (
      <li key={index} className="py-2">
        <a href={link.url}>{link.text}</a>
      </li>
    ))}
  </ul>
);

export default NavLinks;
