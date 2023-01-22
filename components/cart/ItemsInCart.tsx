import React from 'react'
import styled from 'styled-components/native'
import { useCartContext } from '../../context/cart'
import { Fonts } from '../../styles/Fonts'
import StyledButton from '../../styles/StyledButton'
import { CartItem, ItemsInCartProps } from '../../utils/types'
import CartThumbnail from './CartThumbnail'
import EmptyCart from './EmptyCart'


export default function ItemsInCart({loading, pay}: ItemsInCartProps) {
    
    const {cart} = useCartContext()
    const total = cart?.reduce((total: number, product: CartItem) => total + (product.price * product.qty), 0)
  

    if (cart.length < 1) return <EmptyCart />
    return (
        <>
        <CartTotal>
        <Title>{total}</Title>

        </CartTotal>
        {cart.map((item: CartItem, index) => (
            <CartThumbnail specialMessage={item.specialMessage} key={item.id} id={item.id} name={item.name} price={item.price} qty={item.qty} image="" />
        ))}    
        <StyledButton disabled={loading} buttonTitle="Checkout" onPress={pay} />    
        </>
    )
}
const Title = styled.Text`
font-size: 32px;
font-family: ${Fonts.italicBold};
`
const CartTotal = styled.View`
    width: 100%;
    height: 100px;
`
