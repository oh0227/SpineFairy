import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import hospitalLogo from "../assets/images/hospital_logo.png";
import { SafeAreaView } from "react-native-safe-area-context";

// 그래프용 라이브러리 예시 import (실제 구현시 설치 필요)
// import { LineChart } from 'react-native-chart-kit';

const { width } = Dimensions.get("window");

const chartData = [
  {
    title: "어깨 기울기",
    data: [10, 9.2, 9.5, 10.2],
    labels: ["5월 1일", "5월 7일", "5월 13일", "5월 17일"],
  },
  {
    title: "골반 기울기",
    data: [4.5, 5.2, 5.2, 5],
    labels: ["5월 1일", "5월 7일", "5월 13일", "5월 17일"],
  },
  {
    title: "척추 기울기",
    data: [6.5, 6.5, 6.1, 6],
    labels: ["5월 1일", "5월 7일", "5월 13일", "5월 17일"],
  },
  {
    title: "허리 면적",
    data: [11.2, 12, 12, 12.2],
    labels: ["5월 1일", "5월 7일", "5월 13일", "5월 17일"],
  },
];

const AnalysisScreen = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <View style={styles.hospitalContainer}>
          <Image
            source={hospitalLogo}
            style={styles.hospitalLogo}
            resizeMode="contain"
          />
        </View>
        <TouchableOpacity>
          <Image
            source={{ uri: "https://dummyimage.com/36x36/cccccc/fff&text=U" }}
            style={styles.profileIcon}
          />
        </TouchableOpacity>
      </View>
      <ScrollView>
        {/* 정밀 분석 카드 */}
        <View style={styles.card}>
          <View style={styles.analysisHeader}>
            <Text style={styles.analysisTitle}>정밀 분석</Text>
            <TouchableOpacity style={styles.dateBtn}>
              <Text style={styles.dateText}>2025-05-17 ▼</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>성별 여성</Text>
            <Text style={styles.infoText}>키 165 cm</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>나이 32 세</Text>
            <Text style={styles.infoText}>몸무게 50 kg</Text>
          </View>
          <View style={styles.divider} />
          <Text style={styles.sectionTitle}>촬영 이미지 분석</Text>
          <View style={styles.imageAnalysisRow}>
            <View style={styles.analysisIndicators}>
              <Indicator label="어깨 기울기" value="10°" up />
              <Indicator label="골반 기울기" value="5°" down />
              <Indicator label="척추 기울기" value="6°" down />
              <Indicator label="허리 면적" value="12" up />
            </View>
            <Image
              source={{
                uri: "https://dummyimage.com/120x180/cccccc/fff&text=Photo",
              }}
              style={styles.analysisImg}
            />
          </View>
        </View>

        {/* 그래프 카드들 */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>지표 변화 그래프</Text>
          <ChartBox title="어깨 기울기" data={chartData[0]} />
          <ChartBox title="골반 기울기" data={chartData[1]} />
          <ChartBox title="척추 기울기" data={chartData[2]} />
          <ChartBox title="허리 면적" data={chartData[3]} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// 인디케이터 컴포넌트
function Indicator({ label, value, up, down }) {
  return (
    <View style={styles.indicatorBox}>
      <Text style={styles.indicatorLabel}>{label}</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text
          style={[
            styles.indicatorValue,
            up && { color: "#e74c3c" },
            down && { color: "#27ae60" },
          ]}
        >
          {value}
        </Text>
        {up && <Text style={{ color: "#e74c3c", marginLeft: 2 }}>↑</Text>}
        {down && <Text style={{ color: "#27ae60", marginLeft: 2 }}>↓</Text>}
      </View>
    </View>
  );
}

// 그래프 박스 (실제 그래프 라이브러리로 교체 가능)
function ChartBox({ title, data }) {
  return (
    <View style={styles.chartBox}>
      <Text style={styles.chartTitle}>{title}</Text>
      {/* 실제 그래프 라이브러리로 대체 */}
      <View style={styles.dummyChart}>
        <Text style={{ color: "#22405a", fontSize: 12, textAlign: "center" }}>
          [그래프]
        </Text>
      </View>
    </View>
  );
}

export default AnalysisScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  hospitalContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    maxHeight: 200,
  },
  hospitalLogo: {
    width: 120,
    maxHeight: 200,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    marginHorizontal: 16,
    marginBottom: 4,
  },
  logoBox: { flexDirection: "row", alignItems: "center" },
  logoImg: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#22405a",
  },
  logoText: { color: "#22405a", fontWeight: "bold", fontSize: 18 },
  logoSub: { color: "#22405a", fontSize: 12 },
  profileIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#eee",
  },

  card: {
    backgroundColor: "#22405a",
    borderRadius: 18,
    marginHorizontal: 16,
    marginBottom: 18,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  analysisHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  analysisTitle: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  dateBtn: {
    backgroundColor: "#18314f",
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  dateText: { color: "#fff", fontSize: 12 },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  infoText: { color: "#fff", fontSize: 13 },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#b0c4de",
    marginVertical: 10,
  },
  sectionTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    marginVertical: 6,
  },
  imageAnalysisRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  analysisIndicators: { flex: 1, justifyContent: "space-between" },
  analysisImg: {
    width: 120,
    height: 180,
    borderRadius: 12,
    backgroundColor: "#eee",
    marginLeft: 12,
  },
  indicatorBox: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
    marginBottom: 6,
  },
  indicatorLabel: { color: "#22405a", fontSize: 12 },
  indicatorValue: { fontWeight: "bold", fontSize: 16, color: "#22405a" },

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
  dummyChart: {
    height: 120,
    backgroundColor: "#eaf2fa",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
