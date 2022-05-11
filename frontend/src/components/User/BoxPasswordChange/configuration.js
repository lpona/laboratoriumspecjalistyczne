export const passwordForm = [
  {
    className: "box-password-change-card-input",
    label: "Password",
    name: "password",
    variant: "standard",
    color: "secondary",
    type: "password",
    validation: ["isNewValue", "isPassword", "isSamePassword"]
  },
  {
    className: "box-password-change-card-input",
    label: "Repeat Password",
    name: "repeatPassword",
    variant: "standard",
    color: "secondary",
    type: "password",
    validation: ["isNewValue", "isPassword", "isSamePassword"]
  },
];
