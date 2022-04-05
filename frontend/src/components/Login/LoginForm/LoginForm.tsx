import React, { useState, ChangeEvent, FormEvent } from "react";
import { Grid, TextField, Button } from "@mui/material";
import { loginForm } from "./configuration";
import { validate } from "../../../constants/validator";

const LoginForm = (props: any) => {
  const initialValues = {
    email: "",
    password: "",
    repeatPassword: "",
  };

  const [errors, setErrors] = useState(initialValues as any);
  const [values, setValue] = useState(initialValues);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValue({
      ...values,
      [name]: value,
    });

    validate({ [name]: value }, "login", (form: any) => {
      setErrors({
        ...errors,
        ...form,
      });
    });
  };

  const onClick = (event: FormEvent) => {
    event.preventDefault();

    let errorField = "";

    validate(values, "login", (form: any) => {
      setErrors({
        ...errors,
        ...form,
      });
      errorField = form;
    });

    const isValid = formIsValid(errorField);

    if (isValid) {
      props.onSubmit(values);
    }
  };

  const formIsValid = (allFields: any) => {
    return Object.values(allFields).every((x) => x === false);
  };

  return (
    <>
      <Grid item xs={12}>
        {loginForm.map((element, index) => (
          <TextField
            key={index}
            className={element.className}
            label={element.label}
            name={element.name}
            variant={element.variant as any}
            color={element.color as any}
            type={element.type}
            onChange={onChange}
            error={!!errors[element.name]}
            helperText={errors[element?.name]}
          />
        ))}
      </Grid>
      <Grid item xs={12} marginTop={1}>
        <Button
          onClick={onClick}
          variant="outlined"
          disabled={props.isLoading}
          color="secondary"
          type="submit"
          fullWidth>
          {props.isLoading ? "Loading..." : "Login"}
        </Button>
      </Grid>
    </>
  );
};

export default LoginForm;
