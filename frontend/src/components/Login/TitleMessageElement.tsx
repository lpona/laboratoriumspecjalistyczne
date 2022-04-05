import * as React from "react";
import { Typography } from "@mui/material";

const TitleMessageElement = (props: any) => {
  let cardTitleMessageElementTextValue = "";
  let cardTitleMessageElementErrorMessage = "";

  if (props.authAction === "logging") {
    cardTitleMessageElementTextValue = "Enter your email and password";
    cardTitleMessageElementErrorMessage = "Invalid email or password";
  }

  if (props.authAction === "registering") {
    cardTitleMessageElementTextValue = "Create new user account";
    cardTitleMessageElementErrorMessage = "Registration failed";
  }

  return (
    <Typography
      marginTop="1rem"
      align="center"
      color={!!props.error ? "error" : "secondary"}
      sx={{ fontSize: 14 }}>
      {!!props.error
        ? cardTitleMessageElementErrorMessage
        : props.isLoading
        ? "Loading..."
        : cardTitleMessageElementTextValue}
    </Typography>
  );
};

export default TitleMessageElement;
