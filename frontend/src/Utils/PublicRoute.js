import React from "react";
import { Redirect, Route } from "react-router-dom";
import { getToken } from "../Utils/Common";

// handle the public routes
function PublicRoute({ component: Component, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        !getToken() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/dashboard" }} />
        )
      }
    />
  );
}

export default PublicRoute;
