import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import { useWeatherData } from '../context/WeatherDataContext'
import { Home } from '../screens/Home'
import { WeatherList } from '../screens/WeatherList'
import { fetchWeatherData, getLocationData } from '../services/LocationService'
import { eventEmitter } from '../utils/EventEmitter'

const { Navigator, Screen } = createNativeStackNavigator()

export function RootNavigator() {
  const { setWeatherData } = useWeatherData()

  async function handleLocationEvent() {
    const locationData = await getLocationData()
    if (locationData) {
      const { latitude, longitude } = locationData
      const weatherData = await fetchWeatherData(latitude, longitude)
      setWeatherData(weatherData)
    }
  }

  useEffect(() => {
    const listener = eventEmitter.addListener('locationEvent', async () => {
      await handleLocationEvent()
    })

    return () => {
      listener.remove()
    }
  }, [])

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
      <Screen name="list" component={WeatherList} />
    </Navigator>
  )
}
