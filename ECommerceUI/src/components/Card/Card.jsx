import React from "react";
import CardImage from "./CardImage";
import CardDetails from "./CardDetails";
import CardButton from "./CardButton";

const Card = (prop) => {
  return (
    <div className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      <CardImage imageUrl={prop.imageUrl} id={prop.id} />
      <div className="mt-4 px-5 pb-5">
        <CardDetails
          id={prop.id}
          name={prop.name}
          rating={prop.rating}
          ratingCount={prop.ratingCount}
          price={prop.price}
        />
        <CardButton productId={prop.id}/>
      </div>
    </div>
  );
};

export default Card;
