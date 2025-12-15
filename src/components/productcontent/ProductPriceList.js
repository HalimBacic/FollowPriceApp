import React from 'react'
import './ProductList.css'
import PriceInfo from '../productpricecell/PriceInfo';

const ProductPriceList = ({ productsprices }) => {
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
        {productsprices.map((product, index) => (
          <PriceInfo
            key={product.id || `product-${index}`} 
            product={product} 
          />
        ))}
      </div>
    </div>
  );
}

export default ProductPriceList
