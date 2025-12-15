import React from "react";
import './ProductPriceCell.css'

const PriceInfo = ({ product }) => {
  const currentPrice = Number(product.price) || 0;
  const previousPrice = Number(product.oldprice) || 0;
  
  const isValidPrice = !isNaN(currentPrice) && !isNaN(previousPrice);
  const priceIncreased = isValidPrice ? currentPrice > previousPrice : false;
  const priceChange = isValidPrice ? 
    ((currentPrice - previousPrice) / previousPrice * 100).toFixed(1) : '0.0';

  const formatDate = (dateString) => {
    if (!dateString) return 'Datum nije dostupan';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('bs-BA', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch (error) {
      return 'Nevažeći datum';
    }
  };

  if (!isValidPrice) {
    return (
      <div className="price-info">
        <div className="price-error">Data about price not available</div>
      </div>
    );
  }

  return (
    <div className="price-info">
      <h1 className="store-name">{product.store.name}</h1>
      <h3 className="store-address">{product.store.address}</h3>
      <h4 className="store-city">{product.store.city}</h4>
      <table className="price-table">
        <tbody>
          <tr className="price-row">
            <td className="price-label">Current price:</td>
            <td className="price-value current">€{currentPrice.toFixed(2)}</td>
          </tr>
          <tr className="price-row">
            <td className="price-label">Old price:</td>
            <td className="price-value old">€{previousPrice.toFixed(2)}</td>
          </tr>
          <tr className="price-row">
            <td className="price-label">Difference:</td>
            <td className="price-value">
              <div className={`price-change ${priceIncreased ? "increase" : "decrease"}`}>
                <span className="arrow">{priceIncreased ? "↑" : "↓"}</span>
                <span className="change-percent">{Math.abs(priceChange)}%</span>
              </div>
            </td>
          </tr>
          <tr className="price-row">
            <td className="price-label">Change date:</td>
            <td className="price-value date">{formatDate(product.lastchange)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PriceInfo;
