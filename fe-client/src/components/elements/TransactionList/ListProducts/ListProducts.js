import styles from "./index.module.css";

const ListProducts = ({ products }) => {
  console.log(products);
  return (
    <ol>
      {products.map((product, index) => {
        return (
          <div key={index} className={styles["list-products"]}>
          <div className={styles["list-products__name"]}>
            <li>{product.product}</li>
            <p>||</p>
          </div>
          <div className={styles["list-products__quantity"]}>
            <p>
              {product.quantity} pcs
            </p>
          </div>
          </div>
        );
      })}
    </ol>
  );
};

export default ListProducts;
