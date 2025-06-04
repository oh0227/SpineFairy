import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthScreen from "../screens/AuthSreen";
import PostAuthNavigator from "./PostAuthNavigator";
import { Image, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

const AppNavigator = (props) => {
  const isAuth = useSelector((state) => state.auth.isLogIn);
  const isSetUp = useSelector((state) => state.auth.isSetUp);

  return (
    <NavigationContainer>
      {isAuth && <PostAuthNavigator isSetUp={isSetUp} />}
      {!isAuth && <AuthScreen />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hospitalLogoContainer: {
    justifyContent: "center",
    alignItems: "center",
    maxHeight: 200,
  },
  hospitalLogo: {
    maxHeight: 200,
  },
});

export default AppNavigator;
