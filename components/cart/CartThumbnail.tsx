import React from 'react'
import { ImageBackground } from 'react-native'
import styled from 'styled-components/native'
import { Colors } from '../../styles/Colors'
import { Fonts } from '../../styles/Fonts'
import { CartThumbnailProps } from '../../utils/types'
import { Ionicons } from '@expo/vector-icons';
import { useCartContext } from '../../context/cart'

export default function CartThumbnail({ id, qty, name, specialMessage, price }: CartThumbnailProps) {

    const { removeCartItem } = useCartContext()


    return (
        <Wrapper>
            <Column>
                <Name>{name}</Name>
                <Description>{specialMessage}</Description>
                <Row>

                    <Description>{price}</Description>
                    <Description>qty: {qty}</Description>
                </Row>
            </Column>
            <IconWrapper onPress={() => removeCartItem(id)}>
                <CloseIcon name="close-circle-sharp" size={36} color={Colors.primary} />
            </IconWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.View`
    width: 100%;
    height: 150px;
    border-radius: 8px;
    background-color: ${Colors.dark100};
    padding: 16px;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    margin: 16px 0;
    position: relative;
`
const Row = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const Name = styled.Text`
    font-size: 24px;
    font-family: ${Fonts.italicBold};
    color: #fff;

`
const Description = styled.Text`
      font-size: 18px;
    font-family: ${Fonts.regular};
    margin: 4px 0;
    color: #fff;

`
const ImageWrapper = styled.View`
background-color: red;
`
const Column = styled.View`
   
    padding: 0 24px;
    width: 100%;
`
const CloseIcon = styled(Ionicons)`
`
const IconWrapper = styled.Pressable`
position: absolute;
top: 0;
right: 0;
`