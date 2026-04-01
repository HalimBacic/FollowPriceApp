import React from "react";

const ArrowIcon = ({ isDown }) => (
  <span
    className={`material-icons ${isDown ? "arrow--down" : "arrow--up"}`}
    style={{ fontSize: 18 }}
  >
    {isDown ? "arrow_downward" : "arrow_upward"}
  </span>
);

const CartIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M2 3.5h10M5.5 3.5V2.5a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v1M4 3.5l.5 7.5a.5.5 0 00.5.5h4a.5.5 0 00.5-.5L10 3.5"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ImagePlaceholder = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <rect
      x="4"
      y="8"
      width="32"
      height="24"
      rx="3"
      stroke="#aaa"
      strokeWidth="1.5"
      fill="white"
    />
    <circle cx="14" cy="17" r="4" stroke="#aaa" strokeWidth="1.5" fill="none" />
    <path
      d="M4 28 L13 19 L20 26 L27 20 L36 28"
      stroke="#aaa"
      strokeWidth="1.5"
      fill="none"
      strokeLinejoin="round"
    />
  </svg>
);

const UserProds = ({ data, onDelete }) => {
  const { email, product, store } = data;
  const priceDown = store.price < store.oldprice;
  return (
        <div className="card">
      <div className="card__header">
        <span className="card__header-name">{product.name}</span>
        <span className="card__header-barcode">{product.barcode}</span>
      </div>

      <div className="card__middle">
        <div className="card__image">
          <ImagePlaceholder />
        </div>
        <div className="card__prices">
          <div className="card__old-price-row">
            <span className="card__old-price">{store.oldprice} KM</span>
            <ArrowIcon isDown={priceDown} />
          </div>
          <span className="card__new-price">{store.price} KM</span>
        </div>
      </div>

      <div className="card__footer">
        <div>
          <p className="card__store-name">{store.store?.name}</p>
          <p className="card__address">{store.store?.address}, {store.store?.city}</p>
        </div>
        <button
          className="card__delete-btn"
          onClick={() => onDelete(email, product.barcode, store.store?.id)}
        >
          <span className="material-icons" style={{ fontSize: 16 }}>shopping_cart</span>
          Ukloni
        </button>
      </div>
    </div>
  );
};

export default UserProds;
