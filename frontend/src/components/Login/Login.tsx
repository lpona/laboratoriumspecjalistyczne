import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import backgroundVideo from '../../assets/videos/background.mp4';
import { setUserSession } from '../../Utils/Common';
import './Login.scss';

function Login(props: any) {
  const [loading, setLoading] = useState(false);
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState('');

  // handle button click of login form
  const handleLogin = () => {
    setError('');
    setLoading(true);
    axios
      .post('http://localhost:4000/users/signin', {
        username: username.value,
        password: password.value,
      })
      .then((response) => {
        setLoading(false);
        setUserSession(response.data.token, response.data.user);
        props.history.push('/dashboard');
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 401)
          setError(error.response.data.message);
        else setError('Something went wrong. Please try again later.');
      });
  };

  /**
   * Background video rendered
   * inside `div#root` sibling
   * due to React Portal.
   */
  //

  const backgroundVideoElement = createPortal(
    <div className="background-box">
      <video autoPlay loop muted>
        <source src={backgroundVideo} type='video/mp4' />
      </video>
    </div>,
    document.getElementById('background-video') as Element
  );

  return (
    <Box className='login'>
      <>
        {backgroundVideoElement}
        <Card className='login__card'>
          <CardContent>
            <Grid container rowGap={2}>
              <Grid item xs={12}>
                <Typography
                  align='center'
                  color='secondary'
                  sx={{ fontSize: 14 }}
                >
                  Enter your username and password
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className='login__card__username-input'
                  label='Username'
                  variant='standard'
                  error={!!error}
                  helperText={error ? 'Invalid username' : ''}
                  color='secondary'
                  autoFocus
                  {...username}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className='login__card__password-input'
                  label='Password'
                  variant='standard'
                  error={!!error}
                  helperText={error ? 'Invalid password' : ''}
                  color='secondary'
                  type='password'
                  {...password}
                />
              </Grid>
              <Grid item xs={12} marginTop={1}>
                <Button
                  variant='outlined'
                  disabled={loading}
                  onClick={handleLogin}
                  color='secondary'
                  fullWidth
                >
                  {loading ? 'Loading...' : 'Login'}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </>
    </Box>
  );
}

const useFormInput: any = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);

  const handleChange: any = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange,
  };
};

export default Login;
