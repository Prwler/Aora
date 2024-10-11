import { SplashScreen, Stack } from 'expo-router'
import { useFonts } from 'expo-font'
import { useEffect } from 'react';
import GlobalProvider from '@/context/GlobalProvider'

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/FiraSans-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/FiraSans-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/FiraSans-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/FiraSans-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/FiraSans-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/FiraSans-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/FiraSans-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/FiraSans-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/FiraSans-Thin.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <GlobalProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="search/[query]" options={{ headerShown: false }} />
      </Stack>
    </GlobalProvider>
  );
}

export default RootLayout