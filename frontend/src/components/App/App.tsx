import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';
import {
  getToken,
  removeUserSession,
  setUserSession,
} from '../../utils/Common';
import PrivateRoute from '../../utils/PrivateRoute';
import PublicRoute from '../../utils/PublicRoute';
import Dashboard from '../Dashboard/Dashboard';
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
    <div className='App'>
      <BrowserRouter>
        <div>
          <div className='header'>
            <NavLink exact activeClassName='active' to='/'>
              Home
            </NavLink>
            <NavLink activeClassName='active' to='/login'>
              Login
            </NavLink>
            <small>(Access without token only)</small>
            <NavLink activeClassName='active' to='/dashboard'>
              Dashboard
            </NavLink>
            <small>(Access with token only)</small>
          </div>
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
  );
}

export default App;
