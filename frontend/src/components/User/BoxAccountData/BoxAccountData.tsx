import React from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";
import { CardContent, Card, Grid } from "@mui/material";
import { RootState } from "../../../rtk/store";

import "./BoxAccountData.scss";

const BoxAccountData = () => {
  const { firstName, lastName, email } = useSelector(
    (state: RootState) => state.currentUser,
  );

  return (
    <div className="box-account-data">
      <Box className="box-account-data-change">
        <Card className="box-account-data-change-card">
          <CardContent>
            <Grid container rowGap={2}>
              <Grid item xs={12}>
                <div className="box-account-data-list">
                  <div className="box-account-data-list-item">
                    <div>First name:</div>
                    <div className="colored-data">{firstName}</div>
                  </div>
                  <div className="box-account-data-list-item">
                    <div>Last name:</div>
                    <div className="colored-data">{lastName}</div>
                  </div>
                  <div className="box-account-data-list-item">
                    <div>Email:</div>
                    <div className="colored-data">{email}</div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default BoxAccountData;
