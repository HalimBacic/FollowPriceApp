import React from "react";
import "./SearchStyle.css";
import { useNavigate } from "react-router-dom";

const SearchItem = ({ item }) => {
  const navigate = useNavigate();

  const gotoProductPage = (e) => {
    e.stopPropagation();
    console.log(
      "Navigating to product page for barcode:",
      item.product.barcode
    );
    navigate("/product/" + item.product.barcode);
  };

  return (
    <button className="result-item" onClick={gotoProductPage} type="button">
      <img
        src={`${process.env.PUBLIC_URL}/assets/${item.product.barcode}.png`}
        className="productImage"
        alt={item.product.name}
      />

      <div className="basic-info">
        <h4 className="result-title">{item.product.name}</h4>
        <p className="result-code">Barcode: {item.product.barcode}</p>
      </div>
    </button>
  );
};

export default SearchItem;
