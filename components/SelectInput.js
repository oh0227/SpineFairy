import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  Modal,
  Pressable,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../constants/colors";

const SelectInput = ({ label, options, id, onInputChanged, errorText }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });
  const dropdownRef = useRef();

  const toggleDropdown = () => {
    if (!isDropdownVisible) {
      dropdownRef.current.measureInWindow((x, y, width, height) => {
        setDropdownPosition({ x, y: y + height });
        setIsDropdownVisible(true);
      });
    } else {
      setIsDropdownVisible(false);
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsDropdownVisible(false);
    onInputChanged && onInputChanged(id, option);
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>

        <View ref={dropdownRef}>
          <TouchableOpacity onPress={toggleDropdown} style={styles.dropdown}>
            <Text style={styles.selectedText}>
              {selectedOption || "Select an option"}
            </Text>
            <AntDesign
              name={isDropdownVisible ? "up" : "down"}
              size={16}
              color="gray"
            />
          </TouchableOpacity>
        </View>

        {errorText && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{errorText[0]}</Text>
          </View>
        )}
      </View>

      <Modal transparent visible={isDropdownVisible} animationType="fade">
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={() => setIsDropdownVisible(false)}
        >
          <View
            style={[
              styles.absoluteOptionsContainer,
              {
                top: dropdownPosition.y,
                left: dropdownPosition.x,
                right: 32,
              },
            ]}
          >
            <FlatList
              data={options}
              keyExtractor={(item, index) => `${item}-${index}`}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleOptionSelect(item)}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

export default SelectInput;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 16,
  },
  label: {
    marginBottom: 8,
    fontFamily: "regular",
    color: colors.primary,
    fontSize: 14,
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#EDECF4",
    borderRadius: 8,
  },
  selectedText: {
    fontFamily: "regular",
    fontSize: 14,
    color: colors.textColor,
  },
  absoluteOptionsContainer: {
    position: "absolute",
    width: "80%",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#EDECF4",
    borderRadius: 8,
    maxHeight: 200,
    zIndex: 9999,
    elevation: 5,
    alignSelf: "center",
  },
  option: {
    padding: 12,
  },
  optionText: {
    fontSize: 14,
    color: colors.textColor,
    fontFamily: "regular",
  },
  errorContainer: {
    marginTop: 5,
  },
  errorText: {
    color: "red",
    fontSize: 13,
    fontFamily: "regular",
  },
});
