import React, { useState } from "react";
import { ActivityIndicator } from "react-native";
import SubmitButton from "./SubmitButton";
import { Feather } from "@expo/vector-icons";
import Input from "./Input";
import { signIn } from "../util/actions/authActions";
import { useDispatch } from "react-redux";
import { authenticate } from "../store/authSlice";

const SignInForm = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    const mockUserData = {
      token: "email",
      userData: "password",
    };

    dispatch(authenticate(mockUserData));
    console.log("로그인 버튼 눌림!!");
  };

  return (
    <>
      <Input
        id="email"
        label="Email"
        icon="mail"
        iconPack={Feather}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <Input
        id="password"
        label="Password"
        icon="lock"
        iconPack={Feather}
        autoCapitalize="none"
        secureTextEntry
      />
      {isLoading ? (
        <ActivityIndicator
          size={"small"}
          color={colors.primary}
          style={{ marginTop: 10 }}
        />
      ) : (
        <SubmitButton
          title="로그인"
          style={{ marginTop: 20 }}
          onPress={handleLogin}
        />
      )}
    </>
  );
};

export default SignInForm;
