import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MenuScreen from '../screens/MenuScreen';
import MealScreen from '../screens/MealScreen';


export default function Navigator() {

    const Stack = createNativeStackNavigator();

    return (
        <>
            <Stack.Navigator>
                <Stack.Screen name="Featured" component={MenuScreen} />
                <Stack.Screen name="Meal" component={MealScreen} />

            </Stack.Navigator>
        </>
    )
}
