export const nameForm = [
  {
    className: "box-name-change-card-input",
    label: "First name",
    variant: "standard",
    color: "secondary",
    type: "text",
    name: "firstName",
    autoFocus: true,
    validation: ["isValue", "isNewValue"]
  },
  {
    className: "box-name-change-card-input",
    label: "Last name",
    name: "lastName",
    variant: "standard",
    color: "secondary",
    type: "text",
    validation: ["isValue", "isNewValue"]
  },
];
