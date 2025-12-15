import React from "react";
import styles from "./ProductCell.module.css";

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

const ProductCell = ({ data = {} }) => {
  const {
    producttype = "FOOD",
    producer = "Random Producer",
    quantitytype = "kom",
    quantityprice = 1.1,
    weight = 100,
    diff = 0.5,
    expdate = "10.10.2025.",
  } = data;

  // Određivanje klase za prikaz razlike
  const diffClass = diff >= 0 ? styles.positiveDiff : styles.negativeDiff;
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td className={styles.cellContainer}>
              <div className={styles.dataWrapper}>
                {/* Tip Proizvoda */}
                <p className={styles.dataRow}>
                  <span className={styles.label}>Type:</span>
                  <span className={styles.mainValue}>{producttype}</span>
                </p>

                {/* Proizvođač */}
                <p className={styles.dataRow}>
                  <span className={styles.label}>Producer:</span>
                  <span>{producer}</span>
                </p>

                {/* Težina */}
                <p className={styles.dataRow}>
                  <span className={styles.label}>Weight:</span>
                  <span>{weight.toFixed(1)} kg</span>
                </p>

                {/* Datum Isteka */}
                <p className={styles.dataRowNoMargin}>
                  <span className={styles.label}>Expire date:</span>
                  <span>{formatDate(expdate)}</span>
                </p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductCell;
