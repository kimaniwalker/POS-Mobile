import React from 'react'
import { SafeAreaView, Image } from 'react-native'
import styled from 'styled-components/native'
import { Colors } from '../styles/Colors'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { HeaderProps } from '../utils/types';

export default function Header({ isLogoOnly }: HeaderProps) {

    return (
        <>
            <SafeAreaView>
                <Wrapper>

                    <Logo source={require('../assets/LOGOSMALL.png')} />

                    {isLogoOnly && (
                        <MaterialCommunityIcons name="cart-outline" size={30} color="white" />
                    )}

                </Wrapper>
            </SafeAreaView>
        </>
    )
}

const Wrapper = styled.View`
    width: 100%;
    height: 85px;
    background-color: ${Colors.dark};
    display: flex;
    align-items: center;
    justify-content: space-between;
    align-content: center;
    flex-direction: row;
    padding: 0 16px;
`
const Logo = styled(Image)`
    height: 50px;
    width: 50px;
`
