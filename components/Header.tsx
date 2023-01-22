import React from 'react'
import { SafeAreaView, Image } from 'react-native'
import styled from 'styled-components/native'
import { Colors } from '../styles/Colors'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { HeaderProps } from '../utils/types';
import { useCartContext } from '../context/cart';
import { Fonts } from '../styles/Fonts';

export default function Header({ isLogoOnly, navigation, options, back }: HeaderProps) {

    const canGoBack = navigation.canGoBack()
    const [cartTotal, setcartTotal] = React.useState(0)
    const { cart } = useCartContext()
    const getTotal = () => {
        let total = cart?.reduce((total: number, item: any) => total + item.qty, 0)


        setcartTotal(total)

    }
    React.useEffect(() => {
        if (cart) {
            getTotal()
        }

    }, [cart])

    return (
        <>
            <Background>

                <SafeAreaView>
                    <Wrapper>

                        {!canGoBack ? <Logo source={require('../assets/LOGOSMALL.png')} /> : <BackButton onPress={() => navigation.goBack()}>
                            <MaterialCommunityIcons name="backburger" size={42} color="white" />
                        </BackButton>}


                        {!isLogoOnly && (
                            <MaterialCommunityIcons
                                style={{ position: 'relative' }} name="cart-outline" size={30} color="white" />
                        )}
                        {!isLogoOnly && cartTotal >= 1 && (
                            <CountWrapper>
                                <Count>{cartTotal}</Count>
                            </CountWrapper>
                        )}
                        

                    </Wrapper>
                </SafeAreaView>
            </Background>
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
const BackButton = styled.Pressable`
    padding-left: 16px;
    
`
const Background = styled.View`
        background-color: ${Colors.dark};
`
const Count = styled.Text`
    font-family: ${Fonts.medium};
    color: white;
    font-size: 16px;
    `
const CountWrapper = styled.View`
position: absolute;
display: flex;
justify-content: center;
align-items: center;
padding: 4px;
border-radius: 50%;
background-color: black;
min-width: 30px;
min-height: 30px;
right: 5px;
top: 10px;
`