import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StyledButton from './styles/StyledButton';
import {
  useFonts,
  Lora_400Regular,
  Lora_500Medium,
  Lora_700Bold,
  Lora_400Regular_Italic,
  Lora_700Bold_Italic
} from '@expo-google-fonts/lora';
import { Colors } from './styles/Colors';
import { CartWrapper } from './context/cart';
import Header from './components/Header';
import Hero from './components/Hero';
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
    <CartWrapper>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </CartWrapper>
  );
}


