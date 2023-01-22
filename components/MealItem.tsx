import React from 'react'
import { Image, ScrollView, View } from 'react-native'
import styled from 'styled-components/native'
import { Colors } from '../styles/Colors'
import { Fonts } from '../styles/Fonts'
import StyledButton from '../styles/StyledButton'
import { AvailableSizesInput, MealItem } from '../utils/types'
import { useForm, Controller } from "react-hook-form";
import { useCartContext } from '../context/cart'

export default function Meal({ id, available_sizes, images, name, description, price, reviews, nutrition, combo }: MealItem) {


    const { control, handleSubmit, trigger, setValue, formState: { errors, isValid }, setError } = useForm({
        mode: 'onChange'
    });
    const sizeError: any = errors.size?.message
    const drinkError: any = errors.drink?.message
    const sideError: any = errors.side?.message
    const specialRequestError: any = errors.special_request?.message

    const { addToCart } = useCartContext()


    React.useEffect(() => {
        trigger()
    }, [trigger])


    const DrinkPicker: Function = ({ current_value, setValue }: AvailableSizesInput) => {
        return combo?.drinks?.available_drinks.map((item, index) => (
            <Item key={index} selected={item === current_value ? true : false}>
                <Button onPress={() => setValue('drink', item, { shouldValidate: true })}>
                    <Label>{item}</Label>
                </Button>
            </Item>
        ))
    }
    const SidePicker: Function = ({ current_value, setValue }: AvailableSizesInput) => {
        return combo?.sides?.available_sides.map((item, index) => (
            <Item key={index} selected={item === current_value ? true : false}>
                <Button onPress={() => setValue('side', item, { shouldValidate: true })}>
                    <Label>{item}</Label>
                </Button>
            </Item>
        ))
    }
    const AvailableSizes: Function = ({ current_value, setValue }: AvailableSizesInput) => {
        return available_sizes?.map((item, index) => (
            <Item key={index} selected={item === current_value ? true : false}>
                <Button onPress={() => setValue('size', item, { shouldValidate: true })}>
                    <Label>{item}</Label>
                </Button>
            </Item>
        ))
    }

    const handleAddToCart = () => {
        const product = {
            id: id,
            name: name,
            price: price,
            qty: 1,
            specialMessage: control._formValues.special_request || description,
            combo: {
                drink: control._formValues.drink,
                side: control._formValues.side,
                size: control._formValues.size,
                price: price,
            }
        }
        addToCart(product)
    }

    return (
        <>
            <ScrollView>
                <Content>
                    <Wrapper>
                        {images && (
                            <Image source={{ uri: images[0] }} style={{ height: 350, width: '100%' }} />
                        )}
                        <Section>
                            <Name>{name}</Name>
                            <Description>{description}</Description>
                            <Price>{price}</Price>
                        </Section>
                        <Section>
                            <ItemLabel>Select a size</ItemLabel>
                            {sizeError && <ErrorMessage>{sizeError}</ErrorMessage>}
                            <ScrollView horizontal>

                                <Controller
                                    control={control}
                                    defaultValue='Medium'
                                    rules={{
                                        required: {
                                            value: true,
                                            message: 'This is a required field'
                                        },
                                    }}
                                    render={({ field: { onChange, onBlur, value },
                                        fieldState: { error } }) => (

                                        <AvailableSizes current_value={value} setValue={setValue} />

                                    )}
                                    name="size"
                                />
                            </ScrollView>

                            <ItemLabel>Select a drink</ItemLabel>
                            {drinkError && <ErrorMessage>{drinkError}</ErrorMessage>}
                            <ScrollView horizontal>
                                <Controller
                                    control={control}
                                    defaultValue=''
                                    rules={{
                                        required: {
                                            value: true,
                                            message: 'This is a required field'
                                        },
                                    }}
                                    render={({ field: { onChange, onBlur, value },
                                        fieldState: { error } }) => (

                                        <DrinkPicker current_value={value} setValue={setValue} />

                                    )}
                                    name="drink"
                                />
                            </ScrollView>
                            <ItemLabel>Select a side</ItemLabel>
                            {sideError && <ErrorMessage>{sideError}</ErrorMessage>}
                            <ScrollView horizontal>
                                <Controller
                                    control={control}
                                    defaultValue=''
                                    rules={{
                                        required: {
                                            value: true,
                                            message: 'This is a required field'
                                        },
                                    }}
                                    render={({ field: { onChange, onBlur, value },
                                        fieldState: { error } }) => (

                                        <SidePicker current_value={value} setValue={setValue} />

                                    )}
                                    name="side"
                                />
                            </ScrollView>
                        </Section>
                        <Section>
                            <View>
                                <Title>Special Request</Title>
                                <SubHeading>Need to make a special accomodation?</SubHeading>
                                {specialRequestError && <ErrorMessage>{specialRequestError}</ErrorMessage>}
                                <Controller
                                    control={control}
                                    defaultValue=''
                                    rules={{
                                        required: {
                                            value: false,
                                            message: 'This is a required field'
                                        }, maxLength: {
                                            value: 75,
                                            message: 'You have used more charachters than allowed.'
                                        }
                                    }}
                                    render={({ field: { onChange, onBlur, value },
                                        fieldState: { error, } }) => (

                                        <TextBox
                                            isDirty={error ? true : false}
                                            multiline
                                            onChangeText={onChange} defaultValue=''
                                            value={value}
                                            placeholder="Ex. Please do not put any cheese on this item. My grandmother is lactose intolerant."
                                            placeholderTextColor={Colors.dark100}
                                        />

                                    )}
                                    name="special_request"
                                />

                            </View>
                        </Section>
                        <Section>
                            <Title>Reviews</Title>
                            {reviews?.map((item, index) => (
                                <Description key={index}>- {item}</Description>
                            ))}
                        </Section>
                        <Section>
                            <Title>Nutrition</Title>
                            <Description>{nutrition}</Description>
                        </Section>
                        <StyledButton buttonTitle='Add to cart' onPress={() => handleAddToCart()} disabled={!isValid} />
                    </Wrapper>
                </Content>
            </ScrollView>
        </>

    )
}
const Wrapper = styled.View`
    display: flex;
    align-items: center;
    align-content: center;
    flex: 1;
    margin-bottom: 24px;

`
const Content = styled.View`
    flex: 1;

`
const Name = styled.Text`
    font-size: 32px;
    font-family: ${Fonts.italicBold};
    color: ${Colors.dark100};
`
const Description = styled.Text`
    font-size: 18px;
    font-family: ${Fonts.medium};
`
const Price = styled.Text`
    font-size: 18px;
    font-family: ${Fonts.regular};  
`
const Section = styled.View`
  padding: 16px;
  width: 100%;
`
const Title = styled.Text`
     font-size: 24px;
    font-family: ${Fonts.italicBold};
    margin: 8px 0;
    color: ${Colors.dark100};
`
const Nutrition = styled.Text`
        font-size: 18px;
    font-family: ${Fonts.medium};
`
const Label = styled.Text`
    font-size: 16px;
    font-family: ${Fonts.medium};
    text-align: center;
`
const ItemLabel = styled.Text`
    font-size: 16px;
    font-family: ${Fonts.medium};
    margin: 8px 0;
`
const Item = styled.View<{ selected?: boolean }>`
    width: 100px;
    height: 100px;
    border: 2px solid black;
    margin: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    box-shadow: 4px 2px 2px lightgray;
    border-radius: 8px;
    background-color: ${(props) => props.selected ? Colors.primary : '#fff'};
`
const Button = styled.Pressable`
    flex: 1;
     display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`
const ErrorMessage = styled.Text`
     font-size: 14px;
    font-family: ${Fonts.medium};
    margin: 4px 0;
    color: red;
    width: 100%;
`
const SubHeading = styled.TextInput`
    font-size: 16px;
    font-family: ${Fonts.medium};
    margin: 4px 0;
`
const TextBox = styled.TextInput <{ isDirty: boolean }>`
    min-height: 200px;
    width: 100%;
    border: 2px solid black;
    border-radius: 8px;
    margin: 4px 0;
    vertical-align: top;
    padding: 4px;
    font-family: ${Fonts.medium};
     border-color: ${props => props.isDirty ? Colors.error : Colors.black};
`
