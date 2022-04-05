const isValue = (value: any) => {
  return /[a-zA-Z]{1,}/.test(value) ? false : "This field is required.";
};

const isPassword = (value: any) => {
  return /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)
    ? false
    : "Password must be at least 8 characters long and one number";
};

const isEmail = (value: any) => {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value) ? false : "Wrong email";
};

const isSamePassword = (pasOne: any, pasTwo: any, type: any) => {
  if (pasOne && pasTwo) {
    return pasOne === pasTwo ? false : "Password is not same";
  }

  if (type === "login") {
    return isValue(pasOne);
  }

  if (
    type === "register" &&
    isPassword(pasOne) !== false &&
    isPassword(pasTwo) !== false
  ) {
    return "Password must be at least 8 characters long and one number";
  }
};

export const validate: any = (
  fieldValues: any,
  type: any,
  callback: Function,
) => {
  let field: any = { ...fieldValues };

  field = {
    firstName: () => isValue(fieldValues.firstName),
    lastName: () => isValue(fieldValues.lastName),
    password: () =>
      isSamePassword(fieldValues.password, fieldValues.repeatPassword, type),
    repeatPassword: () =>
      isSamePassword(fieldValues.repeatPassword, fieldValues.password, type),
    email: () => isEmail(fieldValues.email),
    default: () => false,
  };

  let value: any = [];

  for (const fieldVal in fieldValues) {
    if (fieldVal) {
      value = { ...value, [fieldVal]: field[fieldVal]?.() };
    }
  }

  return callback(value);
};
