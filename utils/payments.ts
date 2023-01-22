import { useStripe } from "@stripe/stripe-react-native";
import { PaymentParams } from "./types";

export const fetchPaymentSheetParams = async ({payment_params}:PaymentParams) => {

    const { initPaymentSheet, presentPaymentSheet } = useStripe()
    const response = await fetch(`${process.env.API_URL}/payment-sheet`, {
      method: 'POST',
      body: JSON.stringify(payment_params),
      headers: {
        'Content-Type': 'application/json',  
      },
    });
    const { paymentIntent, ephemeralKey, customer} = await response.json();

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
};



  