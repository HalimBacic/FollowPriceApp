import React from "react";
import "./ProductPriceCell.css";
import { useAuth } from "../authsuccess/AuthContext";
import productService from "../../service/ProductService";
import { BsCart3 } from "react-icons/bs";
import { Button } from "@mui/material";


const addToCart = async (barcode, email, storeid) => {
  await productService.addProductForUser(barcode, email, storeid);
}

const PriceInfo = ({ product, barcode }) => {
    const { user, logout, setHasCartItems } = useAuth()
  const currentPrice = Number(product.price) || 0;
  const previousPrice = Number(product.oldprice) || 0;

  const isValidPrice = !isNaN(currentPrice) && !isNaN(previousPrice);
  const priceIncreased = isValidPrice ? currentPrice > previousPrice : false;
  const priceChange = isValidPrice
    ? ((currentPrice - previousPrice) / previousPrice * 100).toFixed(1)
    : "0.0";

  const formatDate = (dateString) => {
    if (!dateString) return "Datum nije dostupan";
    const date = new Date(dateString);
    return date.toLocaleDateString("bs-BA", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  if (!isValidPrice) {
    return (
      <div className="price-card error">
        Data about price not available
      </div>
    );
  }

  return (
    <div className="price-card">
      {/* Store info */}
      <div className="store-info">
        <div className="store-name">{product.store.name}</div>
        <div className="store-address">{product.store.address}</div>
        <div className="store-city">{product.store.city}</div>
      </div>

      {/* Prices */}
      <div className="price-section">
        <div className="price-row">
          <span>Current</span>
          <strong className="current">€{currentPrice.toFixed(2)}</strong>
        </div>

        <div className="price-row">
          <span>Old</span>
          <span className="old">€{previousPrice.toFixed(2)}</span>
        </div>

        <div className="price-row">
          <span>Difference</span>
          <div
            className={`price-change ${
              priceIncreased ? "increase" : "decrease"
            }`}
          >
            <span className="arrow">{priceIncreased ? "↑" : "↓"}</span>
            <span>{Math.abs(priceChange)}%</span>
          </div>
        </div>
        {user && <Button
          variant="contained"
          onClick={async (e) => {
            e.stopPropagation(); 
            console.log(" Adding to cart:", product);
            await addToCart(barcode, user.email, product.store.id);
            setHasCartItems(true)}}
          startIcon={<BsCart3 size={20} />}
          sx={{
            backgroundColor: "#FFC145",
            color: "#000",
            fontFamily: "Figtree, sans-serif",
            fontWeight: "600",
            "&:hover": {
              backgroundColor: "#e6ac3a",
            },
          }}
        >
          Add to cart
        </Button>}

        <div className="price-row date">
          <span>Change date </span>
          <span>{formatDate(product.lastchange)}</span>
        </div>
      </div>
    </div>
  );
};

export default PriceInfo;
