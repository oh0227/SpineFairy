import React from "react";
import { StyleSheet, Text, View } from "react-native";

// 인디케이터 컴포넌트
function Indicator({ label, originalValue, changeValue, unit = "°" }) {
  const isValidNumber =
    typeof changeValue === "number" && isFinite(changeValue);

  return (
    <View style={styles.indicatorBox}>
      <Text style={styles.indicatorLabel}>{label}</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text
          style={[
            styles.indicatorValue,
            isValidNumber && changeValue > 0 && { color: "#e74c3c" },
            isValidNumber && changeValue < 0 && { color: "#27ae60" },
          ]}
        >
          {isValidNumber
            ? `${originalValue.toFixed(2)} (${changeValue.toFixed(2)}${unit}`
            : `${originalValue.toFixed(2)}`}
        </Text>
        {isValidNumber && changeValue > 0 && (
          <Text style={{ color: "#e74c3c", marginLeft: 2 }}>↑</Text>
        )}
        {isValidNumber && changeValue < 0 && (
          <Text style={{ color: "#27ae60", marginLeft: 2 }}>↓</Text>
        )}
        <Text
          style={[
            styles.indicatorValue,
            isValidNumber && changeValue > 0 && { color: "#e74c3c" },
            isValidNumber && changeValue < 0 && { color: "#27ae60" },
          ]}
        >
          {isValidNumber ? ")" : ""}
        </Text>
      </View>
    </View>
  );
}

export default Indicator;

const styles = StyleSheet.create({
  indicatorBox: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
    marginBottom: 6,
  },
  indicatorLabel: {
    color: "#22405a",
    fontSize: 12,
  },
  indicatorValue: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#22405a",
  },
});
