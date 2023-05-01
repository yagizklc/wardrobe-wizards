
// An enum with all the types of actions to use in our reducer
export enum ActionKind {
  CART_ADD_ITEM = 'CART_ADD_ITEM',
  CART_REMOVE_ITEM = 'CART_REMOVE_ITEM'
}

// An interface for our actions
export interface Action {
  type: ActionKind;
  payload: CartItem;
}


export type CartItem = {
  name: string;
  slug: string;
  quantity: number;
  price: number;
  image: string;
  countInStock: number;

  // add any other properties here
};

export type Cart = {
  cartItems: CartItem[];
  // add any other properties here
};


