import { createContext, ReactNode, useContext, useState } from 'react'
import { currentWeather } from '../data/CurrentWeather'
import { hourly, weekly } from '../data/ForecastData'
import { WeatherData } from '../models/Weather'

interface WeatherDataProviderProps {
  children: ReactNode
}

interface WeatherContextType {
  weatherData: WeatherData
  setWeatherData: (data: WeatherData) => void
}

const defaultWeatherData = {
  currentWeather: currentWeather,
  hourlyForecast: hourly,
  weeklyForecast: weekly,
}

export const WeatherDataContext = createContext<WeatherContextType>({
  weatherData: defaultWeatherData,
  setWeatherData: () => {},
})

export function WeatherDataProvider({ children }: WeatherDataProviderProps) {
  const [weatherData, setWeatherData] =
    useState<WeatherData>(defaultWeatherData)

  return (
    <WeatherDataContext.Provider value={{ weatherData, setWeatherData }}>
      {children}
    </WeatherDataContext.Provider>
  )
}

export function useWeatherData(): WeatherContextType {
  const context = useContext(WeatherDataContext)

  if (context === null) {
    throw new Error(
      'useWeatherData must be used within a Weather Data Provider',
    )
  }

  return context
}
