import { useStripe } from "@stripe/stripe-react-native";
import React from "react";
import { Alert } from "react-native";
import styled from "styled-components/native";
import Constants from 'expo-constants';
import { Fonts } from "../styles/Fonts";
import ItemsInCart from "../components/cart/ItemsInCart";
import { CartItem, PayParams } from "../utils/types";
import { useCartContext } from "../context/cart";
import Loading from "../components/Loading";

export default function CartScreen() {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = React.useState(false);
    const SECRET: string = Constants.expoConfig?.extra?.SECRET
    const {cart} = useCartContext()


    const fetchPaymentSheetParams = async ({amount, currency, metadata, description, statement_descriptor, stripeAccount, payment_method_types, application_fee_amount, receipt_email }: PayParams) => {
      const body ={
        statement_descriptor: 'POSmobile',
        receipt_email: 'admin@kustomcharmz.com',
        amount,
        currency,
        metadata,
        description
      }
      const response = await fetch(`http://localhost:3000/api/payments/createPaymentIntent`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          authorization: SECRET,
        },
      });
      const { paymentIntent, ephemeralKey, customer} = await response.json();
  
      return {
        paymentIntent,
        ephemeralKey,
        customer,
      };
    };
  
    const initializePaymentSheet = async () => {
      let items: any = {}
      let metadata = cart?.map((item: CartItem) => {
        items["orderid-" + Math.floor(Math.random() * 90) + 10] = JSON.stringify(item)})
      let total = cart?.reduce((total: number, product: CartItem) => total + (product.price * product.qty), 0)


      const {
        paymentIntent,
        ephemeralKey,
        customer,
      } = await fetchPaymentSheetParams({amount: total * 100, description: 'POSmobile Payment', metadata: items  });
  
      const { error } = await initPaymentSheet({
        merchantDisplayName: "POSmobile",
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
        //methods that complete payment after a delay, like SEPA Debit and Sofort.
        allowsDelayedPaymentMethods: true,
        //add return url
      });
      if (error) {
          Alert.alert(`Error code: ${error.code}`, error.message)
      }
      if (!error) {
        setLoading(false);
      }

    };
  
    const openPaymentSheet = async () => {
        const { error } = await presentPaymentSheet();
    
        if (error) {
          Alert.alert(`Error code: ${error.code}`, error.message);
        } else {
          Alert.alert('Success', 'Your order is confirmed!');
        }
      };
    React.useEffect(() => {
      initializePaymentSheet();
    }, [cart]);

    if (loading) return <Loading isLoading={loading} message="Loading"/> 
    return (
      <Wrapper>
       <ItemsInCart pay={openPaymentSheet} loading={loading} />
      </Wrapper>
    );
  }

  const Wrapper = styled.View`
    flex: 1;
  justify-content: center;
    display: flex;
    padding: 16px;
    align-items: center;
  `
