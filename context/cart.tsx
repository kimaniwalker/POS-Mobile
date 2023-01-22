import React, { useState, createContext } from "react";
import { CartItem, CartItems } from "../utils/types";


export const CartContext = createContext({
    cart: [],
    setCart: (item: any) => { },
    addToCart: (product: CartItem) => { },
    changeQty: (id: number | string, qty: number) => {},
    removeCartItem: (id: number | string) => {}

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

    function changeQty(id: number | string, qty: number) {

        if (qty === 0) return removeCartItem(id)

        setCart((prev: any) => [
            ...prev.map((item: CartItem) => item.id === id ? { ...item, qty } : item,)
        ])

        return null
       
    }

    function removeCartItem(id: string | number) {

        const result: CartItem = cart.filter((cartItem: CartItem)=> cartItem.id !== id)
        setCart(result)
        return result

    }

    return (
        <CartContext.Provider value={{ cart, setCart, addToCart, removeCartItem, changeQty }}>
            {children}
        </CartContext.Provider>
    );
};

export function useCartContext() {
    return React.useContext(CartContext)
}