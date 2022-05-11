import React, { ChangeEvent, useState, FormEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/system";
import { CardContent, Card, TextField, Grid, Button } from "@mui/material";
import { RootState, AppDispatch } from "../../../rtk/store";
import { changeNameSurname } from "../../../rtk/currentUserSlice";

import { nameForm } from "./configuration";

import "./BoxNameChange.scss";
import { validate } from "../../../constants/validatorNew";
import BoxAlert from "../BoxAlert/BoxAlert";

const BoxNameChange = (props: any) => {
  interface User {
    firstName: string | undefined;
    lastName: number | undefined;
  }

  const { firstName, lastName, _id } = useSelector(
    (state: RootState) => state.currentUser,
  );

  const initialValues = {
    firstName: firstName,
    lastName: lastName,
  };

  const dispatch = useDispatch<AppDispatch>();

  const [values, setValue] = useState(initialValues);
  const [errors, setErrors] = useState({} as any);
  const [redirect, setRedirect] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValue({
      ...values,
      [name]: value,
    });

    const validation = checkValidationForm();

    validate(
      { [name]: value },
      validation,
      (form: any) => {
        setErrors({
          ...errors,
          ...form,
        });
      },
      initialValues,
    );
  };

  const formIsValid = (allFields: any) => {
    return Object.values(allFields).every((x) => x === false);
  };

  const onSubmit = async (event: any) => {
    try {
      dispatch(
        changeNameSurname({
          firstName: values.firstName,
          lastName: values.lastName,
          id: _id,
        }),
      );
      setRedirect(true);
    } catch (error) {
      console.log("error", error);
    }
  };

  const onClick = (event: FormEvent) => {
    event.preventDefault();
    let errorField = "";

    const validation = checkValidationForm();

    validate(
      values,
      validation,
      (form: any) => {
        setErrors({
          ...errors,
          ...form,
        });
        errorField = form;
      },
      initialValues,
    );

    const isValid = formIsValid(errorField);

    if (isValid) {
      onSubmit(values);
    }
  };

  const checkValidationForm = () => {
    let validation = {} as any;
    for (const key of Object.keys(values)) {
      validation = {
        ...validation,
        [key]: nameForm.find((e) => e.name === key),
      };
    }
    return validation;
  };

  const getStatus = (status: any) => {
    if (status) {
      props.history.push("/account");
      window.location.reload();
    }
  };

  return (
    <div className="box-name">
      <Box className="box-name-change" component="form" onSubmit={onSubmit}>
        <BoxAlert
          isOpen={redirect}
          getStatus={getStatus}
          message="Name and surname changed"
        />
        <Card className="box-name-change-card">
          <CardContent>
            <Grid container rowGap={2}>
              <Grid item xs={12}>
                {nameForm.map((element, index) => (
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
                    error={!!errors[element.name]}
                    helperText={errors[element?.name]}
                  />
                ))}
              </Grid>
              <Grid item xs={12} marginTop={1}>
                <Button
                  variant="outlined"
                  color="secondary"
                  type="submit"
                  onClick={onClick}
                  fullWidth>
                  Change name or surname
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default BoxNameChange;
