import React from "react";

const IconLinks = ({ iconLinks }) => (
  <div className="hidden gap-3 md:!flex">
    {iconLinks.map((link, index) => (
      <a
        key={index}
        href={link.href}
        className="flex cursor-pointer flex-col items-center justify-center"
        onClick={link.onClick}
      >
        {link.icon}
        <p className="text-xs">{link.text}</p>
      </a>
    ))}
  </div>
);

export default IconLinks;
