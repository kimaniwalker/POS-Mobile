export type CartItem = {
    id: number | string
    name: string
    price: number
    qty: number
    specialMessage?: string,
    combo?: {
        drink: string
        side: string
        size: string
        price: number
    }

}

export type CartItems = {
    cart?: CartItem[] | null
}

export type HeaderProps = {
    isLogoOnly: boolean
    back?: { title: string }
    navigation: any
    options: any
}

export type FeaturedMeals = {
    featured?: MealItem[]
}

export type MealItem = {
    id: number | string
    name: string
    description: string
    price: number
    isAvailable: boolean
    isFeatured: boolean
    images: string[]
    category: string
    available_sizes?: string[]
    combo?: {
        drinks: Drink
        sides: Side
        price: string
    }
    nutrition?: string
    reviews?: string[]
}

type Drink = {
    available_sizes: string[]
    available_drinks: string[]
}
type Side = {
    available_sizes: string[]
    available_sides: string[]
}

export type Loading = {
    isLoading: boolean
    message: string
}

export type AvailableSizesInput = {
    current_value: string
    setValue: (fieldName: string, newValue: string, config?: {}) => void
    errorMsg?: string
}