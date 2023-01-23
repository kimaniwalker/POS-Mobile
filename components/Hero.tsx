import React from 'react'
import styled from 'styled-components/native'
import useMenuHook from '../utils/menu'
import { MealItem } from '../utils/types'
import Featured from './FeaturedMeals'
import * as SplashScreen from 'expo-splash-screen';
import { ImageBackground, ScrollView } from 'react-native'
import { Colors } from '../styles/Colors'
SplashScreen.preventAutoHideAsync();

export default function Hero({ }) {

    const { getFullMenu } = useMenuHook()
    const [meals, setMeals] = React.useState<any>([])
    const featuredItems = meals?.filter((item: MealItem) => item.isFeatured == true)
    const breakfastItems = meals?.filter((item: MealItem) => item.category === 'breakfast')

    const getMeals = async () => {
        const meals = await getFullMenu()
        setMeals(meals)
        setTimeout(async () => {
            await SplashScreen.hideAsync();
        }, 1000);
    }

    React.useEffect(() => {
        getMeals()
    }, [])

    return (
        <>


            <Wrapper>
                <HeroView>
                <ImageBackground style={{width: 375, height:200 }} imageStyle={{borderRadius: 8}} source={require('../assets/refinedHero.png')} />
                </HeroView>
                <Featured title='Featured' featured={featuredItems} />
            </Wrapper>


        </>
    )
}
const Wrapper = styled.View`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    padding: 16px;
`
const HeroView = styled.View`
    width: 375px;
    height: 200px;
    border-radius: 8px;
    box-shadow: 4px 2px 2px lightgray;
`


