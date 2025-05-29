import React, { useState } from "react";
import { ActivityIndicator } from "react-native";
import SubmitButton from "./SubmitButton";
import Input from "./Input";

const InfoForm = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Input id="age" label="Your Age" autoCapitalize="none" />
      <Input id="gender" label="Your Gender" autoCapitalize="none" />
      <Input id="weight" label="Your Weight" autoCapitalize="none" />
      <Input id="height" label="Your Height" autoCapitalize="none" />

      {isLoading ? (
        <ActivityIndicator
          size={"small"}
          color={colors.primary}
          style={{ marginTop: 10 }}
        />
      ) : (
        <SubmitButton
          title="완료"
          style={{ marginTop: 20 }}
          onPress={() => {
            props.onPress();
          }}
        />
      )}
    </>
  );
};

export default InfoForm;
