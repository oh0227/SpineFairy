import React, { useCallback, useReducer, useState } from "react";
import { ActivityIndicator } from "react-native";
import SubmitButton from "./SubmitButton";
import { Feather } from "@expo/vector-icons";
import Input from "./Input";
import { signIn } from "../util/actions/authActions";
import { useDispatch } from "react-redux";
import { reducer } from "../util/reducers/formReducer";
import colors from "../constants/colors";
import { validateInput } from "../util/actions/formAction";
import { setUp } from "../store/authSlice";

const isTestMode = true;

const initialState = {
  inputValues: {
    email: isTestMode ? "example@example.com" : "",
    password: isTestMode ? "1234" : "",
  },
  inputValidities: {
    email: isTestMode,
    password: isTestMode,
  },
  formIsValid: isTestMode,
};

const SignInForm = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [formState, dispatchFormState] = useReducer(reducer, initialState);
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

  const authHandler = useCallback(async () => {
    try {
      setIsLoading(true);
      const action = signIn(formState.inputValues);
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
      <Input
        id="email"
        label="Email"
        icon="mail"
        iconPack={Feather}
        autoCapitalize="none"
        keyboardType="email-address"
        onInputChanged={inputChangedHandler}
        initialValue={initialState.inputValues.email}
        errorText={formState.inputValidities["email"]}
      />
      <Input
        id="password"
        label="Password"
        icon="lock"
        iconPack={Feather}
        autoCapitalize="none"
        secureTextEntry
        onInputChanged={inputChangedHandler}
        initialValue={initialState.inputValues.password}
        errorText={formState.inputValidities["password"]}
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
          onPress={authHandler}
          disabled={!formState.formIsValid}
        />
      )}
    </>
  );
};

export default SignInForm;
