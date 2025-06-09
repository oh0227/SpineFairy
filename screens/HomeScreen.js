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
import { Svg, Path, Circle, Rect } from "react-native-svg";
import { range } from "d3-array";
import { scaleLinear } from "d3-scale";
import * as d3Shape from "d3-shape";
import hospitalLogo from "../assets/images/hospital_logo.png";
import logo from "../assets/images/logo.png";

const { width: screenWidth } = Dimensions.get("window");
const GRAPH_WIDTH = screenWidth * 0.85;
const GRAPH_HEIGHT = 100;

// 변화량 계산 함수
function getDifferences(current, previous) {
  if (!current || !previous) return {};
  const keys = [
    "shoulder_line_horizontal_tilt_deg",
    "shoulder_height_diff_px",
    "hip_line_horizontal_tilt_deg",
    "hip_height_diff_px",
    "torso_vertical_tilt_deg",
    "ear_hip_vertical_tilt_deg",
  ];

  const diffs = {};
  keys.forEach((key) => {
    const currentVal = Number(current?.[key] ?? 0);
    const prevVal = Number(previous?.[key] ?? 0);
    diffs[key] = currentVal - prevVal;
  });

  return diffs;
}

const HomeScreen = () => {
  const reportData = useSelector((state) => state.report.reportData);
  const userData = useSelector((state) => state.auth.userData);
  const history = reportData?.history ?? [];
  const last = history[history.length - 1] || {};
  const prev = history[history.length - 2] || {};
  const differences = getDifferences(last, prev);

  const {
    composite_mean,
    composite_std,
    composite_score_current,
    composite_percentile,
    composite_min,
    composite_max,
  } = reportData;

  let xScale, yScale, getNormalY, createNormalDistPath;
  if (composite_mean && composite_std) {
    const xMin = composite_mean - 3 * composite_std;
    const xMax = composite_mean + 3 * composite_std;

    xScale = scaleLinear()
      .domain([xMax, xMin]) // 좌우 반전
      .range([0, GRAPH_WIDTH]);

    const getGaussian = (x) =>
      (1 / (composite_std * Math.sqrt(2 * Math.PI))) *
      Math.exp(-0.5 * Math.pow((x - composite_mean) / composite_std, 2));

    const peakY = getGaussian(composite_mean);

    yScale = scaleLinear()
      .domain([0, peakY])
      .range([GRAPH_HEIGHT - 10, 10]);

    getNormalY = (xVal) => {
      const yVal = getGaussian(xVal);
      return yScale(yVal);
    };

    createNormalDistPath = () => {
      const xValues = range(xMin, xMax, (xMax - xMin) / 100);
      const normal = d3Shape
        .line()
        .x((d) => xScale(d))
        .y((d) => yScale(getGaussian(d)));
      return normal(xValues);
    };
  }

  let boxColor = "#e74c3c";
  let percentileMessage =
    "일상에서의 불편함이 있을 수 있으며 지속적인 관리가 필요해 보입니다.";

  if (composite_percentile !== null && composite_percentile !== undefined) {
    if (composite_percentile <= 33) {
      boxColor = "#2ecc71";
      percentileMessage =
        "척추 정렬이 매우 양호한 상태입니다. 현재 상태를 잘 유지하세요!";
    } else if (composite_percentile <= 66) {
      boxColor = "#f1c40f";
      percentileMessage =
        "약간의 불균형이 있지만 일상생활에 큰 지장은 없습니다. 꾸준한 관리가 필요합니다.";
    }
  }

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
          <Text style={styles.cardTitle}>📋 측만증 종합 분석</Text>
          <Text style={styles.cardDesc}>
            척추의 요정의 측만증 종합 분석은 환자의 정면 사진에서 추출한
            지표들을 바탕으로 측만증 지표를 계산합니다.
          </Text>

          <View
            style={{
              borderRadius: 12,
              overflow: "hidden",
              marginTop: 8,
              marginBottom: 16,
            }}
          >
            <Svg
              width={GRAPH_WIDTH}
              height={GRAPH_HEIGHT}
              style={{ alignSelf: "center", backgroundColor: "transparent" }}
            >
              <Rect
                x="0"
                y="0"
                width={GRAPH_WIDTH}
                height={GRAPH_HEIGHT}
                fill="#fff"
                rx={12}
                ry={12}
              />

              {composite_mean && composite_std ? (
                <>
                  <Path
                    d={createNormalDistPath()}
                    stroke="#000"
                    strokeWidth={2}
                    fill="none"
                  />
                  {composite_score_current != null && (
                    <Circle
                      cx={xScale(composite_score_current)}
                      cy={getNormalY(composite_score_current)}
                      r={6}
                      fill={boxColor}
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
          </View>

          <View
            style={{
              backgroundColor: boxColor,
              padding: 8,
              borderRadius: 8,
              marginTop: 8,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 13, textAlign: "center" }}>
              {reportData?.user?.age}대 {reportData?.user?.gender} 기준: 상위{" "}
              {composite_percentile ?? "-"}% 입니다
            </Text>
          </View>

          <Text style={styles.alertText}>{percentileMessage}</Text>

          <Text
            style={{
              color: "#ccc",
              fontSize: 11,
              textAlign: "center",
              marginTop: 8,
            }}
          >
            ※ 정확한 치료는 반드시 대면 진료를 통해 숙지하시기 바랍니다.
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
          ].map(({ key: propKey, label }) => {
            const before =
              prev && typeof prev[propKey] === "number"
                ? prev[propKey].toFixed(2)
                : "-";
            const after =
              last && typeof last[propKey] === "number"
                ? last[propKey].toFixed(2)
                : "-";
            const delta =
              prev &&
              last &&
              typeof differences[propKey] === "number" &&
              !isNaN(differences[propKey])
                ? differences[propKey].toFixed(2)
                : "-";

            return (
              <View style={styles.tableRow} key={propKey}>
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
