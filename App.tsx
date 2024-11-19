import {StatusBar} from "expo-status-bar";
import {useCallback} from "react";
import {HomeBackground} from "./src/components/HomeBackground";
import {WeatherInfo, WeatherInfoProps} from "./src/components/section/WeatherInfo";
import {WeatherTabBar} from "./src/components/tabbar/WeatherTabBar";
import * as SplashScreen from 'expo-splash-screen'
import {useFonts} from "expo-font";
import {SafeAreaProvider} from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync()

const weatherData: WeatherInfoProps = {
  weather: {
    city: "Montreal",
    temperature: 19,
    condition: "Sunny",
    high: 24,
    low: 14
  }
}

export default function App() {
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

  const {weather} = weatherData

  return (
    <SafeAreaProvider onLayout={onLayoutRooView}>
      <HomeBackground/>
      <WeatherInfo weather={weather}/>
      <WeatherTabBar/>
      <StatusBar style="light"/>
    </SafeAreaProvider>
  );
}
