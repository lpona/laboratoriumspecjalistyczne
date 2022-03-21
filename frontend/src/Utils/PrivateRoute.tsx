import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { RootState } from '../rtk/store';

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const _id = useSelector((state: RootState) => state.currentUser._id);

  return (
    <Route
      {...rest}
      render={(props) =>
        !!_id ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
