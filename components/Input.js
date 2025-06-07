import { View, StyleSheet, Text, TextInput } from "react-native";

import colors from "../constants/colors";
import { useState } from "react";

const Input = (props) => {
  const [value, setValue] = useState(props.initialValue);

  const onChangeText = (text) => {
    setValue(text);
    props.onInputChanged && props.onInputChanged(props.id, text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{props.label}</Text>
        <TextInput
          {...props}
          style={styles.input}
          onChangeText={onChangeText}
          value={value}
          inputMode={props.inputmode}
        />
      </View>

      {props.errorText && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText[0]}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    marginTop: 16,
    borderRadius: 8,
    borderColor: "#EDECF4",
    borderWidth: 1,
  },
  label: {
    marginVertical: 8,
    fontFamily: "regular",
    letterSpacing: 0.3,
    color: colors.primary,
    marginRight: 10,
  },
  inputContainer: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,

    backgroundColor: colors.background,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    color: colors.textColor,
    flex: 1,
    fontFamily: "regular",
    letterSpacing: 0.3,
    paddingTop: 0,
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    color: "red",
    fontSize: 13,
    fontFamily: "regular",
    letterSpacing: 0.3,
  },
});

export default Input;
