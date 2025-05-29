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

const { width } = Dimensions.get("window");

const exerciseVideos = [
  {
    thumbnail: "https://img.youtube.com/vi/VIDEO_ID1/0.jpg", // 실제 썸네일 주소로 교체
    title: "척추측만증 비법 운동",
    subtitle: "Youtube.com",
  },
  {
    thumbnail: "https://img.youtube.com/vi/VIDEO_ID2/0.jpg", // 실제 썸네일 주소로 교체
    title: "목, 허리 통증 척추측만증 때문입니다",
    subtitle: "Youtube.com",
  },
];

const RecommandScreen = () => {
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
          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalList}
        >
          {exerciseVideos.map((item, idx) => (
            <TouchableOpacity key={idx} style={styles.videoCard}>
              <Image
                source={{ uri: item.thumbnail }}
                style={styles.videoThumbnail}
                resizeMode="cover"
              />
              <Text style={styles.videoTitle} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.videoSubtitle}>{item.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* 추가 섹션 */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>여기는 뭐가 들어가야 할까요?</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.placeholderCard}>
          <View style={styles.placeholderImage} />
          <View style={styles.placeholderTextBlock}>
            <View style={styles.placeholderLine} />
            <View style={styles.placeholderLineShort} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RecommandScreen;

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
  logo: { width: 36, height: 36, borderRadius: 8, backgroundColor: "#22405a" },
  clinicName: { color: "#22405a", fontWeight: "bold", fontSize: 18 },
  clinicSub: { color: "#22405a", fontSize: 12 },
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
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f6f8fa",
    borderRadius: 14,
    marginHorizontal: 16,
    marginTop: 12,
    padding: 12,
  },
  placeholderImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: "#e0e0e0",
    marginRight: 12,
  },
  placeholderTextBlock: { flex: 1, justifyContent: "center" },
  placeholderLine: {
    height: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    marginBottom: 8,
    width: "80%",
  },
  placeholderLineShort: {
    height: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    width: "40%",
  },
});
