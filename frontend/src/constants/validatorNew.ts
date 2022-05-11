const isValue = (value: any) => {
  const currentValue = value?.current;
  return /[a-zA-Z]{1,}$/.test(currentValue) ? false : "This field is required.";
};

const isPassword = (value: any) => {
  const currentValue = value?.current;
  return /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/.test(currentValue)
    ? false
    : "Password must be at least 4 characters long and one number";
};

const isEmail = (value: any) => {
  const currentValue = value?.current;
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(currentValue) ? false : "Wrong email";
};

const isSamePassword = (value: any) => {
  const { password, repeatPassword } = value;
  if (password && repeatPassword) {
    return password === repeatPassword ? false : "Password is not same";
  }
};

const isNewValue = (value: any) => {
  if (value) {
    const { current, prev } = value;
    return prev !== current ? false : "Enter new values";
  }
};

const typeOfValidate: any = (value: any) => ({
  isPassword: () => isPassword(value),
  isSamePassword: () => isSamePassword(value),
  isEmail: () => isEmail(value),
  isValue: () => isValue(value),
  isNewValue: () => isNewValue(value),
  default: () => false,
});

export const validate: any = (
  fieldValues: any,
  type: any,
  callback: Function,
  prev: any,
) => {
  let validateValues: any = [];
  let preparedValues: any = [];
  let typeValidation = "";
  let valuesObj: any = {};

  for (const [key, value] of Object.entries(fieldValues)) {
    valuesObj = value;

    if (typeof type === "object") {
      typeValidation = type[key as any]?.validation;
    }

    if (prev) {
      valuesObj = { current: value, prev: prev[key] };
    }

    preparedValues = { ...preparedValues, [key]: false };

    for (const fieldVal of typeValidation) {
      if (fieldVal === "isSamePassword") {
        valuesObj = { ...fieldValues };
      }
      validateValues = {
        ...validateValues,
        [fieldVal]:
          typeOfValidate(valuesObj)[fieldVal]?.() ??
          typeOfValidate(valuesObj)["default"](),
      };
    }

    if (validateValues) {
      for (const val of Object.values(validateValues)) {
        if (typeof val == "string") {
          preparedValues = { ...preparedValues, [key]: val };
        }
      }
    }
  }

  return callback(preparedValues);
};
