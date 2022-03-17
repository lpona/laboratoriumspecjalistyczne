import { ThemeProvider } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';
import {
  getToken,
  removeUserSession,
  setUserSession,
} from '../../Utils/Common';
import { darkTheme } from '../../Utils/mui';
import PrivateRoute from '../../Utils/PrivateRoute';
import PublicRoute from '../../Utils/PublicRoute';
import { Dashboard } from '../Dashboard/Dashboard';
import Header from '../Header/Header';
import Home from '../Home/Home';
import Login from '../Login/Login';
import './App.scss';

function App() {
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    axios
      .get(`http://localhost:4000/verifyToken?token=${token}`)
      .then((response) => {
        setUserSession(response.data.token, response.data.user);
        setAuthLoading(false);
      })
      .catch((error) => {
        removeUserSession();
        setAuthLoading(false);
      });
  }, []);

  if (authLoading && getToken()) {
    return <div className='content'>Checking Authentication...</div>;
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <div className='App'>
        <BrowserRouter>
          <div>
            <Header />
            <div>
              <Switch>
                <Route exact path='/' component={Home} />
                <PublicRoute path='/login' component={Login} />
                <PrivateRoute path='/dashboard' component={Dashboard} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
