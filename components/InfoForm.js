import React, { useCallback, useReducer, useState } from "react";
import { ActivityIndicator } from "react-native";
import SubmitButton from "./SubmitButton";
import Input from "./Input";
import { useDispatch, useSelector } from "react-redux";
import SelectInput from "./SelectInput";
import { reducer } from "../util/reducers/formReducer";
import { validateInput } from "../util/actions/formAction";
import { loadUserProfile } from "../util/actions/authActions";
import colors from "../constants/colors";

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
      const action = loadUserProfile(userData.user_id, formState.inputValues);
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
        id="age"
        label="Your Age"
        autoCapitalize="none"
        inputmode={"numeric"}
        onInputChanged={inputChangedHandler}
        errorText={formState.inputValidities["age"]}
      />
      <SelectInput
        id="gender"
        label="Your Gender"
        autoCapitalize="none"
        inputmode={"text"}
        options={["남성", "여성"]}
        onInputChanged={inputChangedHandler}
        errorText={formState.inputValidities["gender"]}
      />
      <Input
        id="weight"
        label="Your Weight"
        autoCapitalize="none"
        inputmode={"numeric"}
        onInputChanged={inputChangedHandler}
        errorText={formState.inputValidities["weight"]}
      />
      <Input
        id="height"
        label="Your Height"
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
