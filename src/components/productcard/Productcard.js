import React, { use } from "react";
import style from "./Productcard.module.css";
import { useNavigate } from "react-router-dom";
import ProductPriceCell from "./ProductPriceCell";


// Funkcija za formatiranje datuma
const formatDate = (dateString) => {
  // Parsira datum
  const date = new Date(dateString); 
  
  // Koristi lokalni format (npr. DD.MM.YYYY HH:MM)
  // Opcionalno možete dodati { hour: '2-digit', minute: '2-digit' } ako vam trebaju sati/minute
  return date.toLocaleDateString('hr-BA', { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit' 
  }); 
};

const Productcard = ({productdata}) => {
  // Formatiramo datum pre nego što ga koristimo
  const formattedLastChange = formatDate(productdata.lastchange);

  const navigate = useNavigate();

  const gotoporductpage = () => {
    navigate('/product/' + productdata.product.barcode);
  }

  return (
    <div className="productCard">
      <table className={style.table} onClick={gotoporductpage}>
        <tbody>
        <tr>
          <td colSpan="2">{productdata.product.name}</td>
        </tr>

        <tr>
          <td rowSpan="2" className={style.centeredCell}> 
            <img src={`${process.env.PUBLIC_URL}/assets/${productdata.product.barcode}.png`}   alt="Milk" className={style.productImage}/>
          </td>
          
          {/* Centriranje cene */}
          <td rowSpan="2" className={style.priceCell}>
            <ProductPriceCell currentPrice={productdata.price} oldPrice={productdata.oldprice} />
          </td>
        </tr>
        <tr></tr>
        <tr>
          <td className={style.dateCell}>{productdata.product.barcode}</td>
          {/* Prikaz formatiranog datuma */}
          <td className={style.dateCell}>{formattedLastChange}</td> 
        </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Productcard;