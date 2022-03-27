import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import {} from '@mui/system';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import backgroundVideo from '../../assets/videos/background.mp4';
import { authenticate, clearError } from '../../rtk/currentUserSlice';
import { AppDispatch, RootState } from '../../rtk/store';
import { TAuthAction } from '../../types';
import './Login.scss';

const Login = () => {
  // Global state.
  const dispatch = useDispatch<AppDispatch>();

  const { isLoading, error, _id } = useSelector(
    (state: RootState) => state.currentUser
  );

  // Local state.
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [authAction, setAuthAction] = useState<TAuthAction>('logging');

  // Router.
  const history = useHistory();

  // Refs.
  const abortControllerRef = useRef(() => {});

  // Handlers.
  const clearFormData = () => {
    dispatch(clearError());
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
  };

  const changeAuthActionOnClickHandler = () => {
    clearFormData();
    if (authAction === 'logging') setAuthAction('registering');
    if (authAction === 'registering') setAuthAction('logging');
  };

  const onSubmitHandler = async (event: FormEvent) => {
    event.preventDefault();

    const signInAsyncThunkPromise = dispatch(
      authenticate({ firstName, lastName, email, password, authAction })
    );

    abortControllerRef.current = signInAsyncThunkPromise.abort;

    const { token } = await signInAsyncThunkPromise.unwrap();

    localStorage.setItem('token', token);

    if (!!token) history.push('/dashboard');
  };

  // Effects.
  useEffect(() => () => abortControllerRef.current(), []);

  // Renders.
  if (!!_id) return <Redirect to='/dashboard' />;

  /**
   * Background video rendered
   * inside `div#root` sibling
   * due to React Portal.
   */
  const backgroundVideoElement = createPortal(
    <div className='background-box'>
      <video autoPlay loop muted>
        <source src={backgroundVideo} type='video/mp4' />
      </video>
    </div>,
    document.getElementById('background-video') as Element
  );

  // Auth action element.
  let authActionElementTextValue = '';

  if (authAction === 'logging') authActionElementTextValue = 'Register';

  if (authAction === 'registering') authActionElementTextValue = 'Login';

  const authActionElement = (
    <div
      className='login__card__auth-action'
      onClick={changeAuthActionOnClickHandler}
    >
      <span>
        <span>{authActionElementTextValue}</span>
        <ArrowForwardIosIcon className='login__card__auth-action__arrow-icon' />
      </span>
    </div>
  );

  // Cart title element.
  let cardTitleMessageElementTextValue = '';
  let cardTitleMessageElementErrorMessage = '';

  if (authAction === 'logging') {
    cardTitleMessageElementTextValue = 'Enter your email and password';
    cardTitleMessageElementErrorMessage = 'Invalid email or password';
  }

  if (authAction === 'registering') {
    cardTitleMessageElementTextValue = 'Create new user account';
    cardTitleMessageElementErrorMessage = 'Registration failed';
  }

  const cardTitleMessageElement = (
    <Typography
      marginTop='1rem'
      align='center'
      color={!!error ? 'error' : 'secondary'}
      sx={{ fontSize: 14 }}
    >
      {!!error
        ? cardTitleMessageElementErrorMessage
        : isLoading
        ? 'Loading...'
        : cardTitleMessageElementTextValue}
    </Typography>
  );

  // First name input element.
  const firstNameInputElement = (
    <TextField
      className='login__card__first-name-input'
      label='First name'
      variant='standard'
      color='secondary'
      type='text'
      value={firstName}
      onChange={(event) => setFirstName(event.target.value)}
      autoFocus
    />
  );

  // Last name input element.
  const lastNameInputElement = (
    <TextField
      className='login__card__last-name-input'
      label='Last name'
      variant='standard'
      color='secondary'
      type='text'
      value={lastName}
      onChange={(event) => setLastName(event.target.value)}
      autoFocus
    />
  );

  // Email input element.
  const emailInputElement = (
    <TextField
      className='login__card__email-input'
      label='Email'
      variant='standard'
      color='secondary'
      type='email'
      value={email}
      onChange={(event) => setEmail(event.target.value)}
      autoFocus
    />
  );

  // Password input element.
  const passwordInputElement = (
    <TextField
      className='login__card__password-input'
      label='Password'
      variant='standard'
      color='secondary'
      type='password'
      value={password}
      onChange={(event) => setPassword(event.target.value)}
    />
  );

  // Auth button element.
  let authButtonElementTextValue = '';

  if (authAction === 'logging') authButtonElementTextValue = 'Login';

  if (authAction === 'registering') authButtonElementTextValue = 'Register';

  const authButtonElement = (
    <Button
      variant='outlined'
      disabled={isLoading}
      color='secondary'
      type='submit'
      fullWidth
    >
      {isLoading ? 'Loading...' : authButtonElementTextValue}
    </Button>
  );

  return (
    <Box className='login' component='form' onSubmit={onSubmitHandler}>
      <>
        {backgroundVideoElement}
        <Card className='login__card'>
          <CardContent>
            <Grid container rowGap={2}>
              <Grid item xs={12}>
                {authActionElement}
              </Grid>
              <Grid item xs={12}>
                {cardTitleMessageElement}
              </Grid>
              {authAction === 'registering' && (
                <>
                  <Grid item xs={12}>
                    {firstNameInputElement}
                  </Grid>
                  <Grid item xs={12}>
                    {lastNameInputElement}
                  </Grid>
                </>
              )}
              <Grid item xs={12}>
                {emailInputElement}
              </Grid>
              <Grid item xs={12}>
                {passwordInputElement}
              </Grid>
              <Grid item xs={12} marginTop={1}>
                {authButtonElement}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </>
    </Box>
  );
};

export default Login;
