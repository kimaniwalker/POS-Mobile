import React from 'react'
import styled from 'styled-components/native'
import Header from '../components/Header'
import Hero from '../components/Hero'
import { Colors } from '../styles/Colors'
import StyledButton from '../styles/StyledButton'

export default function MenuScreen({ navigation }: any) {

    return (
        <>
            <Hero />
            <Container>
                <Row>
                <StyledButton buttonTitle='Order' disabled={false} onPress={() => navigation.navigate('Cart')} buttonColor={Colors.dark} />
                </Row>
            </Container>
        </>
    )
}

const Container = styled.View`
    flex: 1;
    background-color: '#fff';
    align-items: center;
    justify-content: center;
    padding: 8px 0;
    margin: 8px 0;
`
const Row = styled.View`
    display: flex;
    justify-content: center;
    flex-direction: row;
    width: 100%;
    padding: 16px;
`