const ProductImage = ({ imageUrl }) => {
    return (
      <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
        <img
          className="w-full dark:hidden"
          src={imageUrl}
          alt="Product Image"
        />
      </div>
    );
  };
  
  export default ProductImage;
  