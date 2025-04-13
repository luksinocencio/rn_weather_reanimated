import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { Dimensions, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { useForecastSheetPosition } from '../../context/ForecastSheetContext'
import { useWeatherData } from '../../context/WeatherDataContext'
import { useApplicationDimensions } from '../../hooks/useApplicationDimensions'
import { ForecastType } from '../../models/Weather'
import { ForecastScroll } from '../forecast/ForecastScroll'
import AirQualityWidget from '../forecast/widgets/AirQualityWidget'
import FeelsLikeWidget from '../forecast/widgets/FeelsLikeWidget'
import HumidityWidget from '../forecast/widgets/HumidityWidget'
import PressureWidget from '../forecast/widgets/PressureWidget'
import RainFallWidget from '../forecast/widgets/RainFallWidget'
import SunriseWidget from '../forecast/widgets/SunriseWidget'
import UvIndexWidget from '../forecast/widgets/UvIndexWidget'
import VisibilityWidget from '../forecast/widgets/VisibilityWidget'
import WindWidget from '../forecast/widgets/WindWidget'
import { ForecastSheetBackground } from './ForecastSheetBackground'
import { ForecastControl } from './elements/ForecastControl'
import { Separator } from './elements/Separator'

export function ForecastSheet() {
  const bottomSheetRef = useRef<BottomSheet>(null)
  const { width, height } = useApplicationDimensions()
  const {
    weatherData: { hourlyForecast, weeklyForecast },
  } = useWeatherData()
  const firstValue = Dimensions.get('window').height * 0.385
  const secondValue = Dimensions.get('window').height * 0.83
  const snapPoints = useMemo(() => [firstValue, secondValue], [])
  const minY = height - secondValue
  const maxY = height - firstValue
  const cornerRadius = 44
  const capsuleRadius = 30
  const capsuleHeight = height * 0.17
  const capsuleWidth = width * 0.15
  const [selectedForecastType, setSelectedForecastType] =
    useState<ForecastType>(ForecastType.Hourly)
  const currentPosition = useSharedValue(0)
  const smallWidgetSize = width * 0.4
  const animatedPosition = useForecastSheetPosition()

  const translateXHourly = useSharedValue(0)
  const translateXWeekly = useSharedValue(width)
  const animatedHourlyStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateXHourly.value }],
    }
  })
  const animatedWeeklyStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateXWeekly.value }],
    }
  })

  useEffect(() => {
    if (selectedForecastType === ForecastType.Weekly) {
      translateXHourly.value = withTiming(-width)
      translateXWeekly.value = withTiming(-width)
    } else {
      translateXHourly.value = withTiming(0)
      translateXWeekly.value = withTiming(width)
    }
  }, [selectedForecastType])

  const normalizePosition = (position: number) => {
    'worklet'
    return ((position - maxY) / (maxY - minY)) * -1
  }

  useAnimatedReaction(
    () => {
      return currentPosition.value
    },
    (cv) => {
      animatedPosition.value = normalizePosition(cv)
    },
  )

  const handleSheetChange = useCallback((index: number) => {
    if (index < 0) {
      bottomSheetRef.current?.snapToIndex(0)
    }
    if (index > 1) {
      bottomSheetRef.current?.snapToIndex(1)
    }
  }, [])

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      animatedPosition={currentPosition}
      animateOnMount={false}
      handleIndicatorStyle={{
        width: 48,
        height: 5,
        backgroundColor: 'rgba(0,0,0,0.3)',
      }}
      backgroundComponent={() => (
        <ForecastSheetBackground
          width={width}
          height={firstValue}
          cornerRadius={cornerRadius}
        />
      )}
      enableOverDrag={false}
      onChange={handleSheetChange}
    >
      <BottomSheetView style={{ flex: 1 }}>
        <ForecastControl onPress={(type) => setSelectedForecastType(type)} />
        <Separator width={width} height={3} />
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          <View style={{ flexDirection: 'row' }}>
            <Animated.View style={[animatedHourlyStyles]}>
              <ForecastScroll
                capsuleWidth={capsuleWidth}
                capsuleHeight={capsuleHeight}
                capsuleRadius={capsuleRadius}
                forecasts={hourlyForecast}
              />
            </Animated.View>

            <Animated.View style={[animatedWeeklyStyles]}>
              <ForecastScroll
                capsuleWidth={capsuleWidth}
                capsuleHeight={capsuleHeight}
                capsuleRadius={capsuleRadius}
                forecasts={weeklyForecast}
              />
            </Animated.View>
          </View>
          <View style={{ flex: 1, paddingTop: 30, paddingBottom: 50 }}>
            <AirQualityWidget width={width - 30} height={150} />
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                padding: 15,
                gap: 10,
              }}
            >
              <UvIndexWidget width={smallWidgetSize} height={smallWidgetSize} />
              <WindWidget width={smallWidgetSize} height={smallWidgetSize} />
              <SunriseWidget width={smallWidgetSize} height={smallWidgetSize} />
              <RainFallWidget
                width={smallWidgetSize}
                height={smallWidgetSize}
              />
              <FeelsLikeWidget
                width={smallWidgetSize}
                height={smallWidgetSize}
              />
              <HumidityWidget
                width={smallWidgetSize}
                height={smallWidgetSize}
              />
              <VisibilityWidget
                width={smallWidgetSize}
                height={smallWidgetSize}
              />
              <PressureWidget
                width={smallWidgetSize}
                height={smallWidgetSize}
              />
            </View>
          </View>
        </ScrollView>
      </BottomSheetView>
    </BottomSheet>
  )
}
