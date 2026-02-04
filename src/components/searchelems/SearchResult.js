import React from "react";
import SearchItem from "./SearchItem";
import "./SearchStyle.css";

const SearchResult = ({ results, isLoading }) => {

  console.log("Search results:", results);

  return (
    <div className="search-overlay">
      <div className="search-overlay-content">
        {isLoading && <p>Loading...</p>}

        {!isLoading && results.prices && results.prices.length === 0 && <p>No results</p>}

        {results.prices && results.prices.map((item) => (
          <SearchItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
