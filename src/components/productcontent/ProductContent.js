import style from "./Productcontent.module.css";
import ProductCell from "../productcell/ProductCell";
import ProductPriceList from "./ProductPriceList";
import React, { useState, useEffect, useRef } from "react";
import service from "../../service/ProductService";
import PaginationComponent from "../../components/pagination/PaginationComponent";
import SortComponent from "../../components/sortcomponent/SortComponent";
import JsBarcode from "jsbarcode";

function ProductContent({ barcode }) {
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(null);
  const barcodeRef = useRef(null);

  async function changePage(newPage) {
    setPage(newPage);
    const prices = await service.getPricesByBarcode(barcode, newPage);
    setdata(prices);
  }

  function handleSort(sorts) {
    setSort(sorts);
    console.log("Sorting by:", sort);
  }
  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data for barcode:", barcode);
      const prices = await service.getPricesByBarcode(barcode, 1);
      setdata(prices);
      setLoading(false);
      console.log(prices);
    };
    fetchData();
  }, [barcode]);

  const displayBarcode = data?.product?.barcode || barcode;

  useEffect(() => {
    if (!barcodeRef.current || !displayBarcode || loading) return;

    try {
      JsBarcode(barcodeRef.current, String(displayBarcode), {
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
  }, [displayBarcode, loading]);

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
            <td className={style.gridCell}>
              <div className={style.barcodeBlock}>
                <svg ref={barcodeRef} className={style.barcodeSvg} />
                <div className={style.barcode}>{displayBarcode}</div>
              </div>
            </td>
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
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", margin: "10px" }}>
        <PaginationComponent
          page={page}
          totalPages={10}
          onPageChange={changePage}
        />
        <SortComponent
          onChange={handleSort}
          options={[{ label: "Price", value: "price" }]}
        ></SortComponent>
      </div>
      <ProductPriceList productsprices={data} barcode={barcode}/>
    </div>
  );
}

export default ProductContent;
