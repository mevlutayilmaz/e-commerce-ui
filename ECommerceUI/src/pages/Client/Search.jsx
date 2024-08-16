import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Card from '../../components/Card/Card';
import Pagination from '../../components/Pagination';
import Loading from '../../components/Loading';
import { searchProduct } from '../../api/products';

const ITEMS_PER_PAGE = 20;

const SearchPage = () => {
  const { query } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page')) || 1);
  const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const data = await searchProduct(currentPage, ITEMS_PER_PAGE, query);
        setProducts(data.products);
        const totalCount = data.totalCount;
        setPageCount(Math.ceil(totalCount / ITEMS_PER_PAGE));
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query, currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setSearchParams({ page: pageNumber });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      {products.length > 0 ? (
        <>
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
        </>
      ) : (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl font-semibold">No products found.</p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
