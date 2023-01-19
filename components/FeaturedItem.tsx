import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { ImageBackground } from 'react-native'
import styled from 'styled-components/native'
import { Colors } from '../styles/Colors'
import { Fonts } from '../styles/Fonts'
import { MealItem } from '../utils/types'
import Meal from './MealItem'

export default function FeaturedItem({ id, name, description, price, isAvailable, isFeatured, reviews, images, category }: MealItem) {

    const navigation: any = useNavigation()
    const handlePress = () => {
        navigation.navigate('Meal', {
            id: id
        })
    }

    return (
        <>
            <Content>
                <Wrapper onPress={handlePress}>
                    <ImageBackground style={{ width: '100%', height: '100%' }} imageStyle={{ resizeMode: 'cover', borderRadius: 8 }} source={{ uri: images[0] }} />
                </Wrapper>
                <Name>{name}</Name>
                <Price>{price}</Price>
            </Content>
        </>
    )
}
const Wrapper = styled.Pressable`
    width: 175px;
    height: 175px;
    background-color: red;
    margin: 8px;
    border-radius: 8px;
    box-shadow: 4px 2px 2px lightgray;
`
const Name = styled.Text`
    font-family: ${Fonts.medium};
    font-size: 16px;
    margin: 8px 0 0 8px;
color: ${Colors.dark100};
`
const Price = styled.Text`
    font-family: ${Fonts.medium};
    font-size: 16px;
    margin: 8px 0 0 8px;
`
const Content = styled.View`
    margin: 8px 0;
`

