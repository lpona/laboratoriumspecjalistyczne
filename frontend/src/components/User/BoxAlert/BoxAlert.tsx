import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import "./BoxAlert.scss";

const BoxAlert = (props: any) => {
  const timeout = () => {
    setTimeout(() => {
      props.getStatus(true);
    }, 2000);
  };

  useEffect(() => {
    if (props.isOpen) {
      timeout();
    }
  }, [props.isOpen]);

  return (
    <Grid container className="box-alert">
      {props.isOpen && (
        <Grid>
          <div className="box-alert-message">{props?.message}</div>
        </Grid>
      )}
    </Grid>
  );
};

export default BoxAlert;
