import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useCallback } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Home } from "./src/screens/Home";

SplashScreen.preventAutoHideAsync();

export function App() {
  const [fontsLoaded] = useFonts({
    "SF-Thin": require("./src/assets/fonts/SF-Pro-Display-Thin.otf"),
    "SF-Regular": require("./src/assets/fonts/SF-Pro-Display-Regular.otf"),
    "SF-Semibold": require("./src/assets/fonts/SF-Pro-Display-Semibold.otf"),
  });

  const onLayoutRooView = useCallback(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider onLayout={onLayoutRooView}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Home />
        <StatusBar style="light" />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
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
