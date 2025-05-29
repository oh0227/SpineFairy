import React, { useState } from "react";
import { ActivityIndicator } from "react-native";
import SubmitButton from "./SubmitButton";
import Input from "./Input";

const SignUpForm = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Input id="name" label="Full Name" autoCapitalize="none" />
      <Input
        id="email"
        label="Email"
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <Input
        id="password"
        label="Password"
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
          title="회원가입"
          style={{ marginTop: 20 }}
          onPress={() => {
            console.log("회원가입 버튼 눌림!!");
          }}
        />
      )}
    </>
  );
};

export default SignUpForm;
