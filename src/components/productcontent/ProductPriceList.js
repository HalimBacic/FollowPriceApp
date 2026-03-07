import React from 'react'
import './ProductList.css' 
import PriceInfo from '../productpricecell/PriceInfo';

const ProductPriceList = ({ productsprices, barcode }) => {

  console.log("ProductPriceList received productsprices:", productsprices);
    // Provjera da li niz postoji i ima elemente
  if (!productsprices || productsprices.length === 0) {
    return (
      <div className="products-list-empty">
        <p>Nema dostupnih proizvoda</p>
      </div>
    );
  }

  return (
    <div className="products-list">
      <div className="products-list-container">
        {productsprices.prices.map((product, index) => (
          <PriceInfo
            key={product.id || `product-${index}`} 
            product={product}
            barcode={barcode} 
          />
        ))}
      </div>
    </div>
  );
}

export default ProductPriceList
