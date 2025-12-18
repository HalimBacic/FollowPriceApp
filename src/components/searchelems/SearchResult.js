import React from "react";
import SearchItem from "./SearchItem";
import "./SearchStyle.css";

const SearchResult = ({ results, isLoading }) => {
  return (
    <div className="search-overlay">
      <div className="search-overlay-content">
        {isLoading && <p>Loading...</p>}

        {!isLoading && results.length === 0 && <p>No results</p>}

        {results.map((item) => (
          <SearchItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
