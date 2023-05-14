import ListProducts from "./ListProducts/ListProducts";
import styles from "./index.module.css";
import { rupiahConvert } from "@/helper/utilts";

const TransactionList = ({ transactions }) => {
  return (
    <div className={styles["transaction-list"]}>
      {transactions.map((transaction, index) => {
        const total_price_convert = rupiahConvert(`${transaction.total_price}`);
        const paid_amount_convert = rupiahConvert(`${transaction.paid_amount}`);
        return (
          <div className={styles["transaction-list__card"]} key={index}>
            <div className={styles["transaction-list__card__no-order"]}>
              <p>No Order: {transaction.no_order}</p>
            </div>
            <div
              className={styles["transaction-list__card__detail-transaction"]}
            >
              <div
                className={
                  styles[
                    "transaction-list__card__detail-transaction__total-price"
                  ]
                }
              >
                <p>Total Harga:</p>
                <span>{total_price_convert}</span>
              </div>
              <div
                className={
                  styles[
                    "transaction-list__card__detail-transaction__paid-amount"
                  ]
                }
              >
                 <p>Dibayar:</p>
                <span>{paid_amount_convert}</span>
              </div>
              <div
                className={
                  styles[
                    "transaction-list__card__detail-transaction__list-items"
                  ]
                }
              >
                <p>Items:</p>
                <ListProducts products={transaction.products}/>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TransactionList;
