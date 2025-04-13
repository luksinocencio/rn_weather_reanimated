import React from 'react'
import { StyleSheet } from 'react-native'
import { HomeBackground } from '../components/HomeBackground'
import { WeatherInfo } from '../components/section/WeatherInfo'
import { ForecastSheet } from '../components/sheet/ForecastSheet'
import { WeatherTabBar } from '../components/tabbar/WeatherTabBar'
import { ForecastSheetProvider } from '../context/ForecastSheetContext'

interface HomeProps {}

export function Home({}: HomeProps) {
  return (
    <ForecastSheetProvider>
      <HomeBackground />
      <WeatherInfo />
      <ForecastSheet />
      <WeatherTabBar />
    </ForecastSheetProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
