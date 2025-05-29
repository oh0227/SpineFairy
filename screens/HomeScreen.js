import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import hospitalLogo from "../assets/images/hospital_logo.png";

const { width } = Dimensions.get("window");

const HomeScreen = (props) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.hospitalContainer}>
          <Image
            source={hospitalLogo}
            style={styles.hospitalLogo}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.greeting}>안녕하세요 OOO 회원님!</Text>

        {/* 척만증 종합 분석 카드 */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>측만증 종합 분석</Text>
          <Text style={styles.cardDesc}>
            측만증의 확인을 종합 분석으로 환자의 정면 사진에서 추출한 지표들을
            바탕으로 측만증 지표를 계산합니다.
          </Text>
          {/* 그래프 영역 (간단한 곡선 및 점) */}
          <View style={styles.graphArea}>
            <View style={styles.graphLine} />
            <View style={styles.graphDot} />
          </View>
          {/* 하위 10% 안내 */}
          <View style={styles.alertBox}>
            <Text style={styles.alertText}>청년 여성 기준 하위 10%입니다</Text>
          </View>
          <Text style={styles.cardNotice}>
            일상에서의 불편함이 있을 수 있으며 지속적인 관리가 필요해 보입니다.
          </Text>
          <Text style={styles.smallNotice}>
            ※ 정확한 치료는 반드시 대면 진료를 통해서 받으시기 바랍니다.
          </Text>
        </View>

        {/* 세부 지표 변화 추이 카드 */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>세부 지표 변화 추이</Text>
          <Text style={styles.cardDescSmall}>
            OOO님 · 여성 · 30대{"\n"}최근 촬영일 2025-04-26 | 지난 촬영일
            2025-04-22
          </Text>
          {/* 예시 테이블 */}
          <View style={styles.tableHeader}>
            <Text style={[styles.tableCell, { flex: 2 }]}>지표 (단위)</Text>
            <Text style={styles.tableCell}>최근</Text>
            <Text style={styles.tableCell}>이전</Text>
            <Text style={styles.tableCell}>변화</Text>
            <Text style={styles.tableCell}>랭킹</Text>
          </View>
          {/* 예시 데이터 행 */}
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 2 }]}>Shoulder Slope</Text>
            <Text style={styles.tableCell}>88P</Text>
            <Text style={styles.tableCell}>+1.6</Text>
            <Text style={styles.tableCell}>8P</Text>
            <Text style={styles.tableCell}>주의</Text>
          </View>
          {/* 추가 행은 map으로 반복 */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  container: { padding: 16, backgroundColor: "#fff" },
  hospitalContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    maxHeight: 200,
  },
  hospitalLogo: {
    width: 120,
    maxHeight: 200,
  },
  logo: { fontSize: 20, fontWeight: "bold", color: "#2c4a6b" },
  subLogo: { fontSize: 12, color: "#2c4a6b" },
  greeting: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 12,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#22405a",
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },
  cardDesc: { color: "#d9e6f2", fontSize: 13, marginBottom: 14 },
  graphArea: {
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  graphLine: {
    width: width * 0.6,
    height: 2,
    backgroundColor: "#fff",
    borderRadius: 1,
    position: "absolute",
    top: 40,
    left: width * 0.1,
  },
  graphDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#e74c3c",
    position: "absolute",
    left: width * 0.22,
    top: 36,
    borderWidth: 2,
    borderColor: "#fff",
  },
  alertBox: {
    backgroundColor: "#e74c3c",
    borderRadius: 6,
    paddingVertical: 6,
    marginBottom: 6,
  },
  alertText: { color: "#fff", fontWeight: "bold", textAlign: "center" },
  cardNotice: {
    color: "#fff",
    fontSize: 12,
    marginBottom: 6,
    textAlign: "center",
  },
  smallNotice: { color: "#b0c4de", fontSize: 11, textAlign: "center" },
  cardDescSmall: { color: "#d9e6f2", fontSize: 12, marginBottom: 8 },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#d9e6f2",
    paddingBottom: 4,
    marginBottom: 2,
  },
  tableRow: { flexDirection: "row", paddingVertical: 3 },
  tableCell: { color: "#fff", fontSize: 11, flex: 1, textAlign: "center" },
});
