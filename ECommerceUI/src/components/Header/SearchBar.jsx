import React from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    navigate(`/search/${searchQuery}`);
  };

  return (
    <form className="flex items-center w-2/5" onSubmit={handleSearchSubmit}>
      <label htmlFor="simple-search" className="sr-only">Search</label>
      <div className="relative flex-grow">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <CiSearch className="w-5 h-5 text-gray-500" />
        </div>
        <input
          type="text"
          id="simple-search"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
      >
        <CiSearch className="w-5 h-5" />
      </button>
    </form>
  );
};

export default SearchBar;
