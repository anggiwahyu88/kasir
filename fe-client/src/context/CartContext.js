import React, { createContext, useContext, useReducer } from "react";
import { rupiahConvert } from "@/helper/utilts";

const CartContext = createContext(null);
const CartDispatchContext = createContext(null);
const ModalContext = createContext(null);
const ModalDispatchContext = createContext(null);
const ContentModalContext = createContext(null);
const ContentModalDispatchContext = createContext(null);

function onModelReducer(state, action) {
  switch (action.type) {
    case "on": {
      return true;
    }
    case "off": {
      return false;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

function contentsReducer(state, action) {
  switch (action.type) {
    case "add-content-modal": {

      return {
        ...state,
        no_order: action.payload.no_order,
        paid_amount: action.payload.paid_amount,
        change: action.payload.change,
        paid_amount_convert: action.payload.paid_amount_convert,
        total_price: action.payload.total_price,
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

function cartsReducer(state, action) {
  switch (action.type) {
    case "add": {
      const index = state.findIndex((obj) => obj.id === action.payload.id);
      if (index === -1) {
        return [...state, { ...action.payload, quantity: 1 }];
      } else {
        return state.map((obj) => {
          if (obj.id === action.payload.id) {
            return { ...obj, quantity: obj.quantity + 1 };
          } else {
            return obj;
          }
        });
      }
    }
    case "decrease": {
      const index = state.findIndex((obj) => obj.id === action.payload.id);
      if (index !== -1) {
        if (state[index].quantity === 1) {
          return state.filter((obj) => obj.id !== action.payload.id);
        } else {
          return state.map((obj) => {
            if (obj.id === action.payload.id) {
              return { ...obj, quantity: obj.quantity - 1 };
            } else {
              return obj;
            }
          });
        }
      }
    }
    case "clear": {
      return [];
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

const initialStateCarts = [];
const initialStateContentsModal = {
  no_order: 0,
  total_price: 0,
  paid_amount_convert: "Rp. ",
  paid_amount: 0,
  change: 0,
};

const CartProvider = ({ children }) => {
  const [carts, dispatchCarts] = useReducer(cartsReducer, initialStateCarts);
  const [contentsModal, dispatchContentsModal] = useReducer(
    contentsReducer,
    initialStateContentsModal
  );
  const [onModal, dispatchOnModal] = useReducer(onModelReducer, false);

  return (
    <CartContext.Provider value={carts}>
      <CartDispatchContext.Provider value={dispatchCarts}>
        <ModalContext.Provider value={onModal}>
          <ModalDispatchContext.Provider value={dispatchOnModal}>
            <ContentModalContext.Provider value={contentsModal}>
              <ContentModalDispatchContext.Provider
                value={dispatchContentsModal}
              >
                {children}
              </ContentModalDispatchContext.Provider>
            </ContentModalContext.Provider>
          </ModalDispatchContext.Provider>
        </ModalContext.Provider>
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
};

export default CartProvider;

export function useCart() {
  return useContext(CartContext);
}

export function useCartDispatch() {
  return useContext(CartDispatchContext);
}

export function useModal() {
  return useContext(ModalContext);
}

export function useModalDispatch() {
  return useContext(ModalDispatchContext);
}

export function useContentModal() {
  return useContext(ContentModalContext);
}

export function useContentModalDispatch() {
  return useContext(ContentModalDispatchContext);
}
