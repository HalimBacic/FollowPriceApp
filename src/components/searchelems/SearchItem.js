import React from "react";
import "./SearchStyle.css";

const SearchItem = ({item}) => {
  return (
    <div>
      <div className="result-item">
        <h4>{item.name}</h4>
        <p>{item.barcode}</p>
      </div>
    </div>
  );
};

export default SearchItem;
