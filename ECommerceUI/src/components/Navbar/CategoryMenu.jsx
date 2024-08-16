import React from "react";
import { IoMdArrowDropright } from "react-icons/io";

const CategoryMenu = ({ rootCategories, selectedCategory, setSelectedCategory }) => (
  <div className="w-[300px] border-r">
    <ul className="px-5">
      {rootCategories.map((category, index) => (
        <li
          key={index}
          className={`flex items-center gap-2 py-2 px-3 hover:bg-neutral-200 ${
            selectedCategory === category.id ? "bg-gray-200" : ""
          }`}
          onMouseEnter={() => setSelectedCategory(category.id)}
        >
          {category.name}
          <span className="ml-auto">
            <IoMdArrowDropright className="h-4 w-4" />
          </span>
        </li>
      ))}
    </ul>
  </div>
);

export default CategoryMenu;
