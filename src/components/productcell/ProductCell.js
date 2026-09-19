import styles from "./ProductCell.module.css";
import UtilService from "../../util/UtilService";

const DATE_COLOR_CLASS = {
  red: styles.dateRed,
  orange: styles.dateOrange,
  yellow: styles.dateYellow,
  blue: styles.dateBlue,
};

const ProductCell = ({ data = {} }) => {
  const {
    producttype = "FOOD",
    producer = "Random Producer",
    weight = 100,
    expdate = "10.10.2025.",
  } = data;

  const urgencyColor = UtilService.getDateUrgencyColor(expdate);

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td className={styles.cellContainer}>
              <div className={styles.dataWrapper}>
                <p className={styles.dataRow}>
                  <span className={styles.label}>Type:</span>
                  <span className={styles.mainValue}>{producttype}</span>
                </p>

                <p className={styles.dataRow}>
                  <span className={styles.label}>Producer:</span>
                  <span>{producer}</span>
                </p>

                <p className={styles.dataRow}>
                  <span className={styles.label}>Weight:</span>
                  <span>{weight.toFixed(1)} kg</span>
                </p>

                <p className={styles.dataRowNoMargin}>
                  <span className={styles.label}>Expire date:</span>
                  <span className={`${styles.expireDate} ${DATE_COLOR_CLASS[urgencyColor]}`}>
                    {UtilService.formatDate(expdate)}
                  </span>
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
