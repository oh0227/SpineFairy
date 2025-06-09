import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import hospitalLogo from "../assets/images/hospital_logo.png";
import Indicator from "../components/Indicator";
import ChartBox from "../components/ChartBox";
import ImageViewing from "react-native-image-viewing";

// 데이터 유효성 검사 함수
function sanitizeData(arr) {
  return (arr || []).map((v) => {
    const num = Number(v);
    return typeof num === "number" && isFinite(num) && !isNaN(num) ? num : 0;
  });
}

// 분석 지표 변화량 계산 함수
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

// 날짜 포맷 유틸 함수
function formatKoreanDateTime(isoString) {
  if (!isoString) return "날짜 없음";
  const date = new Date(isoString);
  const yyyy = date.getFullYear();
  const MM = `${date.getMonth() + 1}`.padStart(2, "0");
  const dd = `${date.getDate()}`.padStart(2, "0");
  const hh = `${date.getHours()}`.padStart(2, "0");
  const mm = `${date.getMinutes()}`.padStart(2, "0");

  return `${yyyy}-${MM}-${dd} ${hh}시 ${mm}분`;
}

// 예: "2025-06-05T13:45:00Z" -> "6/5"
function formatShortDate(isoString) {
  if (!isoString) return "";

  const date = new Date(isoString);
  const mmdd = `${date.getMonth() + 1}/${date.getDate()}`;
  const time = `${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes()
  ).padStart(2, "0")}`;
  return `${mmdd}|${time}`; // ← 이게 핵심
}

