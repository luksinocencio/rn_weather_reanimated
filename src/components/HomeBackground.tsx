import { Canvas, LinearGradient, Rect, vec } from '@shopify/react-native-skia'
import React from 'react'
import {
  Image,
  ImageBackground,
  Platform,
  ScaledSize,
  StyleSheet,
  View,
} from 'react-native'
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated'
import { useForecastSheetPosition } from '../context/ForecastSheetContext'
import { useApplicationDimensions } from '../hooks/useApplicationDimensions'

const HomeBackground = () => {
  const dimensions = useApplicationDimensions()
  const { width, height } = dimensions
  const myStyles = styles(dimensions)
  const smokeHeight = height * 0.6
  const smokeOffsetY = height * 0.4
  const animatedPosition = useForecastSheetPosition()

  const leftBkgColor = useSharedValue('#2E335A')
  const rightBkgColor = useSharedValue('#1C1B33')

  const bkgColors = useDerivedValue(() => {
    if (Platform.OS === 'ios') {
      leftBkgColor.value = interpolateColor(
        animatedPosition.value,
        [0, 1],
        ['#2E335A', '#422E5A'],
      )
    } else {
      leftBkgColor.value = animatedPosition.value > 0.5 ? '#422E5A' : '#2E335A'
    }

    return [leftBkgColor.value, rightBkgColor.value]
  })

  const animatedImgBkgStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            animatedPosition.value,
            [0, 1],
            [0, -height],
            Extrapolation.CLAMP,
          ),
        },
      ],
    }
  })

  const animatedCanvasSmokeStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        animatedPosition.value,
        [0, 0.1],
        [1, 0],
        Extrapolation.CLAMP,
      ),
    }
  })

  return (
    <View style={StyleSheet.absoluteFill}>
      <Canvas style={StyleSheet.absoluteFill}>
        <Rect x={0} y={0} width={width} height={height}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(width, height)}
            colors={bkgColors}
          />
        </Rect>
      </Canvas>

      {/* ✅ Animated View envolvendo o ImageBackground */}
      <Animated.View style={[{ flex: 1 }, animatedImgBkgStyles]}>
        <ImageBackground
          source={require('../assets/home/Background.png')}
          resizeMode="cover"
          style={{ flex: 1 }}
        >
          <Canvas
            style={[
              {
                height: smokeHeight,
                ...StyleSheet.absoluteFillObject,
                top: smokeOffsetY,
              },
              animatedCanvasSmokeStyles,
            ]}
          >
            <Rect x={0} y={0} width={width} height={smokeHeight}>
              <LinearGradient
                start={vec(width / 2, 0)}
                end={vec(width / 2, smokeHeight)}
                colors={['rgba(58,63,84,0)', 'rgba(58,63,84,1)']}
                positions={[-0.02, 0.54]}
              />
            </Rect>
          </Canvas>
          <Image
            source={require('../assets/home/House.png')}
            resizeMode="cover"
            style={myStyles.houseImage}
          />
        </ImageBackground>
      </Animated.View>
    </View>
  )
}

export { HomeBackground }

const styles = ({ width }: ScaledSize) =>
  StyleSheet.create({
    houseImage: {
      width,
      height: width,
      ...StyleSheet.absoluteFillObject,
      top: '36%',
    },
  })
