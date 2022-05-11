import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useRouteMatch, Route, Switch } from "react-router-dom";

import { RootState } from "../../../rtk/store";
import useSignOut from "../../../hooks/useSignOut";

import BoxNameChange from "../BoxNameChange/BoxNameChange";
import BoxPasswordChange from "../BoxPasswordChange/BoxPasswordChange";
import BoxEmailChange from "../BoxEmailChange/BoxEmailChange";
import BoxAccountData from "../BoxAccountData/BoxAccountData";
import Footer from "../../Footer/Footer";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import PasswordIcon from "@mui/icons-material/Password";
import MailIcon from "@mui/icons-material/Mail";
import LogoutIcon from "@mui/icons-material/Logout";

import "./BoxUserAccount.scss";

const BoxUserAccount = (props: any) => {
  const { firstName } = useSelector((state: RootState) => state.currentUser);

  const { url, path } = useRouteMatch();

  const [visible, setVisible] = useState(true);

  const signOutOnClickHandler = useSignOut();

  useEffect(() => {
    if (props.match.url !== props.location.pathname) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, [props.location.pathname, props.match.url]);

  return (
    <>
      <div className="box-user-account">
        <div className="box-user-account-container">
          {!visible && (
            <div className="box-user-account-navigation">
              <NavLink to={url}>back to the user panel</NavLink>
            </div>
          )}
          {visible && (
            <div className="box-user-account-content">
              <NavLink to={`${url}/account-data`}>
                <div className="box-user-account-content-item">
                  <>
                    <AccountCircleIcon />
                    <p>your data</p>
                  </>
                </div>
              </NavLink>
              <NavLink to={`${url}/name-change`}>
                <div className="box-user-account-content-item">
                  <>
                    <DriveFileRenameOutlineIcon />
                    <p>change name or surname</p>
                  </>
                </div>
              </NavLink>
              <NavLink to={`${url}/password-change`}>
                <div className="box-user-account-content-item">
                  <>
                    <PasswordIcon />
                    <p>change password</p>
                  </>
                </div>
              </NavLink>
              <NavLink to={`${url}/email-change`}>
                <div className="box-user-account-content-item">
                  <>
                    <MailIcon />
                    <p>change email</p>
                  </>
                </div>
              </NavLink>
              <div
                className="box-user-account-content-item logout"
                onClick={() => signOutOnClickHandler()}>
                <>
                  <LogoutIcon />
                  <p>logout</p>
                </>
              </div>
            </div>
          )}
          <Switch>
            <Route path={`${path}/name-change`} component={BoxNameChange} />
            <Route
              path={`${path}/password-change`}
              component={BoxPasswordChange}
            />
            <Route path={`${path}/email-change`} component={BoxEmailChange} />
            <Route path={`${path}/account-data`} component={BoxAccountData} />
          </Switch>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BoxUserAccount;
