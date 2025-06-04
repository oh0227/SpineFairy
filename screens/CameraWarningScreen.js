import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const CameraWarningScreen = ({ navigation }) => {
  const handleContinue = () => {
    navigation.navigate("Upload");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>사진 업로드 전 안내사항</Text>
      <Text style={styles.description}>
        - 얼굴이나 개인정보가 담긴 사진은 업로드하지 마세요.{"\n"}- 정확한
        분석을 위해 정면에서 촬영해주세요.{"\n"}- 촬영 전 배경을 단순하게
        유지해주세요.
      </Text>
      <Button title="확인하고 계속하기" onPress={handleContinue} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 30,
    lineHeight: 24,
  },
});

export default CameraWarningScreen;
