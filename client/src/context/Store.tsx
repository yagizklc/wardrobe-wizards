import { createContext, useReducer, Dispatch } from 'react';
import { ActionKind, Action, CartItem, Cart } from "../types/shoppingCart"
import Cookies from "js-cookie"

type StoreContextType = {
  state: State;
  dispatch: Dispatch<Action>;
};

export const Store = createContext<StoreContextType>({} as StoreContextType);


interface State {
  cart: Cart;
  // add any other properties here
};

const initialState = {
  cart: Cookies.get('cart')
    ? JSON.parse(Cookies.get('cart')!)
    : { cartItems: [] },


};

type StoreProviderProps = {
  children: React.ReactNode;
};

function reducer(state: State, action: Action) {
  const { type, payload } = action;
  switch (type) {
    case ActionKind.CART_ADD_ITEM: {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item: any) => item.slug === newItem.slug
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item: any) =>
          item.name === existItem.name ? newItem : item
        )
        : [...state.cart.cartItems, newItem];
      Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case ActionKind.CART_REMOVE_ITEM: {
      const cartItems = state.cart.cartItems.filter(
        (item) => item.slug !== action.payload.slug
      );
      Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    default:
      return state;
  }
}

export function StoreProvider({ children }: StoreProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;;
}


