import { StyleSheet } from 'react-native'
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useForecastSheetPosition } from '../../context/ForecastSheetContext'
import { useWeatherData } from '../../context/WeatherDataContext'
import { DEGREE_SYMBOL } from '../../utils/Constants'

export function WeatherInfo() {
  const { weatherData } = useWeatherData()
  const {
    currentWeather: { city, temperature, condition, high, low },
  } = weatherData
  const { top } = useSafeAreaInsets()
  const topMargin = 51
  const weatherInfoMargin = top + topMargin
  const animatedPosition = useForecastSheetPosition()

  const clamp = (value: number, min = 0, max = 1) => {
    'worklet'
    return Math.max(min, Math.min(value, max))
  }

  const animatedViewStyle = useAnimatedStyle(() => {
    const clampedValue = clamp(animatedPosition.value)
    return {
      transform: [
        {
          translateY: interpolate(
            clampedValue,
            [0, 1],
            [0, -topMargin],
            Extrapolation.CLAMP,
          ),
        },
      ],
    }
  })

  const animatedTempTxtStyles = useAnimatedStyle(() => {
    const clampedValue = clamp(animatedPosition.value)
    const fontFamily = clampedValue > 0.5 ? 'SF-Semibold' : 'SF-Thin'

    return {
      fontFamily,
      opacity: interpolate(
        clampedValue,
        [0, 0.5, 1],
        [1, 0, 1],
        Extrapolation.CLAMP,
      ),
      fontSize: interpolate(
        clampedValue,
        [0, 1],
        [96, 20],
        Extrapolation.CLAMP,
      ),
      lineHeight: interpolate(
        clampedValue,
        [0, 1],
        [96, 20],
        Extrapolation.CLAMP,
      ),
      color: interpolateColor(
        clampedValue,
        [0, 1],
        ['white', 'rgba(235,235,245,0.6)'],
        'RGB',
      ),
    }
  })

  const animatedMinMaxTxtStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(animatedPosition.value, [0, 0.5], [1, 0]),
    }
  })

  const animatedSeperatorTxtStyle = useAnimatedStyle(() => {
    const display = animatedPosition.value > 0.5 ? 'flex' : 'none'
    return {
      display,
      opacity: interpolate(animatedPosition.value, [0, 0.5, 1], [0, 0, 1]),
    }
  })

  const animatedTempConditionStyles = useAnimatedStyle(() => {
    const flexDirection = animatedPosition.value > 0.5 ? 'row' : 'column'
    return {
      flexDirection,
    }
  })

  const animatedConditionTxtStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            animatedPosition.value,
            [0, 0.5, 1],
            [0, -20, 0],
            Extrapolation.CLAMP,
          ),
        },
      ],
    }
  })

  return (
    <Animated.View
      style={[
        { alignItems: 'center', marginTop: weatherInfoMargin },
        animatedViewStyle,
      ]}
    >
      <Animated.Text style={styles.cityText}>{city}</Animated.Text>
      <Animated.View
        style={[{ alignItems: 'center' }, animatedTempConditionStyles]}
      >
        <Animated.View style={[{ flexDirection: 'row' }]}>
          <Animated.Text
            style={[styles.temperatureText, animatedTempTxtStyles]}
          >
            {temperature}
            {DEGREE_SYMBOL}
          </Animated.Text>
          <Animated.Text
            style={[styles.seperatorText, animatedSeperatorTxtStyle]}
          >
            |
          </Animated.Text>
        </Animated.View>

        <Animated.Text
          style={[styles.conditionText, animatedConditionTxtStyle]}
        >
          {condition}
        </Animated.Text>
      </Animated.View>
      <Animated.Text style={[styles.minMaxText, animatedMinMaxTxtStyles]}>
        H:{high}
        {DEGREE_SYMBOL} L:{low}
        {DEGREE_SYMBOL}
      </Animated.Text>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  cityText: {
    fontFamily: 'SF-Regular',
    color: 'white',
    fontSize: 34,
    lineHeight: 41,
  },
  temperatureText: {
    fontFamily: 'SF-Thin',
    fontSize: 96,
    color: 'white',
    lineHeight: 96,
  },
  seperatorText: {
    fontFamily: 'SF-Semibold',
    fontSize: 20,
    color: 'rgba(235,235,245,0.6)',
    lineHeight: 20,
    marginHorizontal: 2,
    display: 'none',
  },
  conditionText: {
    fontFamily: 'SF-Semibold',
    fontSize: 20,
    color: 'rgba(235,235,245,0.6)',
    lineHeight: 20,
  },
  minMaxText: {
    fontFamily: 'SF-Semibold',
    fontSize: 20,
    color: 'white',
    lineHeight: 20,
  },
})
