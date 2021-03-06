import { ThemeProvider } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import useSignOut from '../../hooks/useSignOut';
import { verifyToken } from '../../rtk/currentUserSlice';
import { AppDispatch } from '../../rtk/store';
import { getToken } from '../../Utils/Common';
import { darkTheme } from '../../Utils/mui';
import PrivateRoute from '../../Utils/PrivateRoute';
import PublicRoute from '../../Utils/PublicRoute';
import Dashboard from '../Dashboard/Dashboard';
import Header from '../Header/Header';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Ranking from '../Ranking/Ranking';
import BoxUserAccount from '../User/BoxUserAccount/BoxUserAccount';
import './App.scss';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  const signOut = useSignOut();

  // Verifies token if it's set.
  const verifyTokenOnAppMountHandler = useCallback(async () => {
    const {
      meta: { requestStatus },
    } = await dispatch(verifyToken());

    if (requestStatus !== 'rejected') return;

    signOut();
  }, [dispatch, signOut]);

  useEffect(() => {
    verifyTokenOnAppMountHandler();
  }, [dispatch, verifyTokenOnAppMountHandler]);

  const isAuthenticated = getToken();

  return (
    <ThemeProvider theme={darkTheme}>
      <div className='App'>
        <div>
          <Header />
          <div>
            <Switch>
              <Route exact path='/' component={Home} />
              <PublicRoute
                path='/login'
                component={Login}
                isAuthenticated={isAuthenticated}
              />
              <PrivateRoute
                path='/dashboard'
                component={Dashboard}
                isAuthenticated={isAuthenticated}
              />
              <PrivateRoute
                path='/account'
                component={BoxUserAccount}
                isAuthenticated={isAuthenticated}
              />
              <PrivateRoute
                path='/ranking'
                component={Ranking}
                isAuthenticated={isAuthenticated}
              />
            </Switch>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
