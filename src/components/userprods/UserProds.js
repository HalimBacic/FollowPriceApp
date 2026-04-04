import React from "react";
import { Button } from "@mui/material";
import { BsTrash } from "react-icons/bs";
import "./UserProds.css";

const ArrowIcon = ({ isDown }) => (
  <span
    className={`material-icons ${isDown ? "arrow--down" : "arrow--up"}`}
    style={{ fontSize: 18 }}
  >
    {isDown ? "arrow_downward" : "arrow_upward"}
  </span>
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
        <div className="card__store-info">
          <p className="card__store-name">{store.store?.name}</p>
          <p className="card__address">
            <span
              className="material-icons"
              style={{ fontSize: 14, verticalAlign: "middle", marginRight: 4 }}
            >
              location_on
            </span>
            {store.store?.address}, {store.store?.city}
          </p>
        </div>
        <Button
          variant="contained"
          onClick={(e) =>{ 
            e.stopPropagation();
            onDelete(product.barcode, email, store.store?.id)
          }}
          startIcon={<BsTrash size={16} />}
          sx={{
            backgroundColor: "#FFC145",
            color: "#000",
            fontFamily: "Figtree, sans-serif",
            fontWeight: "600",
            whiteSpace: "nowrap",
            "&:hover": {
              backgroundColor: "#e6ac3a",
            },
          }}
        >
          Ukloni
        </Button>
      </div>
    </div>
  );
};

export default UserProds;
