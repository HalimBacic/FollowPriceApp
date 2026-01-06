import React from "react";
import "./ProductPriceCell.css";

const PriceInfo = ({ product }) => {
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

        <div className="price-row date">
          <span>Change date </span>
          <span>{formatDate(product.lastchange)}</span>
        </div>
      </div>
    </div>
  );
};

export default PriceInfo;
