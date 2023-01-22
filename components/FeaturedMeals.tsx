import React from 'react'
import { FlatList, ScrollView } from 'react-native'
import styled from 'styled-components/native'
import { Fonts } from '../styles/Fonts'
import { FeaturedMeals } from '../utils/types'
import FeaturedItem from './FeaturedItem'

export default function Featured({ title,featured }: FeaturedMeals) {



    return (
        <>
            <Heading>{title}</Heading>
            <FlatList numColumns={2} data={featured} renderItem={({ item }) => <FeaturedItem {...item} />} />

        </>
    )
}
const Wrapper = styled.View`
    display: flex;
    flex-direction: row;
`
const Heading = styled.Text`
    font-family: ${Fonts.italicBold};
    font-size: 24px;
    margin: 24px 0;

`
