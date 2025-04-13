import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Forecast } from '../../models/Weather'
import { ForecastCapsule } from './ForecastCapsule'

interface ForecastScrollProps {
  forecasts: Forecast[]
  capsuleWidth: number
  capsuleHeight: number
  capsuleRadius: number
}

export function ForecastScroll({
  forecasts,
  capsuleHeight,
  capsuleWidth,
  capsuleRadius,
}: ForecastScrollProps) {
  return (
    <ScrollView
      horizontal
      style={styles.scrollView}
      contentContainerStyle={{ paddingHorizontal: 20 }}
      showsHorizontalScrollIndicator={false}
    >
      <View style={styles.container}>
        {forecasts.map((forecast, i) => (
          <ForecastCapsule
            width={capsuleWidth}
            height={capsuleHeight}
            radius={capsuleRadius}
            forecast={forecast}
            key={i}
          />
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    gap: 12,
  },
})
