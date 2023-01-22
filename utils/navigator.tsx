import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MenuScreen from '../screens/MenuScreen';
import MealScreen from '../screens/MealScreen';
import Header from '../components/Header';
import CartScreen from '../screens/CartScreen';


export default function Navigator() {

    const Stack = createNativeStackNavigator();

    return (
        <>
            <Stack.Navigator
                screenOptions={{
                    header: ({ back, navigation, options }) => <Header back={back} navigation={navigation} options={options} isLogoOnly={false} />
                }}
            >
                <Stack.Screen name="Featured" component={MenuScreen} />
                <Stack.Screen name="Meal" component={MealScreen} />
                <Stack.Screen name="Cart" component={CartScreen} />

            </Stack.Navigator>
        </>
    )
}
