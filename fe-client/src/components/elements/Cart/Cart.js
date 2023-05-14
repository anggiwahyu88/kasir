import {
  useCart,
  useCartDispatch,
  useModalDispatch,
  useContentModalDispatch,
  useContentModal,
} from "@/context/CartContext";
import React, { useState } from "react";
import { rupiahConvert } from "@/helper/utilts";
import Image from "next/image";
import styles from "./index.module.css";
import api from "@/api";

const Cart = () => {
  const carts = useCart();
  const cartsDispatch = useCartDispatch();
  const onModalDispatch = useModalDispatch();
  const contentsModalDispatch = useContentModalDispatch();
  const contentModal = useContentModal();
  const [loading, setLoading] = useState(false);

  const handleAddToCart = (product) => {
    cartsDispatch({
      type: "add",
      payload: product,
    });
  };

  const handleDecreaseCart = (product) => {
    cartsDispatch({
      type: "decrease",
      payload: product,
    });
  };

  const handleClearCart = () => {
    cartsDispatch({
      type: "clear",
    });
  };
  const handleOnModalDispatch = () => {
    onModalDispatch({
      type: "on",
    });
  };
  const handleContentsModalDispatch = (content) => {
    contentsModalDispatch({
      type: "add-content-modal",
      payload: content,
    });
  };

  const total_price = carts.reduce((acc, item) => {
    const subtotal = item.price * item.quantity;
    return acc + subtotal;
  }, 0);
  const total_price_convert = rupiahConvert(`${total_price}`);

  const handleChange = (price) => {
    handleContentsModalDispatch({
      paid_amount_convert: rupiahConvert(price),
      paid_amount: price.replace(/[^0-9]/g, ""),
    });
  };

  const handleBayar = async (event) => {
    event.preventDefault();
    setLoading(true);
    let products = [];
    await carts.map((cart) => {
      products.push({ id: cart.id, quantity: cart.quantity });
    });

    try {
      const response = await api.post("/transactions", {
        total_price,
        paid_amount: contentModal.paid_amount,
        products,
      });
      const no_order = await response.data.payload.map((obj) => {
        return obj.no_order;
      });
      handleContentsModalDispatch({
        no_order,
        total_price,
        paid_amount_convert: "Rp. ",
        paid_amount: parseFloat(contentModal.paid_amount),
        change: contentModal.paid_amount - total_price,
      });
      handleClearCart();
      handleOnModalDispatch();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.cart}>
      <h3>Cart</h3>
      <div className={styles["cart__cart-list"]}>
        {carts.map((cart, index) => {
          return (
            <div key={index} className={styles["cart-item"]}>
              <div className={styles["cart-item__image"]}>
                <Image
                  src={cart.img_product}
                  alt={cart.name}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className={styles["cart-item__desc"]}>
                <p>{cart.name}</p>
                <p>{cart.price}</p>
              </div>
              <div className={styles["cart-item__action"]}>
                <button onClick={() => handleDecreaseCart(cart)}>-</button>
                <p>{cart.quantity}</p>
                <button onClick={() => handleAddToCart(cart)}>+</button>
              </div>
            </div>
          );
        })}
        {carts[0] ? (
          <p style={{ fontSize: "20px", marginTop: "10px" }}>
            Total Belanja: {total_price_convert}
          </p>
        ) : (
          ""
        )}
      </div>
      {carts[0] ? (
        <form className={styles["cart-form"]}>
          <input
            type="text"
            onChange={(event) => handleChange(event.target.value)}
            value={contentModal.paid_amount_convert}
            className={styles["cart-form__input"]}
          />
          <button onClick={(event) => handleBayar(event)} disabled={loading}>
            Bayar
          </button>
        </form>
      ) : (
        ""
      )}
    </div>
  );
};

export default Cart;
