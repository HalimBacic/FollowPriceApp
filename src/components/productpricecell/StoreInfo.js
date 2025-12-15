import React from 'react'
import './ProductPriceCell.module.css'

const StoreInfo = ({store}) => {
  if (!store) {
    return (
      <div className="store-info">
        <p className="store-error">Podaci o trgovini nisu dostupni</p>
      </div>
    );
  }

  return (
    <div className="store-info">
      <h3 className="store-name">{store.name || 'Nepoznata trgovina'}</h3>
      <p className="store-address">{store.address || 'Adresa nije dostupna'}</p>
      <p className="store-city">{store.city || 'Grad nije dostupan'}</p>
    </div>
  );
}

export default StoreInfo