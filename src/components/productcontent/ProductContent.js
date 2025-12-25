import style from "./Productcontent.module.css";
import ProductDataTemplate  from "../../templates/ProductDataTemplate";
import ProductCell from "../productcell/ProductCell";
import ProductPriceList from "./ProductPriceList";
// import * as service from "../../service/priceService";

function ProductContent({barcode}) {
  // const [productDetails, setProductDetails] = useState(ProductDataTemplate);
  // const [data, setdata] = useState([])

  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     const prices = await service.etPricesByBarcode(barcode);
  //     setdata(prices)
  //   }
  //   fetchData()
  // }, [])

  const productDetails = ProductDataTemplate; // Za sada koristimo statički template
  return (
    <div>
      <table className={style.productGrid}> 
        <tbody>
          <tr>
            {/* Dodajemo klasu za ćelije */}
            <td className={style.gridCell}>{productDetails.product.name}</td>
            <td className={style.gridCell}>{productDetails.product.barcode}</td>
          </tr>
          <tr>
            <td className={style.gridCell}>
              <img src={`${process.env.PUBLIC_URL}/assets/${barcode}.png`}  alt="Milk" className={style.productImage} />
            </td>
            <td className={style.gridCell}>
              <ProductCell data={productDetails.product} />
            </td>
          </tr>
        </tbody>
      </table>
      <ProductPriceList productsprices={productDetails.prices} />
    </div>
  );
}

export default ProductContent;
