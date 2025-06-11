import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

import SubmitButton from "../components/SubmitButton";
import InfoForm from "../components/InfoForm";
import { userLogout } from "../util/actions/authActions";
import colors from "../constants/colors";

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const [formCompleted, setFormCompleted] = useState(false);

  const handleFormComplete = () => {
    setFormCompleted(true);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>사용자 정보 설정</Text>
          <InfoForm onPress={handleFormComplete} />
          {formCompleted && (
            <Text style={styles.confirmationText}>
              ✅ 정보가 성공적으로 저장되었습니다!
            </Text>
          )}
          <SubmitButton
            title="로그아웃"
            onPress={() => dispatch(userLogout())}
            style={styles.logoutButton}
            color={colors.red}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  logoutButton: {
    marginTop: 16,
  },
  confirmationText: {
    color: colors.primary,
    marginTop: 12,
    fontSize: 14,
    fontWeight: "500",
  },
});
