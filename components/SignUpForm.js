import React, { useCallback, useReducer, useState } from "react";
import { ActivityIndicator } from "react-native";
import SubmitButton from "./SubmitButton";
import Input from "./Input";
import { useDispatch } from "react-redux";
import { reducer } from "../util/reducers/formReducer";
import { validateInput } from "../util/actions/formAction";
import { signUp } from "../util/actions/authActions";
import colors from "../constants/colors";

const initialState = {
  inputValues: {
    fullName: "",
    email: "",
    password: "",
  },
  inputValidities: {
    fullName: false,
    email: false,
    password: false,
  },
  formIsValid: false,
};

const SignUpForm = (props) => {
  const dispatch = useDispatch();

  const [error, setError] = useState();
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
      const action = signUp(formState.inputValues);
      dispatch(action);
      setError(null);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  }, [dispatch, formState]);
  return (
    <>
      <Input
        id="name"
        label="Full Name"
        autoCapitalize="none"
        onInputChanged={inputChangedHandler}
        errorText={formState.inputValidities["fullName"]}
      />
      <Input
        id="email"
        label="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        onInputChanged={inputChangedHandler}
        errorText={formState.inputValidities["email"]}
      />
      <Input
        id="password"
        label="Password"
        autoCapitalize="none"
        secureTextEntry
        onInputChanged={inputChangedHandler}
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
          title="회원가입"
          style={{ marginTop: 20 }}
          onPress={authHandler}
          disabled={!formState.formIsValid}
        />
      )}
    </>
  );
};

export default SignUpForm;
