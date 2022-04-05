import React, { ChangeEvent, FormEvent, useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { registerForm } from "./configuration";
import { validate } from "../../../constants/validator";

const RegisterForm = (props: any) => {
  const initialValues = {
    firstName: "",
    lastName: "",
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

    validate({ [name]: value }, "register", (form: any) => {
      setErrors({
        ...errors,
        ...form,
      });
    });
  };

  const onClick = (event: FormEvent) => {
    event.preventDefault();

    let errorField = "";

    validate(values, "register", (form: any) => {
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
        {registerForm.map((element, index) => (
          <TextField
            key={index}
            className={element.className}
            label={element.label}
            name={element.name}
            variant={element.variant as any}
            color={element.color as any}
            type={element.type}
            error={!!errors[element?.name]}
            onChange={onChange}
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
          {props.isLoading ? "Loading..." : "Register"}
        </Button>
      </Grid>
    </>
  );
};

export default RegisterForm;
