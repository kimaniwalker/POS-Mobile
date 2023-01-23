import React from 'react'
import { ScrollView } from 'react-native'
import styled from 'styled-components/native'
import { useCartContext } from '../../context/cart'
import { Colors } from '../../styles/Colors'
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
        <ScrollView >

        <Content>

        {cart.map((item: CartItem, index) => (
            <CartThumbnail specialMessage={item.specialMessage} key={item.id} id={item.id} name={item.name} price={item.price} qty={item.qty} image="" />
            ))}  
        </Content>
        </ScrollView>

        
        <Checkout>
            <TotalWrapper>
                <Title>Total: </Title>
            <Title>{total}</Title>
            </TotalWrapper>
            <ButtonWrapper>

        <StyledButton disabled={loading} buttonTitle="Checkout" onPress={pay} />    
            </ButtonWrapper>
            </Checkout>  
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
const Checkout =styled.View`
    display: flex;
    width: 100%;
    padding: 16px 16px;
    align-items: center;
    border-radius: 8px;
    margin: 8px 0;
`
const Content = styled.View`
    flex: 1;
`
const TotalWrapper = styled.View`
    border-radius: 8px;
    padding: 8px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    width: 100%;
    max-width: 325px;
`
const ButtonWrapper = styled.View`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`