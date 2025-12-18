import React from "react";
import "./SearchStyle.css";
import { useNavigate } from "react-router-dom";

const SearchItem = ({item}) => {

  const navigate = useNavigate();

  const gotoProductPage = (e) => {
    e.stopPropagation();
    console.log('Navigating to product page for barcode:', item.product.barcode);
    navigate('/product/' + item.product.barcode);
  }

  return (
    <div onClick={gotoProductPage}>
      <div className="result-item">
        <h4>{item.product.name}</h4>
        <p>{item.product.barcode}</p>
      </div>
    </div>
  );
};

export default SearchItem;
