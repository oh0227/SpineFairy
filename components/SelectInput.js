import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import colors from "../constants/colors";

const SelectInput = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const options = props.options;

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setInputValue(option);
    props.onInputChanged && props.onInputChanged(props.id, option);
    setIsDropdownVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{props.label}</Text>
        <TextInput
          value={inputValue}
          onChangeText={setInputValue}
          placeholder="Select an option"
          onFocus={toggleDropdown}
        />
        {isDropdownVisible && (
          <View
            style={{
              borderWidth: 1,
              borderColor: "gray",
              padding: 10,
              flexDirection: "row",
            }}
          >
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleOptionSelect(option)}
                style={{ padding: 10 }}
              >
                <Text>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {props.errorText && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText[0]}</Text>
        </View>
      )}
    </View>
  );
};

export default SelectInput;

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
    backgroundColor: "red",
    paddingHorizontal: 20,
    paddingVertical: 10,

    backgroundColor: colors.background,
    flexDirection: "row",
    alignItems: "center",
    display: "flex",
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
