import React, { useCallback, useReducer, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import SubmitButton from "./SubmitButton";
import Input from "./Input";
import SelectInput from "./SelectInput";
import { useDispatch, useSelector } from "react-redux";
import { reducer } from "../util/reducers/formReducer";
import { validateInput } from "../util/actions/formAction";
import { loadUserProfile } from "../util/actions/authActions";
import colors from "../constants/colors";
import { setUp } from "../store/authSlice";

const initialState = {
  inputValues: {
    age: "",
    gender: "",
    weight: "",
    height: "",
  },
  inputValidities: {
    age: false,
    gender: false,
    weight: false,
    height: false,
  },
  formIsValid: false,
};

const InfoForm = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [formState, dispatchFormState] = useReducer(reducer, initialState);
  const userData = useSelector((state) => state.auth.userData);

  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({
        inputId,
        inputValue,
        validationResult: result,
      });
    },
    [dispatchFormState]
  );

  const infoHandler = useCallback(async () => {
    try {
      setIsLoading(true);
      const action = loadUserProfile(userData.email, formState.inputValues);
      dispatch(action);
      dispatch(setUp());
      setError(null);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  }, [dispatch, formState]);

  return (
    <>
      <SelectInput
        id="age"
        label="연령대"
        options={[
          "10대",
          "20대",
          "30대",
          "40대",
          "50대",
          "60대",
          "70대",
          "80대",
          "90대",
        ]}
        onInputChanged={(id, value) => {
          const numericAge = parseInt(value.replace("대", ""), 10);
          inputChangedHandler(id, numericAge.toString());
        }}
        errorText={formState.inputValidities["age"]}
      />

      <SelectInput
        id="gender"
        label="성별"
        options={["남자", "여자"]}
        onInputChanged={inputChangedHandler}
        errorText={formState.inputValidities["gender"]}
      />

      <Input
        id="weight"
        label="몸무게 (kg)"
        autoCapitalize="none"
        inputmode={"numeric"}
        onInputChanged={inputChangedHandler}
        errorText={formState.inputValidities["weight"]}
      />
      <Input
        id="height"
        label="키 (cm)"
        autoCapitalize="none"
        inputmode={"numeric"}
        onInputChanged={inputChangedHandler}
        errorText={formState.inputValidities["height"]}
      />

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
          onPress={async () => {
            await infoHandler();
            props.onPress();
          }}
          disabled={!formState.formIsValid}
        />
      )}
    </>
  );
};

export default InfoForm;
