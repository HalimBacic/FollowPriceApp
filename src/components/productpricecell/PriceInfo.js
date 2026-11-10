import React from "react";
import "./ProductPriceCell.css";
import { useAuth } from "../authsuccess/AuthContext";
import productService from "../../service/ProductService";
import { BsCart3 } from "react-icons/bs";
import { Button, Tooltip } from "@mui/material";
import LocationOnOutlined from "@mui/icons-material/LocationOnOutlined";

const PriceInfo = ({ product, barcode }) => {
  const { user, addCartItem, removeCartItem, isInCart } = useAuth();
  const storeId = product?.store?.id;
  const inCart = isInCart(barcode, storeId);

  const currentPrice = Number(product.price) || 0;
  const previousPrice = Number(product.oldprice) || 0;

  const isValidPrice = !isNaN(currentPrice) && !isNaN(previousPrice);
  const priceIncreased = isValidPrice ? currentPrice > previousPrice : false;
  const priceChange = isValidPrice
    ? (((currentPrice - previousPrice) / previousPrice) * 100).toFixed(1)
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

  const showStoreLocation = (store) => {};

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    await productService.addProductForUser(barcode, user.email, storeId);
    addCartItem(barcode, storeId);
  };

  const handleRemoveFromCart = async (e) => {
    e.stopPropagation();
    await productService.deleteProdForUser(barcode, user.email, storeId);
    removeCartItem(barcode, storeId);
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
        <div className="store-city-row">
          <div className="store-city">{product.store.city}</div>
          <Tooltip title="Prikaži lokaciju trgovine">
            <Button
              variant="outlined"
              size="small"
              aria-label="Prikaži lokaciju trgovine"
              onClick={(e) => {
                e.stopPropagation();
                showStoreLocation(product.store);
              }}
              startIcon={<LocationOnOutlined sx={{ fontSize: 20 }} />}
              sx={{
                minWidth: 0,
                px: 0.75,
                py: 0.15,
                fontSize: "0.65rem",
                fontWeight: 700,
                lineHeight: 1.2,
                textTransform: "none",
                color: "#E67E22",
                borderColor: "#E67E22",
                borderRadius: "6px",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.25)",
                "& .MuiButton-startIcon": {
                  marginRight: "4px",
                  marginLeft: 0,
                },
                "&:hover": {
                  color: "#D35400",
                  borderColor: "#D35400",
                  backgroundColor: "rgba(230, 126, 34, 0.08)",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              Location
            </Button>
          </Tooltip>
        </div>
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
        {user && !inCart && (
          <Button
            variant="contained"
            onClick={handleAddToCart}
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
          </Button>
        )}

        {user && inCart && (
          <Button
            variant="contained"
            onClick={handleRemoveFromCart}
            startIcon={<BsCart3 size={20} />}
            sx={{
              backgroundColor: "#ff4545ff",
              color: "#000",
              fontFamily: "Figtree, sans-serif",
              fontWeight: "600",
              "&:hover": {
                backgroundColor: "#e6ac3a",
              },
            }}
          >
            Remove from cart
          </Button>
        )}

        <div className="price-row date">
          <span>Change date </span>
          <span>{formatDate(product.lastchange)}</span>
        </div>
      </div>
    </div>
  );
};

export default PriceInfo;
