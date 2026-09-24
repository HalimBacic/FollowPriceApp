import React from "react";
import "./SearchStyle.css";
import { useNavigate } from "react-router-dom";
import UtilService from "../../util/UtilService";

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
        src={UtilService.getProductImagePath(item.product.barcode)}
        className="productImage"
        alt={item.product.name}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = UtilService.getSampleImagePath(
            item.product.producttype
          );
        }}
      />

      <div className="basic-info">
        <h4 className="result-title">{item.product.name}</h4>
        <p className="result-code">Barcode: {item.product.barcode}</p>
      </div>
    </button>
  );
};

export default SearchItem;
