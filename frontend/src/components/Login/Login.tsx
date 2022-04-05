import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";

import { authenticate } from "../../rtk/currentUserSlice";
import { AppDispatch, RootState } from "../../rtk/store";
import { TAuthAction } from "../../types";

import { Box, Card, CardContent, Grid } from "@mui/material";
import {} from "@mui/system";

import ActionElement from "./ActionElement";
import LoginForm from "./LoginForm/LoginForm";
import RegisterForm from "./RegisterForm/RegisterForm";
import TitleMessageElement from "./TitleMessageElement";

import backgroundVideo from "../../assets/videos/background.mp4";
import "./Login.scss";

const Login = () => {
  // Global state.
  const dispatch = useDispatch<AppDispatch>();

  const { isLoading, error, _id } = useSelector(
    (state: RootState) => state.currentUser,
  );

  const [authAction, setAuthAction] = useState<TAuthAction>("logging");

  // Router.
  const history = useHistory();

  // Refs.
  const abortControllerRef = useRef(() => {});

  const changeAuthActionOnClickHandler = () => {
    if (authAction === "logging") setAuthAction("registering");
    if (authAction === "registering") setAuthAction("logging");
  };

  const onSubmitHandler = async (event: any) => {
    try {
      const signInAsyncThunkPromise = dispatch(
        authenticate({
          firstName: event.firstName,
          lastName: event.lastName,
          email: event.email,
          password: event.password,
          authAction,
        }),
      );
      abortControllerRef.current = signInAsyncThunkPromise.abort;

      const { token } = await signInAsyncThunkPromise.unwrap();

      localStorage.setItem("token", token);

      if (!!token) history.push("/dashboard");
    } catch (error) {
      console.log("error", error);
    }
  };

  // Effects.
  useEffect(() => () => abortControllerRef.current(), []);

  // Renders.
  if (!!_id) return <Redirect to="/dashboard" />;

  /**
   * Background video rendered
   * inside `div#root` sibling
   * due to React Portal.
   */
  const backgroundVideoElement = createPortal(
    <div className="background-box">
      <video autoPlay loop muted>
        <source src={backgroundVideo} type="video/mp4" />
      </video>
    </div>,
    document.getElementById("background-video") as Element,
  );

  return (
    <Box className="login" component="form" onSubmit={onSubmitHandler}>
      <>
        {backgroundVideoElement}
        <Card className="login__card">
          <CardContent>
            <Grid container rowGap={2}>
              <Grid item xs={12}>
                <ActionElement
                  authAction={authAction}
                  onClick={changeAuthActionOnClickHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TitleMessageElement
                  error={error}
                  isLoading={isLoading}
                  authAction={authAction}
                />
              </Grid>
              {authAction === "logging" && (
                <LoginForm isLoading={isLoading} onSubmit={onSubmitHandler} />
              )}
              {authAction === "registering" && (
                <RegisterForm
                  isLoading={isLoading}
                  onSubmit={onSubmitHandler}
                />
              )}
            </Grid>
          </CardContent>
        </Card>
      </>
    </Box>
  );
};

export default Login;
