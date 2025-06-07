import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Linking,
} from "react-native";
import hospitalLogo from "../assets/images/hospital_logo.png";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import Markdown from "react-native-markdown-display";

const { width } = Dimensions.get("window");

const RecommandScreen = () => {
  const report = useSelector((state) => state.report.reportData);

  const exerciseVideos = report?.videos || [];

  const hasReportData = Boolean(report && report.metrics);

  return (
    <SafeAreaView style={styles.safeArea}>
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

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* AI 맞춤 운동 추천 */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>AI 맞춤 운동 추천</Text>
        </View>
        {exerciseVideos.length > 0 ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalList}
          >
            {exerciseVideos.map((item, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.videoCard}
                onPress={() => {
                  if (item.video_url) {
                    Linking.openURL(item.video_url).catch((err) =>
                      console.error("링크 열기 실패:", err)
                    );
                  }
                }}
              >
                <Image
                  source={{ uri: item.thumbnail_url }}
                  style={styles.videoThumbnail}
                  resizeMode="cover"
                />
                <Text style={styles.videoTitle} numberOfLines={1}>
                  {item.video_title}
                </Text>
                <Text style={styles.videoSubtitle} numberOfLines={1}>
                  {item.exercise}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <View style={styles.placeholderCard}>
            <Text style={{ color: "#666", fontSize: 13 }}>
              추천 운동 영상이 없습니다. 데이터를 등록해 주세요.
            </Text>
          </View>
        )}

        {/* 종합 분석 리포트 요약 텍스트 */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>AI 체형 분석 종합 리포트</Text>
        </View>
        {hasReportData ? (
          <View style={styles.analysisCard}>
            <Markdown style={markdownStyles}>{report.report}</Markdown>
          </View>
        ) : (
          <View style={styles.placeholderCard}>
            <Text style={{ color: "#666", fontSize: 13 }}>
              분석 리포트 데이터가 없습니다. 데이터를 등록해 주세요.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default RecommandScreen;

const markdownStyles = {
  body: {
    fontSize: 13,
    color: "#333",
    lineHeight: 20,
  },
  heading1: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#22405a",
  },
  bullet_list: {
    marginVertical: 6,
  },
  list_item: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  hospitalContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    maxHeight: 200,
  },
  hospitalLogo: {
    width: 120,
    maxHeight: 200,
  },
  scrollContent: { paddingBottom: 80 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  profileIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#eee",
  },

  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 8,
  },
  sectionTitle: { fontWeight: "bold", fontSize: 15, color: "#222" },
  seeAll: { color: "#22405a", fontSize: 13 },

  horizontalList: { marginVertical: 10, marginLeft: 16 },
  videoCard: {
    width: 160,
    backgroundColor: "#f6f8fa",
    borderRadius: 14,
    marginRight: 12,
    padding: 8,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  videoThumbnail: {
    width: "100%",
    height: 90,
    borderRadius: 10,
    backgroundColor: "#ddd",
  },
  videoTitle: { fontWeight: "bold", fontSize: 13, marginTop: 6, color: "#222" },
  videoSubtitle: { fontSize: 11, color: "#888", marginTop: 2 },

  placeholderCard: {
    backgroundColor: "#f6f8fa",
    borderRadius: 14,
    marginHorizontal: 16,
    marginTop: 12,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  analysisCard: {
    backgroundColor: "#f2f7fc",
    borderRadius: 14,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 12,
  },
  analysisText: {
    fontSize: 13,
    color: "#333",
    lineHeight: 20,
  },
});
