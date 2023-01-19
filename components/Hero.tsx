import React from 'react'
import styled from 'styled-components/native'
import { Colors } from '../styles/Colors'
import useMenuHook from '../utils/menu'
import { MealItem } from '../utils/types'
import Featured from './FeaturedMeals'
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

export default function Hero({ }) {

    const { getFullMenu } = useMenuHook()
    const [meals, setMeals] = React.useState<any>([])
    const featuredItems = meals?.filter((item: MealItem) => item.isFeatured == true)

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
                <Featured featured={featuredItems} />
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


