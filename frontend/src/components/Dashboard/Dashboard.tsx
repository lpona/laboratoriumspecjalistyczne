import React from 'react';
import { getUser, removeUserSession } from '../../Utils/Common';
import Footer from '../Footer/Footer';
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
      <input type='button' onClick={handleLogout} value='Logout' className='buttonOut' />
      <Footer />
    </div>
  );
}

export default Dashboard;
