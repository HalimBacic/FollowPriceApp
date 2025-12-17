import React from "react";
import "./SearchStyle.css";

const SearchItem = ({item}) => {

  console.log(item);

  return (
    <div>
      <div className="result-item">
        <h4>{item.product.name}</h4>
        <p>{item.product.barcode}</p>
      </div>
    </div>
  );
};

export default SearchItem;
