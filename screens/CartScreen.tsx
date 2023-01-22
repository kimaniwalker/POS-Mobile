import { useStripe } from "@stripe/stripe-react-native";
import React from "react";
import { Alert } from "react-native";
import styled from "styled-components/native";
import StyledButton from "../styles/StyledButton";
import Constants from 'expo-constants';

export default function CartScreen() {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = React.useState(false);
    const SECRET: string = Constants.expoConfig?.extra?.SECRET
  
    const fetchPaymentSheetParams = async () => {
      const response = await fetch(`http://localhost:3000/api/payments/createPaymentIntent`, {
        method: 'POST',
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
      const {
        paymentIntent,
        ephemeralKey,
        customer,
      } = await fetchPaymentSheetParams();
  
      const { error } = await initPaymentSheet({
        merchantDisplayName: "Example, Inc.",
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
        //methods that complete payment after a delay, like SEPA Debit and Sofort.
        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: {
          name: 'Jane Doe',
        }
      });
      if (!error) {
        setLoading(true);
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
    }, []);
  
    return (
      <Wrapper>
        <StyledButton
       
          disabled={!loading}
          buttonTitle="Checkout"
          onPress={openPaymentSheet}
        />
      </Wrapper>
    );
  }

  const Wrapper = styled.View`
    flex: 1;
  `