import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../api/products";
import ProductImage from "../../components/ProductDetail/ProductDetailImage";
import ProductInfo from "../../components/ProductDetail/ProductDetailInfo";
import QuantityInput from "../../components/ProductDetail/QuantityInput";
import ProductActions from "../../components/ProductDetail/ProductDetailActions";
import ProductDescription from "../../components/ProductDetail/ProductDetailDescription";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data.product);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value, 10));
    setQuantity(value);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          <ProductImage imageUrl={product.imageUrl} />
          <div className="mt-6 sm:mt-8 lg:mt-0">
            <ProductInfo product={product} />
            <QuantityInput
              quantity={quantity}
              onQuantityChange={handleQuantityChange}
              setQuantity={setQuantity}
            />
            <ProductActions productId={id} quantity={quantity}/>
            <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />
            <ProductDescription />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
