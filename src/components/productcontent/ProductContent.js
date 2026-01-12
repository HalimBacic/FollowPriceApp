import style from "./Productcontent.module.css";
import ProductCell from "../productcell/ProductCell";
import ProductPriceList from "./ProductPriceList";
import React, { useState, useEffect } from "react";
import service from "../../service/ProductService";

function ProductContent({ barcode }) {
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data for barcode:", barcode);
      const prices = await service.getPricesByBarcode(barcode);
      setdata(prices);
      setLoading(false);
      console.log(prices);
    };
    fetchData();
  }, [barcode]);

  if (loading) {
    return <div className={style.loading}>Učitavanje...</div>;
  }

  if (!data) {
    return <div>Podaci nisu dostupni</div>;
  }

  return (
    <div>
      <table className={style.productGrid}>
        <tbody>
          <tr>
            {/* Dodajemo klasu za ćelije */}
            <td className={style.gridCell}>{data.product.name}</td>
            <td className={style.gridCell}>{data.product.barcode}</td>
          </tr>
          <tr>
            <td className={style.gridCell}>
              <img
                src={`${process.env.PUBLIC_URL}/assets/${barcode}.png`}
                alt="Milk"
                className={style.productImage}
              />
            </td>
            <td className={style.gridCell}>
              <ProductCell data={data.product} />
            </td>
          </tr>
        </tbody>
      </table>
      <ProductPriceList productsprices={data.prices} />
    </div>
  );
}

export default ProductContent;
