import {
  validateString,
  validateEmail,
  validateIdPassword,
  validateNumber,
} from "../validationContraints";

export const validateInput = (inputId, inputValue) => {
  if (inputId === "fullName" || inputId === "gender") {
    return validateString(inputId, inputValue);
  } else if (inputId === "email") {
    return validateEmail(inputId, inputValue);
  } else if (inputId === "password") {
    return validateIdPassword(inputId, inputValue);
  } else if (
    inputId === "age" ||
    inputId === "weight" ||
    inputId === "height"
  ) {
    return validateNumber(inputId, inputValue);
  }
};
