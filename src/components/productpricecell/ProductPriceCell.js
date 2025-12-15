import React from 'react'
import './ProductPriceCell.module.css'
import StoreInfo from './StoreInfo'
import PriceInfo from './PriceInfo'

const ProductPriceCell = ({product}) => {
  if (!product) {
    return (
      <div className="product-card product-card-error">
        <p>Podaci o proizvodu nisu dostupni</p>
      </div>
    );
  }

  return (
    <div className="product-card">
      <div className="left-section">
        <StoreInfo store={product.store} />
      </div>
      <div className="right-section">
        <PriceInfo product={product} />
      </div>
    </div>
  );
}

export default ProductPriceCell
