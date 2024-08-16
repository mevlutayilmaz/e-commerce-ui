import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";

const DesktopMenuButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="ml-5 flex h-full w-40 cursor-pointer items-center justify-center bg-stone-300"
  >
    <div className="flex justify-around">
      <RxHamburgerMenu className="mx-1 w-6 h-6" />
      All categories
    </div>
  </button>
);

export default DesktopMenuButton;
