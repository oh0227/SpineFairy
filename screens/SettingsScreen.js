import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SubmitButton from "../components/SubmitButton";
import { useDispatch } from "react-redux";
import { userLogout } from "../util/actions/authActions";
import colors from "../constants/colors";

const SettingsScreen = (props) => {
  const dispatch = useDispatch();

  return (
    <SafeAreaView>
      <Text>SettingsScreen</Text>
      <SubmitButton
        title="Logout"
        onPress={() => dispatch(userLogout())}
        style={{ marginTop: 20 }}
        color={colors.red}
      />
    </SafeAreaView>
  );
};

export default SettingsScreen;