const AnalysisScreen = () => {
  const reportData = useSelector((state) => state?.report?.reportData);
  const history = reportData?.history || [];
  const user = reportData?.user || {};
  const [selectedIndex, setSelectedIndex] = useState(
    history.length > 0 ? history.length - 1 : 0
  );
  const selected = history[selectedIndex] || {};
  const visuals = selected.visuals || {};
  const [modalVisible, setModalVisible] = useState(false);
  const previous = selectedIndex > 0 ? history[selectedIndex - 1] : null;
  const differences = previous ? getDifferences(selected, previous) : {};
  const dateLabels = history.map((h) => formatShortDate(h.created_at));
  const [zoomVisible, setZoomVisible] = useState(false);
  const [zoomIndex, setZoomIndex] = useState(0);

  const isEmpty = history.length === 0;

  const images = [
    {
      key: "shoulder_hip",
      indicators: [
        {
          label: "어깨 기울기",
          value: differences.shoulder_line_horizontal_tilt_deg,
        },
        {
          label: "어깨 높이 차이",
          value: differences.shoulder_height_diff_px,
        },
        {
          label: "골반 기울기",
          value: differences.hip_line_horizontal_tilt_deg,
        },
        {
          label: "골반 높이 차이",
          value: differences.hip_height_diff_px,
        },
      ],
      uri: visuals.shoulder_hip,
    },
    {
      key: "torso_tilt",
      indicators: [
        {
          label: "척추 기울기",
          value: differences.torso_vertical_tilt_deg,
        },
      ],
      uri: visuals.torso_tilt,
    },
    {
      key: "ear_hip_tilt",
      indicators: [
        {
          label: "귀-골반 수직 기울기",
          value: differences.ear_hip_vertical_tilt_deg,
        },
      ],
      uri: visuals.ear_hip_tilt,
    },
  ];

  const imageSources = images.map((img) => ({
    uri: img.uri || "https://dummyimage.com/120x180/cccccc/fff&text=Photo",
  }));

  const renderDropdown = () => (
    <Modal transparent visible={modalVisible} animationType="fade">
      <TouchableOpacity
        style={styles.modalOverlay}
        onPress={() => setModalVisible(false)}
      >
        <View style={styles.modalContent}>
          <FlatList
            data={history}
            keyExtractor={(_, idx) => idx.toString()}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => {
                    const foundIndex = history.findIndex(
                      (h) => h.created_at === item.created_at
                    );
                    if (foundIndex !== -1) {
                      setSelectedIndex(foundIndex);
                    }
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.modalText}>
                    {formatKoreanDateTime(item.created_at)}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
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
        {/* 분석 카드 */}
        <View style={styles.card}>
          <View style={styles.analysisHeader}>
            <Text style={styles.analysisTitle}>정밀 분석</Text>
            <View style={styles.dropdownWrapper}>
              <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => setModalVisible(true)}
              >
                <Text style={styles.dropdownText}>
                  {history[selectedIndex]
                    ? formatKoreanDateTime(history[selectedIndex]?.created_at)
                    : "데이터 없음"}
                </Text>
              </TouchableOpacity>
            </View>
            {renderDropdown()}
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoText}>성별 {user?.gender || "-"}</Text>
            <Text style={styles.infoText}>키 {user?.height || "-"} cm</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>나이 {user?.age || "-"} 세</Text>
            <Text style={styles.infoText}>몸무게 {user?.weight || "-"} kg</Text>
          </View>

          <View style={styles.divider} />
          <Text style={styles.sectionTitle}>촬영 이미지 분석</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {images.map((img) => (
              <View key={img.key} style={styles.imageCard}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    if (img.uri) {
                      setZoomIndex(images.findIndex((i) => i.key === img.key));
                      setZoomVisible(true);
                    }
                  }}
                >
                  <Image
                    source={
                      img.uri
                        ? { uri: img.uri }
                        : {
                            uri: "https://dummyimage.com/120x180/cccccc/fff&text=Photo",
                          }
                    }
                    style={styles.analysisImg}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    height: 1,
                    backgroundColor: "#2d4c6b",
                    width: "100%",
                    marginVertical: 10,
                  }}
                />
                <View style={styles.indicatorGroup}>
                  {img.indicators.map((ind, idx) => {
                    const showValue =
                      typeof ind.value === "number" && isFinite(ind.value)
                        ? ind.value
                        : null;
                    const unit = ind.label.includes("높이") ? "px" : "°";

                    return (
                      <Indicator
                        key={idx}
                        label={`${ind.label} (변화량)`}
                        value={isEmpty ? null : showValue}
                        unit={unit}
                      />
                    );
                  })}
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* 그래프 카드 */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>지표 변화 그래프</Text>
          {history.length > 1 && (
            <>
              <ChartBox
                title="어깨 기울기"
                data={sanitizeData(
                  history.map((h) => h?.shoulder_line_horizontal_tilt_deg)
                )}
                labels={dateLabels}
                yAxisSuffix="°"
              />
              <ChartBox
                title="어깨 높이 차이"
                data={sanitizeData(
                  history.map((h) => h?.shoulder_height_diff_px)
                )}
                labels={dateLabels}
                yAxisSuffix="px"
              />
              <ChartBox
                title="골반 기울기"
                data={sanitizeData(
                  history.map((h) => h?.hip_line_horizontal_tilt_deg)
                )}
                labels={dateLabels}
                yAxisSuffix="°"
              />
              <ChartBox
                title="골반 높이 차이"
                data={sanitizeData(history.map((h) => h?.hip_height_diff_px))}
                labels={dateLabels}
                yAxisSuffix="px"
              />
              <ChartBox
                title="척추 기울기"
                data={sanitizeData(
                  history.map((h) => h?.torso_vertical_tilt_deg)
                )}
                labels={dateLabels}
                yAxisSuffix="°"
              />
              <ChartBox
                title="귀-골반 수직 기울기"
                data={sanitizeData(
                  history.map((h) => h?.ear_hip_vertical_tilt_deg)
                )}
                labels={dateLabels}
                yAxisSuffix="°"
              />
            </>
          )}

          {/* 데이터가 완전히 없을 경우 하단 안내 메시지 추가 */}
          {isEmpty && (
            <View style={{ padding: 24, alignItems: "center" }}>
              <Text
                style={{ fontSize: 16, color: "#888", textAlign: "center" }}
              >
                분석 데이터가 없습니다.{"\n"}먼저 데이터를 등록해 주세요.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
      <ImageViewing
        images={imageSources}
        imageIndex={zoomIndex}
        visible={zoomVisible}
        onRequestClose={() => setZoomVisible(false)}
        swipeToCloseEnabled
        doubleTapToZoomEnabled
      />
    </SafeAreaView>
  );
};

export default AnalysisScreen;

// styles는 동일하게 유지
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
  },
  analysisHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  analysisTitle: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  dropdownButton: {
    backgroundColor: "#18314f",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  dropdownText: {
    color: "#fff",
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "70%",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 12,
  },
  modalOption: {
    padding: 12,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  modalText: {
    fontSize: 14,
    color: "#333",
  },
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
    marginTop: 6,
  },
  analysisImg: {
    width: 120,
    height: 180,
    borderRadius: 12,
    backgroundColor: "#eee",
    marginLeft: 12,
  },
  imageCard: {
    backgroundColor: "#18314f",
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    width: 220,
    alignItems: "center",
    justifyContent: "flex-start",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    minHeight: 320,
  },
  indicatorGroup: {
    marginTop: 10,
    width: "100%",
    minHeight: 100,
    justifyContent: "space-around",
  },
  indicatorPlaceholder: {
    height: 20,
    marginVertical: 4,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 4,
  },
});
