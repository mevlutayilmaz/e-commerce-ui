import StarRating from "../Card/StarRating";

const ProductInfo = ({ product }) => {
  return (
    <>
      <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
        {product.name}
      </h1>
      <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
        <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
          {Intl.NumberFormat("tr-TR").format(product.price)} TL
        </p>
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <div className="flex items-center gap-1">
            <StarRating rating={product.rating / 20} />
            <span className="px-2.5 py-0.5 text-xs text-gray-500">
              ({product.ratingCount})
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductInfo;
