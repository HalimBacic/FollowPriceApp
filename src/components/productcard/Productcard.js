import { useEffect, useRef } from "react";
import style from "./Productcard.module.css";
import { useNavigate } from "react-router-dom";
import ProductPriceCell from "./ProductPriceCell";
import UtilService from "../../util/UtilService";
import JsBarcode from "jsbarcode";

const DATE_COLOR_CLASS = {
  red: style.dateRed,
  orange: style.dateOrange,
  yellow: style.dateYellow,
  blue: style.dateBlue,
};

const Productcard = ({ productdata }) => {
  const navigate = useNavigate();
  const barcodeRef = useRef(null);
  const barcode = productdata.product.barcode;
  const formattedLastChange = UtilService.formatDate(productdata.lastchange);
  const urgencyColor = UtilService.getDateUrgencyColor(productdata.lastchange);

  useEffect(() => {
    if (!barcodeRef.current || !barcode) return;

    try {
      JsBarcode(barcodeRef.current, String(barcode), {
        format: "CODE128",
        displayValue: false,
        margin: 0,
        height: 36,
        width: 1.4,
        background: "transparent",
      });
    } catch (error) {
      console.error("Failed to render barcode:", error);
    }
  }, [barcode]);

  const goToProductPage = () => {
    navigate("/product/" + barcode);
  };

  return (
    <div className={style.card} onClick={goToProductPage}>
      <div className={style.titleRow}>
        <div className={style.title}>{productdata.product.name}</div>
        <div className={style.productType}>{productdata.product.producttype}</div>
      </div>

      <div className={style.centerContent}>
        <img
          src={UtilService.getProductImagePath(barcode)}
          alt={productdata.product.name}
          className={style.productImage}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = UtilService.getSampleImagePath(
              productdata.product.producttype
            );
          }}
        />

        <ProductPriceCell
          currentPrice={productdata.price}
          oldPrice={productdata.oldprice}
        />
      </div>

      <div className={style.footerRow}>
        <div className={style.dateBlock}>
          <div className={`${style.date} ${DATE_COLOR_CLASS[urgencyColor]}`}>
            {formattedLastChange}
          </div>
        </div>

        <div className={style.barcodeBlock}>
          <svg ref={barcodeRef} className={style.barcodeSvg} />
          <div className={style.barcode}>{barcode}</div>
        </div>
      </div>
    </div>
  );
};

export default Productcard;
