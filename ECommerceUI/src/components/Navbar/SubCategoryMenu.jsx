import React from "react";

const SubCategoryMenu = ({ selectedCategory, subCategories, setSelectedCategory }) => (
  selectedCategory && (
    <div
      className="flex w-full justify-between"
      onMouseEnter={() => setSelectedCategory(selectedCategory)}
      onMouseLeave={() => setSelectedCategory(null)}
    >
      <div className="flex flex-wrap gap-6">
        {subCategories.map((submenu, index) => (
          <div key={index} className="w-1/8 mx-2">
            <a className="font-medium text-gray-700" href={"/" + submenu.id}>
              {submenu.name}
            </a>
            <ul className="leading-6 text-sm">
              {submenu.subCategories.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <a href={"/" + item.id}>{item.name}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
);

export default SubCategoryMenu;
