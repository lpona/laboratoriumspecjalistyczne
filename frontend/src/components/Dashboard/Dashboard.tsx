import React from 'react';
import { getUser, removeUserSession } from '../../utils/Common';
import './Dashboard.scss';

function Dashboard(props: any) {
  const user = getUser();

  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    props.history.push('/login');
  };

  return (
    <div className='dashboard'>
      Welcome {user.name}!<br />
      <br />
      <input type='button' onClick={handleLogout} value='Logout' />
    </div>
  );
}

export default Dashboard;
