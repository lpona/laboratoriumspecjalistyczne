import * as React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const ActionElement = (props: any) => {
  const { authAction } = props;

  let authActionElementTextValue = "";

  if (authAction === "logging") authActionElementTextValue = "Register";
  if (authAction === "registering") authActionElementTextValue = "Login";

  return (
    <div className="login__card__auth-action" onClick={props.onClick}>
      <span>
        <span>{authActionElementTextValue}</span>
        <ArrowForwardIosIcon className="login__card__auth-action__arrow-icon" />
      </span>
    </div>
  );
};

export default ActionElement;
