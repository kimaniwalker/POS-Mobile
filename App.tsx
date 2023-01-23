import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  useFonts,
  Lora_400Regular,
  Lora_500Medium,
  Lora_700Bold,
  Lora_400Regular_Italic,
  Lora_700Bold_Italic
} from '@expo-google-fonts/lora';
import { StripeProvider, useStripe } from '@stripe/stripe-react-native';
import { CartWrapper } from './context/cart';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './utils/navigator';
import { Linking } from 'react-native';

export default function App() {

  let [fontsLoaded] = useFonts({
    Lora_400Regular,
    Lora_500Medium,
    Lora_700Bold,
    Lora_400Regular_Italic,
    Lora_700Bold_Italic
  });

  const { handleURLCallback } = useStripe();

  const handleDeepLink = React.useCallback(
    async (url: string | null) => {
      if (url) {
        const stripeHandled = await handleURLCallback(url);
        if (stripeHandled) {
          // This was a Stripe URL - you can return or add extra handling here as you see fit
        } else {
          // This was NOT a Stripe URL – handle as you normally would
        }
      }
    },
    [handleURLCallback]
  );

  React.useEffect(() => {
    const getUrlAsync = async () => {
      const initialUrl = await Linking.getInitialURL();
      handleDeepLink(initialUrl);
    };

    getUrlAsync();

    const deepLinkListener = Linking.addEventListener(
      'url',
      (event: { url: string }) => {
        handleDeepLink(event.url);
      }
    );

    return () => deepLinkListener.remove();
  }, [handleDeepLink]);

  if (!fontsLoaded) return null

  return (
    <>
      <StatusBar style='light' />
      <StripeProvider
        publishableKey="pk_test_E1w7nEQKNaAPqAdDPdgFogN000yif31NpU"
        urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
        merchantIdentifier="merchant.key2design.posMobile" // required for Apple Pay
      >
        <CartWrapper>
          <NavigationContainer>
            <Navigator />
          </NavigationContainer>
        </CartWrapper>
      </StripeProvider>
    </>
  );
}


