import {
  AnimatedProp,
  Canvas,
  Color,
  LinearGradient,
  Rect,
  vec,
} from '@shopify/react-native-skia'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useApplicationDimensions } from '../hooks/useApplicationDimensions'

interface BackgroundGradientProps {
  colors?: AnimatedProp<Color[]>
}

export function BackgroundGradient({
  colors = ['#2E335A', '#1C1B33'],
}: BackgroundGradientProps) {
  const { width, height } = useApplicationDimensions()

  return (
    <View style={StyleSheet.absoluteFill}>
      <Canvas style={StyleSheet.absoluteFill}>
        <Rect x={0} y={0} width={width} height={height}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(width, height)}
            colors={colors}
          />
        </Rect>
      </Canvas>
    </View>
  )
}
