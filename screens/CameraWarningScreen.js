import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import colors from "../constants/colors";
import warning1 from "../assets/images/warning1.png";
import warning2 from "../assets/images/warning2.png";
import warning3 from "../assets/images/warning3.png";

const { width } = Dimensions.get("window");

const CameraWarningScreen = ({ navigation }) => {
  const handleContinue = () => {
    navigation.navigate("Upload");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>사진 업로드 전 안내사항</Text>

      <View style={styles.card}>
        <Text style={styles.tipTitle}>① 카메라를 기울이지 마세요</Text>
        <Text style={styles.tipDescription}>
          사진이 수평이 맞지 않으면 정확한 분석이 어려워요.{"\n"}
          📷 핸드폰을 평평하게 들고 정면을 향해 촬영해 주세요.
        </Text>
        <Image source={warning1} style={styles.tipImage} resizeMode="cover" />
      </View>

      <View style={styles.card}>
        <Text style={styles.tipTitle}>② 동일한 자세로 찍어주세요</Text>
        <Text style={styles.tipDescription}>
          촬영 시 자세가 바뀌면 분석에 오차가 생길 수 있어요.{"\n"}
          📌 가능한 한 팔, 다리, 몸의 위치를 고정해 주세요.
        </Text>
        <Image source={warning2} style={styles.tipImage} resizeMode="cover" />
      </View>

      <View style={styles.card}>
        <Text style={styles.tipTitle}>③ 배경을 단순하게 유지해주세요</Text>
        <Text style={styles.tipDescription}>
          배경에 물건이 많거나 복잡하면 AI가 혼동할 수 있어요.{"\n"}✨ 흰 벽이나
          단색 커튼 앞에서 촬영해 주세요.
        </Text>
        <Image source={warning3} style={styles.tipImage} resizeMode="cover" />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>확인하고 계속하기</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CameraWarningScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 60,
    backgroundColor: colors.primary,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.background,
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#f2f7fc",
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  tipTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#22405a",
    marginBottom: 8,
  },
  tipDescription: {
    fontSize: 13,
    color: "#333",
    lineHeight: 20,
    marginBottom: 12,
  },
  tipImage: {
    width: "100%",
    height: width * 0.5,
    borderRadius: 10,
    backgroundColor: "#ddd", // 로딩 중 백업용
  },
  button: {
    backgroundColor: colors.primaryLight,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});
