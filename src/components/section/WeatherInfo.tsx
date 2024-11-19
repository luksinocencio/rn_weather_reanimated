import {StyleSheet, Text, View} from "react-native";
import {Weather} from "../../models/Weather";
import {DEGREE_SYMBOL} from "../../utils/Constants";
import {useSafeAreaInsets} from "react-native-safe-area-context";

export interface WeatherInfoProps {
  weather: Weather;
}

export function WeatherInfo({weather}: WeatherInfoProps) {
  const {city, temperature, condition, high, low} = weather;
  const {top} = useSafeAreaInsets()
  const weatherInfoMargin = top + 51
  const myStyles = styles({weatherInfoMargin})

  return (
    <View style={myStyles.container}>
      <Text style={myStyles.cityText}>{city}</Text>
      <Text style={myStyles.temperatureText}>{temperature}</Text>
      <Text style={myStyles.conditionText}>{condition}</Text>
      <Text style={myStyles.minMaxText}>H:{high}{DEGREE_SYMBOL} L:{low}{DEGREE_SYMBOL}</Text>
    </View>
  );
}

interface WeatherInfoStylesProps {
  weatherInfoMargin: number;
}

const styles = ({weatherInfoMargin}: WeatherInfoStylesProps) => StyleSheet.create({
  container: {
    marginTop: weatherInfoMargin,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cityText: {
    fontFamily: 'SF-Regular',
    color: 'white',
    fontSize: 34,
    lineHeight: 41
  },
  temperatureText: {
    fontFamily: 'SF-Thin',
    color: 'white',
    fontSize: 96,
    lineHeight: 96
  },
  conditionText: {
    fontFamily: 'SF-Semibold',
    fontSize: 20,
    color: 'rgba(235, 235, 245, 0.6)',
    lineHeight: 20
  },
  minMaxText: {
    fontFamily: 'SF-Semibold',
    fontSize: 20,
    color: 'white',
    lineHeight: 20
  }
})