import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import { useSelector } from "react-redux";
import { Svg, Path, Circle } from "react-native-svg";
import { range } from "d3-array";
import { scaleLinear } from "d3-scale";
import * as d3Shape from "d3-shape";
import hospitalLogo from "../assets/images/hospital_logo.png";
import logo from "../assets/images/logo.png";

const { width: screenWidth } = Dimensions.get("window");
const GRAPH_WIDTH = screenWidth * 0.85;
const GRAPH_HEIGHT = 100;

const HomeScreen = () => {
  const reportData = useSelector((state) => state.report.reportData);
  const userData = useSelector((state) => state.auth.userData);
  const history = reportData?.history ?? [];
  const last = history[history.length - 1] || {};
  const prev = history[history.length - 2] || {};

  useEffect(() => {
    console.log(reportData);
  }, []);

  const {
    composite_mean,
    composite_std,
    composite_score_current,
    composite_min,
    composite_max,
    composite_percentile,
  } = reportData;

  const xScale = scaleLinear()
    .domain([composite_min - 1, composite_max + 1])
    .range([0, GRAPH_WIDTH]);

  const yScale = scaleLinear().domain([0, 1]).range([GRAPH_HEIGHT, 0]);

  const createNormalDistPath = () => {
    if (!composite_mean || !composite_std) return "";
    const normal = d3Shape
      .line()
      .x((d) => xScale(d))
      .y((d) =>
        yScale(
          (1 / (composite_std * Math.sqrt(2 * Math.PI))) *
            Math.exp(-0.5 * Math.pow((d - composite_mean) / composite_std, 2))
        )
      );

    const xValues = range(
      composite_min - 1,
      composite_max + 1,
      (composite_max - composite_min) / 100
    );

    return normal(xValues);
  };

  const getNormalY = (xVal) => {
    if (!composite_std || !composite_mean) return GRAPH_HEIGHT / 2;
    const yVal =
      (1 / (composite_std * Math.sqrt(2 * Math.PI))) *
      Math.exp(-0.5 * Math.pow((xVal - composite_mean) / composite_std, 2));
    return yScale(yVal);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.hospitalContainer}>
        <Image source={hospitalLogo} style={styles.hospitalLogo} />
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.greetingContainer}>
          <View style={styles.logoContainer}>
            <Image source={logo} style={styles.logo} />
          </View>
          <Text style={styles.greeting}>
            안녕하세요 {userData?.name || "OOO"} 회원님!
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>📊 종합 점수 분포</Text>
          <Text style={styles.cardDesc}>
            아래 그래프는 사용자의 체형 점수가 전체 분포 중 어디에 위치하는지를
            나타냅니다.
          </Text>

          <Svg
            width={GRAPH_WIDTH}
            height={GRAPH_HEIGHT}
            style={{ alignSelf: "center" }}
          >
            {composite_mean && composite_std ? (
              <>
                <Path
                  d={createNormalDistPath()}
                  stroke="#fff"
                  strokeWidth={2}
                  fill="none"
                />
                {composite_score_current != null && (
                  <Circle
                    cx={xScale(composite_score_current)}
                    cy={getNormalY(composite_score_current)}
                    r={6}
                    fill="#e74c3c"
                  />
                )}
              </>
            ) : (
              <Text
                style={{
                  color: "#fff",
                  fontSize: 13,
                  textAlign: "center",
                  marginTop: 30,
                }}
              >
                데이터가 부족하여 그래프를 표시할 수 없습니다.
              </Text>
            )}
          </Svg>

          <Text style={styles.alertText}>
            현재 위치: {composite_score_current?.toFixed(2) ?? "-"}점 (상위{" "}
            {composite_percentile ?? "-"}%)
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>📈 세부 지표 변화 추이</Text>

          <View style={styles.tableHeader}>
            <Text style={[styles.tableCell, { flex: 2 }]}>지표</Text>
            <Text style={styles.tableCell}>이전</Text>
            <Text style={styles.tableCell}>최근</Text>
            <Text style={styles.tableCell}>변화</Text>
          </View>

          {[
            { key: "shoulder_height_diff_px", label: "어깨 높이(px)" },
            { key: "hip_height_diff_px", label: "골반 높이(px)" },
            {
              key: "shoulder_line_horizontal_tilt_deg",
              label: "어깨 기울기(°)",
            },
            { key: "hip_line_horizontal_tilt_deg", label: "골반 기울기(°)" },
            { key: "torso_vertical_tilt_deg", label: "몸통 수직 기울기(°)" },
            { key: "ear_hip_vertical_tilt_deg", label: "귀-골반 기울기(°)" },
          ].map(({ key, label }) => {
            const before = prev?.[key]?.toFixed(2) ?? "-";
            const after = last?.[key]?.toFixed(2) ?? "-";
            const delta = reportData?.changes?.[key] ?? "-";

            return (
              <View style={styles.tableRow} key={key}>
                <Text style={[styles.tableCell, { flex: 2 }]}>{label}</Text>
                <Text style={styles.tableCell}>{before}</Text>
                <Text style={styles.tableCell}>{after}</Text>
                <Text style={styles.tableCell}>{delta}</Text>
              </View>
            );
          })}

          {!last || !Object.keys(last).length ? (
            <Text
              style={{
                color: "#ccc",
                fontSize: 12,
                textAlign: "center",
                marginTop: 8,
              }}
            >
              아직 측정 데이터가 없습니다. 데이터를 등록해주세요.
            </Text>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  container: { padding: 16 },
  hospitalContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginLeft: 16,
    marginTop: 16,
    marginBottom: -16,
  },
  hospitalLogo: { width: 120, height: 60, resizeMode: "contain" },
  greetingContainer: {
    display: "flex",
    flexDirection: "row",
  },
  greeting: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 12,
    textAlign: "center",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  logoContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    maxHeight: 60,
  },
  logo: { width: 45, height: 45, resizeMode: "contain" },
  card: {
    backgroundColor: "#22405a",
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardDesc: { color: "#d9e6f2", fontSize: 13, marginBottom: 12 },
  alertText: {
    color: "#fff",
    fontSize: 13,
    textAlign: "center",
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#d9e6f2",
    paddingBottom: 4,
    marginBottom: 2,
  },
  tableRow: { flexDirection: "row", paddingVertical: 4 },
  tableCell: { color: "#fff", fontSize: 12, flex: 1, textAlign: "center" },
});
