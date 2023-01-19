import React, { useState, createContext } from "react";
import { CartItem, CartItems } from "../utils/types";


export const CartContext = createContext({
    cart: [],
    setCart: (item: any) => { },
    addToCart: (product: CartItem) => { }
});

export const CartWrapper = ({ children }: any) => {

    const [cart, setCart] = useState<any>([]);

    React.useEffect(() => {

    }, [])

    React.useEffect(() => {

    }, [cart, 'cart'])

    function addToCart(product: CartItem) {

        setCart((prev: any) => {
            const existing = cart.find((item: CartItem) => item.id === product.id && item.combo?.size === product.combo?.size && item.combo?.drink === product.combo?.drink && item.combo?.side === product.combo?.side);

            return existing
                ? [...cart.map((item: CartItem) => item.id === product.id
                    ? { ...item, qty: item.qty + 1 }
                    : item,
                ),
                ]
                : [...prev, { ...product, qty: 1 }]

        })



    }


    return (
        <CartContext.Provider value={{ cart, setCart, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};

export function useCartContext() {
    return React.useContext(CartContext)
}