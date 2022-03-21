import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import backgroundVideo from '../../assets/videos/background.mp4';
import { signIn } from '../../rtk/currentUserSlice';
import { AppDispatch, RootState } from '../../rtk/store';
import './Login.scss';

const Login = () => {
  // Global state.
  const dispatch = useDispatch<AppDispatch>();

  const { isLoading, error, _id } = useSelector(
    (state: RootState) => state.currentUser
  );

  // Local state.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Router
  const history = useHistory();

  // Refs.
  const abortControllerRef = useRef(() => {});

  // Handlers.
  const onSubmitHandler = async (event: FormEvent) => {
    event.preventDefault();

    const signInAsyncThunkPromise = dispatch(signIn({ email, password }));

    abortControllerRef.current = signInAsyncThunkPromise.abort;

    const { token } = await signInAsyncThunkPromise.unwrap();

    localStorage.setItem('token', token);

    if (!!token) history.push('/dashboard');
  };

  // Effects.
  useEffect(() => () => abortControllerRef.current(), []);

  // Renders
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

  const cardTitleMessageElement = (
    <Typography
      align='center'
      color={!!error ? 'error' : 'secondary'}
      sx={{ fontSize: 14 }}
    >
      {!!error
        ? 'Invalid email or password'
        : isLoading
        ? 'Loading...'
        : 'Enter your email and password'}
    </Typography>
  );

  const emailInputElement = (
    <TextField
      className='login__card__email-input'
      label='Email'
      variant='standard'
      helperText={!!error ? 'Invalid email' : ''}
      color='secondary'
      type='email'
      onChange={(event) => setEmail(event.target.value)}
      autoFocus
      {...email}
    />
  );

  const passwordInputElement = (
    <TextField
      className='login__card__password-input'
      label='Password'
      variant='standard'
      helperText={!!error ? 'Invalid password' : ''}
      color='secondary'
      type='password'
      onChange={(event) => setPassword(event.target.value)}
      {...password}
    />
  );

  const loginButtonElement = (
    <Button
      variant='outlined'
      disabled={isLoading}
      color='secondary'
      type='submit'
      fullWidth
    >
      {isLoading ? 'Loading...' : 'Login'}
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
                {cardTitleMessageElement}
              </Grid>
              <Grid item xs={12}>
                {emailInputElement}
              </Grid>
              <Grid item xs={12}>
                {passwordInputElement}
              </Grid>
              <Grid item xs={12} marginTop={1}>
                {loginButtonElement}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </>
    </Box>
  );
};

export default Login;
