import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useCallback, useRef, useState } from "react";

import { hourly, weekly } from "../../data/ForecastData";
import { useApplicationDimensions } from "../../hooks/useApplicationDimensions";
import { ForecastType } from "../../models/Weather";
import { ForecastScroll } from "../forecast/ForecastScroll";
import { ForecastSheetBackground } from "./ForecastSheetBackground";
import { ForecastControl } from "./elements/ForecastControl";
import { Separator } from "./elements/Separator";

export function ForecastSheet() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { width, height } = useApplicationDimensions();
  const snapPoints = ["38.5%", "83%"];
  const firstSnapPoint = height * (parseFloat(snapPoints[0]) / 100);
  const cornerRadius = 44;
  const capsuleRadius = 30;
  const capsuleHeight = height * 0.17;
  const capsuleWidth = width * 0.15;
  const [selectedForecastType, setSelectedForecastType] =
    useState<ForecastType>(ForecastType.Hourly);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <BottomSheet
      snapPoints={snapPoints}
      handleIndicatorStyle={{
        width: 48,
        height: 5,
        backgroundColor: "rgba(0,0,0,0.3)",
      }}
      backgroundComponent={() => (
        <ForecastSheetBackground
          width={width}
          height={firstSnapPoint}
          cornerRadius={cornerRadius}
        />
      )}
      ref={bottomSheetRef}
      onChange={handleSheetChanges}
    >
      <BottomSheetView style={{ flex: 1 }}>
        <ForecastControl onPress={(type) => setSelectedForecastType(type)} />
        <Separator width={width} height={3} />
        <ForecastScroll
          capsuleWidth={capsuleWidth}
          capsuleHeight={capsuleHeight}
          capsuleRadius={capsuleRadius}
          forecasts={
            selectedForecastType === ForecastType.Hourly ? hourly : weekly
          }
        />
      </BottomSheetView>
    </BottomSheet>
  );
}
