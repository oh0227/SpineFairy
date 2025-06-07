import react from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

const { width } = Dimensions.get("window");

function ChartBox({ title, data, labels }) {
  return (
    <View style={styles.chartBox}>
      <Text style={styles.chartTitle}>{title}</Text>
      <LineChart
        data={{
          labels: labels || [],
          datasets: [{ data }],
        }}
        width={width - 100}
        height={180}
        yAxisSuffix="°"
        chartConfig={{
          backgroundColor: "#f9f9f9",
          backgroundGradientFrom: "#f9f9f9",
          backgroundGradientTo: "#f9f9f9",
          decimalPlaces: 1,
          color: () => `#22405a`,
          labelColor: () => `#22405a`,
          propsForDots: {
            r: "4",
            strokeWidth: "2",
            stroke: "#22405a",
          },
        }}
        style={{ borderRadius: 8 }}
      />
    </View>
  );
}

export default ChartBox;

const styles = StyleSheet.create({
  chartBox: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    marginVertical: 8,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  chartTitle: {
    color: "#22405a",
    fontWeight: "bold",
    fontSize: 13,
    marginBottom: 6,
  },
});
