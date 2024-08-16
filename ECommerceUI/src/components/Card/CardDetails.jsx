import React from "react";
import StarRating from "./StarRating";

const CardDetails = (prop) => (
  <>
    <a href={`/detail/${prop.id}`}>
      <h5 className="text-lg tracking-tight text-slate-900 line-clamp-2 h-14">{prop.name}</h5>
    </a>
    <div className="flex items-center mt-2.5 mb-5">
      <StarRating rating={prop.rating / 20} />
      <span className="px-2.5 py-0.5 text-xs text-gray-500">({prop.ratingCount})</span>
    </div>
    <div className="mt-2 mb-5 flex items-center justify-between">
      <p>
        <span className="text-2xl font-bold text-slate-900">
          {Intl.NumberFormat("tr-TR").format(prop.price)} TL
        </span>
      </p>
    </div>
  </>
);

export default CardDetails;
