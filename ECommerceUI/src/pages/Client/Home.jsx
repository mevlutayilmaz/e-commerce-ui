import React, { useState, useEffect } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import Card from "../../components/Card/Card";
import { getAllProduct } from "../../api/products";
import Loading from '../../components/Loading';
import Pagination from '../../components/Pagination';

const ITEMS_PER_PAGE = 20;
const optionItems = [
  { label: "Yeniden Eskiye", sortBy: "created date", isAscending: false },
  { label: "Eskiden Yeniye", sortBy: "created date", isAscending: true },
  { label: "Fiyata Göre Artan", sortBy: "price", isAscending: true },
  { label: "Fiyata Göre Azalan", sortBy: "price", isAscending: false },
];

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get("page")) || 1);
  const [pageCount, setPageCount] = useState(1);
  const [sortOption, setSortOption] = useState();
  const [sortBy, setSortBy] = useState();
  const [isAscending, setIsAscending] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const selectedOption = optionItems.find(
      (option) => option.label === sortOption
    );
    if (selectedOption) {
      setSortBy(selectedOption.sortBy);
      setIsAscending(selectedOption.isAscending);
    }
  }, [sortOption]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getAllProduct(
          currentPage,
          ITEMS_PER_PAGE,
          categoryId,
          sortBy,
          isAscending
        );
        setProducts(data.products);
        const totalCount = data.totalCount;
        setPageCount(Math.ceil(totalCount / ITEMS_PER_PAGE));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, categoryId, sortBy, isAscending]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    sortOption
      ? setSearchParams({ sort: sortOption, page: pageNumber })
      : setSearchParams({ page: pageNumber });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSortChange = (event) => {
    const newSortOption = event.target.value;
    setSortOption(newSortOption);
    setCurrentPage(1);
    setSearchParams({ sort: newSortOption });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="flex justify-between items-center p-4">
        <select
          value={sortOption}
          onChange={handleSortChange}
          className="p-2 border border-gray-300 rounded"
        >
          {optionItems.map((option, index) => (
            <option value={option.label} key={index}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
        {products.map((product) => (
          <Card
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            imageUrl={product.imageUrl}
            rating={product.rating}
            ratingCount={product.ratingCount}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        pageCount={pageCount}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Home;
