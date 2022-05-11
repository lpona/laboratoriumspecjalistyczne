import { NavLink } from 'react-router-dom';
import './Header.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../rtk/store';
const Header = () => {
  const { _id } = useSelector((state: RootState) => state.currentUser);

  return (
    <div className='header'>
      <div className='header-logo'>
        <NavLink to='/'>fake filmweb</NavLink>
      </div>
      <div className='header-box'>
        <NavLink exact activeClassName='active' to='/'>
          Home
        </NavLink>
        {!!_id ? (
          <NavLink activeClassName='active' to='/account'>
            Account
          </NavLink>
        ) : (
          <NavLink activeClassName='active' to='/login'>
            Login
          </NavLink>
        )}

        <NavLink activeClassName='active' to='/dashboard'>
          Dashboard
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
