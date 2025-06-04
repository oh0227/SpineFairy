import { validate } from "validate.js";

export const validateLength = (id, value, minLength, maxLength, allowEmpty) => {
  const constraints = {
    presence: { allowEmpty },
  };

  if (!allowEmpty || value !== "") {
    constraints.length = {};

    if (minLength != null) {
      constraints.length.minimum = minLength;
    }

    if (maxLength != null) {
      constraints.length.maximum = maxLength;
    }
  }

  const validationResult = validate({ [id]: value }, { [id]: constraints });

  return validationResult && validationResult[id];
};

export const validateString = (id, value) => {
  const constraints = {
    presence: { allowEmpty: false },
  };

  if (value !== "" && id !== "gender") {
    constraints.format = {
      pattern: "[a-z]+",
      flags: "i",
      message: "value can only contain lettters",
    };
  }

  const validationResult = validate({ [id]: value }, { [id]: constraints });

  return validationResult && validationResult[id];
};

export const validateEmail = (id, value) => {
  const constraints = {
    presence: { allowEmpty: false },
  };

  if (value !== "") {
    constraints.email = true;
  }

  const validationResult = validate({ [id]: value }, { [id]: constraints });

  return validationResult && validationResult[id];
};

export const validateIdPassword = (id, value) => {
  const constraints = {
    presence: { allowEmpty: false },
  };

  if (value !== "") {
    constraints.length = {
      minimum: 6,
      message: "must be at least 6 characters",
    };
  }

  const validationResult = validate({ [id]: value }, { [id]: constraints });

  return validationResult && validationResult[id];
};

export const validateNumber = (id, value) => {
  const constraints = {
    numericality: {
      onlyInteger: true,
      greaterThan: 0,
      lessThanOrEqualTo: 200,
    },
  };

  const validationResult = validate({ [id]: value }, { [id]: constraints });

  return validationResult && validationResult[id];
};
