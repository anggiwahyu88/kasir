import { useModalDispatch, useContentModal } from "@/context/CartContext";
import { rupiahConvert } from "@/helper/utilts";
import styles from "./index.module.css";

const ModalCheckout = () => {
  const onModalDispatch = useModalDispatch();
  const contentModal = useContentModal();

  const total_price_convert = rupiahConvert(`${contentModal.total_price}`);
  const paid_amount_convert = rupiahConvert(`${contentModal.paid_amount}`);
  const change_convert = rupiahConvert(`${contentModal.change}`);

  const handleOffModal = () => {
    onModalDispatch({
      type: "off",
    });
  };
  return (
    <div className={styles.modal}>
      <div className={styles["modal__card"]}>
        <div className={styles["modal__card__nomor-order"]}>
          <p>No Order {contentModal.no_order}</p>
        </div>
        <div className={styles["modal__card__detail-payment"]}>
          <div className={styles["modal__card__detail-payment__key"]}>
            <p>Total Belanja</p>
            <p>Total Dibayar</p>
            <p>Uang Kembali</p>
          </div>
          <div className={styles["modal__card__detail-payment__value"]}>
            <p>{total_price_convert}</p>
            <p>{paid_amount_convert}</p>
            <p>{change_convert}</p>
          </div>
        </div>
        <div className={styles["modal__card__button"]}>
          <button onClick={() => handleOffModal()}>Selesai</button>
        </div>
      </div>
    </div>
  );
};

export default ModalCheckout;
