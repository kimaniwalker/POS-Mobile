import React from 'react'
import styled from 'styled-components/native'
import { Colors } from './Colors'
import { Fonts } from './Fonts'

type Props = {
    buttonTitle: string
    onPress: () => void
    disabled: boolean
    buttonColor?: string
}

export default function StyledButton({ buttonTitle, onPress, disabled, buttonColor }: Props) {


    return (
        <>
            <Wrapper disabled={disabled} buttonColor={buttonColor}>
                <Button disabled={disabled} onPress={onPress}><ButtonTitle>{buttonTitle}</ButtonTitle></Button>
            </Wrapper>

        </>
    )
}

const Button = styled.Pressable`
width: 100%;
`
const ButtonTitle = styled.Text`
color: white;
font-size: 18px;
text-align: center;
padding: 8px;
text-transform: uppercase;
  font-family: ${Fonts.bold};
`
const Wrapper = styled.View<{ disabled: boolean, buttonColor?: string }>`
display: flex;
  width: 325px;
  height: 50px;
  opacity: ${(props) => props.disabled ? 0.7 : 1};
  padding: 5px;
  background-color: ${(props) => props.buttonColor ? props.buttonColor : Colors.primary};
  justify-content: 'center';
    align-items: 'center';
border-radius: 48px;    
        box-shadow: 2px 2px 2px lightgrey; 
`
