import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  Lora_400Regular,
  Lora_500Medium,
  Lora_700Bold,
  Lora_400Regular_Italic,
  Lora_700Bold_Italic
} from '@expo-google-fonts/lora';
import { StripeProvider } from '@stripe/stripe-react-native';

import { CartWrapper } from './context/cart';

import { NavigationContainer } from '@react-navigation/native';
import Navigator from './utils/navigator';

export default function App() {

  let [fontsLoaded] = useFonts({
    Lora_400Regular,
    Lora_500Medium,
    Lora_700Bold,
    Lora_400Regular_Italic,
    Lora_700Bold_Italic
  });

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


