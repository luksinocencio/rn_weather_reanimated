import { Canvas, RoundedRect, Shadow } from "@shopify/react-native-skia";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Forecast, ForecastType } from "../../models/Weather";
import { convertDate12HrFormat, getDayOfWeek } from "../../utils/DateHelper";

interface ForecastCapsuleProps {
  forecast: Forecast;
  width: number;
  height: number;
  radius: number;
}

export function ForecastCapsule({
  forecast,
  width,
  height,
  radius,
}: ForecastCapsuleProps) {
  const { date, icon, probability, temperature, type } = forecast;

  const timeDateOpacityDisplay = (): [string, number] => {
    let opacity = 0;
    let timeOrDay = "";

    if (type === ForecastType.Hourly) {
      timeOrDay = convertDate12HrFormat(date);
      opacity = 1;
    } else {
      const [dayOfWeek, isToday] = getDayOfWeek(date);
      timeOrDay = dayOfWeek;
      opacity = isToday ? 1 : 0.2;
    }

    return [timeOrDay, opacity];
  };

  const [timeToDisplay, opacity] = timeDateOpacityDisplay();
  const probabilityValue = probability ? probability : 0;

  const myStyles = styles({ width, height });

  return (
    <View style={myStyles.container}>
      <Canvas style={{ ...StyleSheet.absoluteFillObject }}>
        <RoundedRect
          x={0}
          y={0}
          width={width}
          height={height}
          r={radius}
          color={`rgba(72,49,157, ${opacity})`}
        >
          <Shadow
            dx={1}
            dy={1}
            blur={0}
            color={"rgba(255,255,255,0.25)"}
            inner
          />
          <Shadow dx={5} dy={4} blur={10} color={"rgba(0,0,0,0.25)"} />
        </RoundedRect>
      </Canvas>
      <View style={myStyles.content}>
        <Text style={myStyles.time}>{timeToDisplay}</Text>
        <View>
          <Image source={icon} style={myStyles.image} />
          <Text style={[myStyles.probality, { opacity: probabilityValue }]}>
            {probability}%
          </Text>
        </View>
        <Text style={myStyles.temperature}>{temperature}</Text>
      </View>
    </View>
  );
}

const styles = ({ width, height }: { width: number; height: number }) =>
  StyleSheet.create({
    container: {
      height,
      width,
    },
    image: {
      width: width / 2,
      height: width / 2,
    },
    content: {
      flex: 1,
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 19,
    },
    time: {
      fontFamily: "SF-Semibold",
      fontSize: 15,
      lineHeight: 20,
      color: "white",
      letterSpacing: -0.5,
    },
    probality: {
      fontFamily: "SF-Semibold",
      fontSize: 13,
      lineHeight: 18,
      color: "#40cbd8",
      textAlign: "center",
    },
    temperature: {
      fontFamily: "SF-Regular",
      fontSize: 20,
      lineHeight: 24,
      color: "white",
      letterSpacing: 0.38,
    },
  });
