import React, { ChangeEvent, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/system";
import { CardContent, Card, TextField, Grid, Button } from "@mui/material";
import { RootState, AppDispatch } from "../../../rtk/store";
import { changePassword } from "../../../rtk/currentUserSlice";

import { passwordForm } from "./configuration";

import "./BoxPasswordChange.scss";


const BoxPasswordChange = (props: any) => {
  interface User {
    password: string | undefined;
  }

  const { _id } = useSelector(
    (state: RootState) => state.currentUser,
  );

  const initialValues = {
    password: "",
    repeatPassword: ""
  };

  const dispatch = useDispatch<AppDispatch>();

  const [values, setValue] = useState(initialValues);
  const [redirect, setRedirect] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValue({
      ...values,
      [name]: value,
    });
  };

  const onSubmit = async (event: any) => {
   event.preventDefault();
    try {
      dispatch(
        changePassword({
          password: values.password,
          id: _id,
        }),
      );
      setRedirect(true)

    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (redirect) {
      props.history.push("/account");
      window.location.reload();
    }
  }, [redirect, props.history]);

  return (
    <div className="box-password">
      <Box className="box-password-change" component="form" onSubmit={onSubmit}>
        <Card className="box-password-change-card">
          <CardContent>
            <Grid container rowGap={2}>
              <Grid item xs={12}>
                {passwordForm.map((element, index) => (
                  <TextField
                    key={index}
                    className={element.className}
                    label={element.label}
                    name={element.name}
                    variant={element.variant as any}
                    color={element.color as any}
                    type={element.type}
                    onChange={onChange}
                    value={values[element.name as keyof User]}
                    //error={!!errors[element.name]}
                    //helperText={errors[element?.name]}
                  />
                ))}
              </Grid>
              <Grid item xs={12} marginTop={1}>
                <Button
                  variant="outlined"
                  color="secondary"
                  type="submit"
                  fullWidth>
                  Change password
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default BoxPasswordChange;
