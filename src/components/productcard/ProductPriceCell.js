import React from 'react'
import style from './ProductPriceCell.module.css';

const ProductPriceCell = ({currentPrice, oldPrice}) => {
  if (!oldPrice) {
    return (
      <div className={style.priceContainer}>
        <span className={style.currentPriceOnly}>{currentPrice}</span>
      </div>
    );
  }

  // Određivanje promjene i stila
  let trendIndicator = null;
  let indicatorStyle = '';

  if (currentPrice > oldPrice) {
    trendIndicator = '▲'; 
    indicatorStyle = style.redUp; 
  } else if (currentPrice < oldPrice) {
    trendIndicator = '▼'; 
    indicatorStyle = style.greenDown; 
  }

  return (
    <div className={style.priceContainer}>
      <span className={style.currentPrice}>{currentPrice}</span>
      <div className={style.oldPriceWrapper}>
        <span className={style.oldPrice}>{oldPrice}</span>
        
        {trendIndicator && (
          <span className={`${style.indicator} ${indicatorStyle}`}>
            {trendIndicator}
          </span>
        )}
      </div>
    </div>
  );
}

export default ProductPriceCell
