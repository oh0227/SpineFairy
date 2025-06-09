import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";

import colors from "../constants/colors";
import hospitalLogo from "../assets/images/hospital_logo.png";
import logo from "../assets/images/logo.png";
import InfoForm from "../components/InfoForm";

const UserInfoScreen = (props) => {
  const handleCompleteButton = () => {
    props.navigation.navigate("Main");
  };

  const renderHeader = () => (
    <>
      <View style={styles.hospitalContainer}>
        <Image
          source={hospitalLogo}
          style={styles.hospitalLogo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.logoContainer}>
        <Text style={styles.title}>척추의 요정</Text>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareFlatList
        data={[{ key: "form" }]}
        ListHeaderComponent={renderHeader}
        renderItem={() => <InfoForm onPress={handleCompleteButton} />}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      />
    </SafeAreaView>
  );
};

export default UserInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    padding: 32,
  },
  title: {
    fontFamily: "main",
    fontSize: 32,
    color: colors.primary,
  },
  hospitalContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  hospitalLogo: {
    width: 120,
    height: 80,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  logo: {
    width: 200,
    height: 200,
  },
});
