import { NavigationContainer } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import React, { useCallback } from 'react'
import 'react-native-gesture-handler'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { WeatherDataProvider } from './src/context/WeatherDataContext'
import { RootNavigator } from './src/navigators/RootNavigator'

SplashScreen.preventAutoHideAsync()

export function App() {
  const [fontsLoaded] = useFonts({
    'SF-Thin': require('./src/assets/fonts/SF-Pro-Display-Thin.otf'),
    'SF-Regular': require('./src/assets/fonts/SF-Pro-Display-Regular.otf'),
    'SF-Semibold': require('./src/assets/fonts/SF-Pro-Display-Semibold.otf'),
  })

  const onLayoutRooView = useCallback(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) return null

  return (
    <SafeAreaProvider onLayout={onLayoutRooView}>
      <WeatherDataProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
          <StatusBar style="light" />
        </GestureHandlerRootView>
      </WeatherDataProvider>
    </SafeAreaProvider>
  )
}

// import React from "react";
// import { StyleSheet } from "react-native";
// import { BasicAnimations } from "./src/screens/BasicAnimations";

// interface AppProps {}

// export function App({}: AppProps) {
//   return <BasicAnimations />;
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });
