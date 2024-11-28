import { Canvas, Line, LinearGradient, vec } from "@shopify/react-native-skia";
import { Fragment, useState } from "react";
import {
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ForecastType } from "../../../models/Weather";

interface ForecastControlProps {
  onPress: (forecastType: ForecastType) => void;
}

export function ForecastControl({ onPress }: ForecastControlProps) {
  const [textWidth, setTextWidth] = useState(0);
  const spacingX = 32;
  const strokeWidth = 3;

  const myStyles = styles({ textWidth, spacingX, strokeWidth });

  function onTextLayout(event: LayoutChangeEvent) {
    setTextWidth(event.nativeEvent.layout.width);
  }

  return (
    <Fragment>
      <View style={myStyles.container}>
        <TouchableOpacity onPress={() => onPress(ForecastType.Hourly)}>
          <Text onLayout={onTextLayout} style={myStyles.forecastText}>
            Hourly Forecast
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPress(ForecastType.Weekly)}>
          <Text style={myStyles.forecastText}>Weekly Forecast</Text>
        </TouchableOpacity>
      </View>
      <Canvas style={myStyles.canvasContainer}>
        <Line p1={vec(0, 0)} p2={vec(textWidth, 0)} strokeWidth={strokeWidth}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(textWidth, 0)}
            colors={[
              "rgba(147,112,177,0)",
              "rgba(147,112,177,1)",
              "rgba(147,112,177,0)",
            ]}
          />
        </Line>
      </Canvas>
    </Fragment>
  );
}

const styles = ({
  textWidth,
  spacingX,
  strokeWidth,
}: {
  textWidth: number;
  spacingX: number;
  strokeWidth: number;
}) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 20,
    },
    forecastText: {
      fontFamily: "SF-Semibold",
      fontSize: 16,
      lineHeight: 20,
      color: "rgba(235,235,245,0.6)",
    },
    canvasContainer: {
      height: strokeWidth,
      width: textWidth,
      marginLeft: spacingX,
    },
  });
