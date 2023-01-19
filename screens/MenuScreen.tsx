import { StatusBar } from 'expo-status-bar'
import React from 'react'
import styled from 'styled-components/native'
import Header from '../components/Header'
import Hero from '../components/Hero'
import { Colors } from '../styles/Colors'
import StyledButton from '../styles/StyledButton'

export default function MenuScreen({ navigation }: any) {

    return (
        <>
            <Header isLogoOnly={true} />
            <Hero />
            <Container>
                <StyledButton buttonTitle='Order' disabled={false} onPress={() => null} buttonColor={Colors.dark} />
                <StatusBar style="auto" />
            </Container>
        </>
    )
}

const Container = styled.View`
    flex: 1;
    background-color: '#fff';
    align-items: center;
    justify-content: center;
`