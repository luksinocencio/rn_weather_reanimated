import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { Home } from '../screens/Home'
import { WeatherList } from '../screens/WeatherList'

const { Navigator, Screen } = createNativeStackNavigator()

export function RootNavigator() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
      <Screen name="list" component={WeatherList} />
    </Navigator>
  )
}
