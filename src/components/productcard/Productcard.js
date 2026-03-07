import style from "./Productcard.module.css";
import { useNavigate } from "react-router-dom";
import ProductPriceCell from "./ProductPriceCell";
import { BsCart3 } from "react-icons/bs";
import { Button } from "@mui/material";
import { useAuth } from "../authsuccess/AuthContext";
import productService from "../../service/ProductService";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("hr-BA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

const Productcard = ({ productdata }) => {
  const { user, logout, setHasCartItems } = useAuth();
  const navigate = useNavigate();
  const formattedLastChange = formatDate(productdata.lastchange);

  const goToProductPage = () => {
    navigate("/product/" + productdata.product.barcode);
  };

  return (
    <div className={style.card} onClick={goToProductPage}>
      {/* Naziv */}
      <div className={style.title}>{productdata.product.name}</div>

      <div className={style.centerContent}>
        <img
          src={`${process.env.PUBLIC_URL}/assets/${productdata.product.barcode}.png`}
          alt={productdata.product.name}
          className={style.productImage}
        />

        <ProductPriceCell
          currentPrice={productdata.price}
          oldPrice={productdata.oldprice}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          gap: "16px",
        }}
      >
        {/* Barcode i Datum - jedan ispod drugog */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className={style.barcode}>{productdata.product.barcode}</div>
          <div className={style.date}>{formattedLastChange}</div>
        </div>
      </div>
    </div>
  );
};

export default Productcard;
