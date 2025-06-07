import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { addReport } from "../store/reportSlice";
import axios from "axios";
import BASE_URL from "../constants/base_url";

const UploadScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [photo, setPhoto] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0]);
    }
  };

  const uploadPhoto = async () => {
    if (!photo) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", {
      uri: photo.uri,
      type: "image/jpeg",
      name: "photo.jpg",
    });
    formData.append("email", userData.email);

    try {
      const res = await axios.post(`${BASE_URL}/upload-image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // 업로드 성공 시
      dispatch(addReport(res.data));

      Alert.alert("업로드 완료");
    } catch (err) {
      console.error("업로드 실패:", err);
      Alert.alert("업로드 실패", "서버 오류가 발생했습니다.");
    } finally {
      navigation.navigate("MainTabs");
      setIsUploading(false);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>갤러리 접근 권한이 없습니다.</Text>;
  }

  return (
    <View style={styles.container}>
      {!photo ? (
        <TouchableOpacity onPress={pickImage} style={styles.button}>
          <Text style={styles.buttonText}>📁 사진 선택</Text>
        </TouchableOpacity>
      ) : (
        <>
          <Image source={{ uri: photo.uri }} style={styles.preview} />
          <TouchableOpacity onPress={uploadPhoto} style={styles.button}>
            <Text style={styles.buttonText}>
              {isUploading ? "업로드 중..." : "⬆️ 업로드"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setPhoto(null)}
            style={[styles.button, { backgroundColor: "#aaa" }]}
          >
            <Text style={styles.buttonText}>↩️ 다시 선택</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default UploadScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  preview: {
    width: "90%",
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 12,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});
