import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PageContainer from "../components/PageContainer";
import colors from "../constants/colors";

import hospitalLogo from "../assets/images/hospital_logo.png";
import logo from "../assets/images/logo.png";
import InfoForm from "../components/InfoForm";

const UserInfoScreen = (props) => {
  const handleCompleteButton = () => {
    props.navigation.navigate("Main");
  };

  return (
    <SafeAreaView style={styles.authContainer}>
      <View style={styles.hospitalContainer}>
        <Image
          source={hospitalLogo}
          style={styles.hospitalLogo}
          resizeMode="contain"
        />
      </View>

      <PageContainer>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === "ios" ? "height" : undefined}
          keyboardVerticalOffset={100}
        >
          <View style={styles.logoContainer}>
            <Text
              style={{
                fontFamily: "main",
                fontSize: 32,
                color: colors.primary,
              }}
            >
              척추의 요정
            </Text>
            <Image source={logo} style={styles.logo} resizeMode="contain" />
          </View>

          <InfoForm onPress={handleCompleteButton} />
        </KeyboardAvoidingView>
      </PageContainer>
    </SafeAreaView>
  );
};

export default UserInfoScreen;

const styles = StyleSheet.create({
  authContainer: {
    flex: 1,
    paddingHorizontal: 32,
    backgroundColor: colors.background,
  },
  linkContainer: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 24,
  },
  link: {
    color: colors.blue,
    fontFamily: "regular",
    letterSpacing: 0.3,
  },
  hospitalContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    maxHeight: 200,
  },
  hospitalLogo: {
    width: 120,
    maxHeight: 200,
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 300,
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: "center",
  },
});
