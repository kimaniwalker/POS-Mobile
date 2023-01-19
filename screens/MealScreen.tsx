
import React from 'react'
import Meal from '../components/MealItem'
import useMenuHook from '../utils/menu'
import { MealItem } from '../utils/types'
export default function MealScreen({ route }: any) {

    const id = route.params.id

    const [item, setItem] = React.useState<any>([])
    const { getMenuItem } = useMenuHook()

    const getitem = async () => {
        const meal = await getMenuItem(id)
        setItem(meal)
    }

    React.useEffect(() => {
        getitem()
    }, [])

    return (
        <Meal {...item} />
    )
}
