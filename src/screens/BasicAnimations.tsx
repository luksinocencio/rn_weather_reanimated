import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
} from "react-native-reanimated";

interface BasicAnimationsProps {}

export function BasicAnimations({}: BasicAnimationsProps) {
  const SIZE = 200;
  const scale = useSharedValue(1);
  const borderRadius = useSharedValue(0);

  const squareCircleStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { translateY: interpolate(borderRadius.value, [0, 1], [-300, 100]) },
      ],
      borderRadius: borderRadius.value * SIZE,
    };
  });

  const myStyles = styles();

  useEffect(() => {
    scale.value = withRepeat(withSpring(2), -1, true);
    borderRadius.value = withRepeat(withSpring(1), -1, true);
  }, []);

  return (
    <View style={myStyles.container}>
      <Animated.View
        style={[
          { height: SIZE, width: SIZE, backgroundColor: "red" },
          squareCircleStyle,
        ]}
      ></Animated.View>
    </View>
  );
}

const styles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });
