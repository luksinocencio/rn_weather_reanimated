import {
  Canvas,
  LinearGradient,
  Rect,
  SkiaDomView,
  vec,
} from "@shopify/react-native-skia";
import React from "react";
import {
  Image,
  ImageBackground,
  ScaledSize,
  StyleSheet,
  View,
} from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import { useForecastSheetPosition } from "../context/ForecastSheetContext";
import { useApplicationDimensions } from "../hooks/useApplicationDimensions";

export function HomeBackground() {
  const dimensions = useApplicationDimensions();
  const { width, height } = dimensions;

  const smokeHeight = height * 0.6;
  const smokeOffsetY = height * 0.4;
  const animatedPosition = useForecastSheetPosition();
  const containerRef = useAnimatedRef<SkiaDomView>();
  const leftBkgColor = useSharedValue("#2e3354");
  const rightBkgColor = useSharedValue("#1c1b33");
  const bkgColors = useDerivedValue(() => {
    leftBkgColor.value = interpolateColor(
      animatedPosition.value,
      [0, 1],
      ["#2e3354", "#422E5a"],
    );

    return [leftBkgColor.value, rightBkgColor.value];
  });

  const AnimatedImgBkg = Animated.createAnimatedComponent(ImageBackground);
  const AnimatedCanvas = Animated.createAnimatedComponent(Canvas);

  const myStyles = styles(dimensions);

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
    };
  });

  const animatedCanvasSmokeStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        animatedPosition.value,
        [0, 0.1],
        [1, 0],
        Extrapolation.CLAMP,
      ),
    };
  });

  useAnimatedReaction(
    () => {
      return animatedPosition.value;
    },
    (cv) => {
      console.log(cv);
    },
  );

  return (
    <View style={{ ...StyleSheet.absoluteFillObject }}>
      <Canvas style={myStyles.container}>
        <Rect x={0} y={0} width={width} height={height}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(width, height)}
            colors={bkgColors}
          />
        </Rect>
      </Canvas>
      <AnimatedImgBkg
        source={require("../assets/home/Background.png")}
        resizeMode="cover"
        style={[myStyles.imageBackground, animatedImgBkgStyles]}
      >
        <AnimatedCanvas
          ref={containerRef}
          style={[
            animatedCanvasSmokeStyles,
            {
              height: smokeHeight,
              ...StyleSheet.absoluteFillObject,
              top: smokeOffsetY,
            },
          ]}
        >
          <Rect x={0} y={0} width={width} height={smokeHeight}>
            <LinearGradient
              start={vec(width / 2, 0)}
              end={vec(width / 2, smokeHeight)}
              colors={["rgba(58,63,84,0)", "rgba(58,63,84,1)"]}
              positions={[-0.02, 0.54]}
            />
          </Rect>
        </AnimatedCanvas>
        <Image
          source={require("../assets/home/House.png")}
          resizeMode="cover"
          style={myStyles.houseImage}
        />
      </AnimatedImgBkg>
    </View>
  );
}

const styles = ({ width }: ScaledSize) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    imageBackground: {
      height: "100%",
    },
    houseImage: {
      width: width,
      height: width,
      ...StyleSheet.absoluteFillObject,
      top: "36%",
    },
  });
