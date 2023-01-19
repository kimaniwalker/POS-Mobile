import React from 'react'
import styled from 'styled-components/native'
import { Fonts } from '../styles/Fonts'
import { Loading } from '../utils/types'


export default function Loading({ message }: Loading) {


    return (
        <Wrapper>
            <Message>{message}</Message>
        </Wrapper>
    )
}

const Wrapper = styled.View`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Message = styled.Text`
    font-family: ${Fonts.medium};
    font-size: 18px;
`