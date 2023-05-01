import { Product } from "../../types/productType";
import Image from "next/image";
import { useContext } from "react";
import { Store } from "../../context/Store";
import { ActionKind, CartItem } from "../../types/shoppingCart";

type Props = {
    product: Product;
};


export default function ProductView({ product }: Props) {

    const { state, dispatch } = useContext(Store);
    const itemFromProduct: CartItem = {
        name: product.name,
        slug: product._id,
        price: product.initial_price,
        image: product.image,
        countInStock: product.stock_quantity,
        quantity: 1
    }

    const addToCartHandler = () => {
        const existItem = state.cart.cartItems.find((x) => x.slug === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;

        if (product.stock_quantity < quantity) {
            alert('Sorry. Product is out of stock');
            return;
        }

        dispatch({ type: ActionKind.CART_ADD_ITEM, payload: { ...itemFromProduct, quantity } });
    };

    const updateCartHandler = (item: CartItem, qty: string) => {
        const quantity = Number(qty);
        dispatch({ type: ActionKind.CART_ADD_ITEM, payload: { ...item, quantity } });
    };

    return (
        <div className="bg-white">
            <div className="pt-6">
                {/* Image gallery */}
                <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                    <div
                        className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block"
                    >
                        <img
                            src={product.image}
                            alt={product.image}
                            className="h-full w-full object-cover object-center"
                        />
                    </div>
                </div>

                {/* Product info */}
                <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
                    </div>

                    {/* Options */}
                    <div className="mt-4 lg:row-span-3 lg:mt-0">
                        <h2 className="sr-only">Product information</h2>
                        <p className="text-3xl tracking-tight text-gray-900">{product.initial_price}</p>

                        {/* Reviews */}
                        <form className="mt-10">

                            <button
                                onClick={addToCartHandler}
                                type="submit"
                                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Add to bag
                            </button>
                        </form>
                    </div>

                    <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                        {/* Description and details */}
                        <div>
                            <h3 className="sr-only">Description</h3>

                            <div className="space-y-6">
                                <p className="text-base text-gray-900">{product.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}