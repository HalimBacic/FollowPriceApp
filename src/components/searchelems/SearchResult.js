import React from "react";
import SearchItem from "./SearchItem";
import "./SearchStyle.css";

const SearchResult = ({ results, isLoading }) => {
  const prices = results?.prices ?? [];

  return (
    <div className="search-overlay">
      <div className="search-overlay-content">
        <div className="search-results-header">
          <h3 className="search-results-title">Rezultati pretrage</h3>
          {!isLoading && <span className="search-results-count">{prices.length}</span>}
        </div>

        {isLoading && <p className="search-state">Loading...</p>}

        {!isLoading && prices.length === 0 && <p className="search-state">No results</p>}

        {prices.map((item) => (
          <SearchItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
