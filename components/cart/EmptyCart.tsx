import React from 'react'
import styled from 'styled-components/native'
import { Fonts } from '../../styles/Fonts'

export default function EmptyCart({}) {
    


    return (
        <>
          <Title>Your cart is empty.</Title>  
        </>
    )
}

const Title = styled.Text`
font-size: 32px;
font-family: ${Fonts.italicBold};
`