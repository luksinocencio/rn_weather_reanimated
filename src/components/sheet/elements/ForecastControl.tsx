import { StyleSheet, Text, View } from "react-native";

export function ForecastControl() {
  return (
    <View style={styles.container}>
      <Text style={styles.forecastText}>Hourly Forecast</Text>
      <Text style={styles.forecastText}>Weekly Forecast</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
