import {
  Canvas,
  LinearGradient,
  Path,
  RoundedRect,
  vec,
} from "@shopify/react-native-skia";
import { BlurView } from "expo-blur";
import { Animated, StyleSheet } from "react-native";
import { interpolateColor, useAnimatedStyle } from "react-native-reanimated";
import { useForecastSheetPosition } from "../../context/ForecastSheetContext";

interface ForecastSheetBackgroundProps {
  width: number;
  height: number;
  cornerRadius: number;
}

export function ForecastSheetBackground({
  width,
  height,
  cornerRadius,
}: ForecastSheetBackgroundProps) {
  const borderPath = `M 0 ${cornerRadius}
  A ${cornerRadius} ${cornerRadius} 0 0 1 ${cornerRadius} 0
  H ${width - cornerRadius}
  A ${cornerRadius} ${cornerRadius} 0 0 1 ${width} ${cornerRadius}`;

  const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
  const animatedPosition = useForecastSheetPosition();
  const blurViewStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        animatedPosition.value,
        [0, 0.5],
        ["transparent", "#422e5a"],
      ),
    };
  });

  return (
    <AnimatedBlurView
      intensity={50}
      tint="dark"
      experimentalBlurMethod="dimezisBlurView"
      style={[
        {
          ...StyleSheet.absoluteFillObject,
          borderRadius: cornerRadius,
          overflow: "hidden",
        },
        blurViewStyle,
      ]}
    >
      <Canvas style={{ flex: 1 }}>
        <RoundedRect x={0} y={0} width={width} height={height} r={cornerRadius}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(width, height)}
            colors={["rgba(46,51,90,0.26)", "rgba(28,57,51,0.26)"]}
            positions={[-0.04, 0.95]}
          />
        </RoundedRect>
        <Path path={borderPath} style="stroke" strokeWidth={2} color="white">
          <LinearGradient
            start={vec(width / 2, 0)}
            end={vec(width / 2, cornerRadius)}
            colors={["white", "transparent"]}
          />
        </Path>
      </Canvas>
    </AnimatedBlurView>
  );
}
