import React from "react";

const CardImage = (prop) => (
  <a
    className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
    href={`/detail/${prop.id}`}
  >
    <img className="object-cover" src={prop.imageUrl} alt="product image" />
  </a>
);

export default CardImage;
