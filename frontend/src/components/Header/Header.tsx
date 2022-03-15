import * as React from 'react';
import { NavLink } from 'react-router-dom';

import "./Header.scss"

const Header = () => {
    return (
        <div className="header">
            <div className="header-logo">
                <NavLink to='/'>
                    fake filmweb
                </NavLink>
            </div>
            <div className='header-box'>
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
        </div>
    )
}

export default Header;