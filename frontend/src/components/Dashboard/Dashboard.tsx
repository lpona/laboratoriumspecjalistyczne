import React from 'react';
import { useSelector } from 'react-redux';
import MOVIES_DUMMY_DATA from '../../../src/top250movies.json';
import useSignOut from '../../hooks/useSignOut';
import { RootState } from '../../rtk/store';
import Footer from '../Footer/Footer';
import './Dashboard.scss';

const Dashboard = () => {
  const { firstName, lastName } = useSelector(
    (state: RootState) => state.currentUser
  );

  const signOutOnClickHandler = useSignOut();

  const fullName = `${firstName} ${lastName}`;

  const movies = MOVIES_DUMMY_DATA;

  const moviesElementsList = movies.map((movie) => (
    <div key={movie.id}>
      <img src={movie.image} alt={movie.title} />
    </div>
  ));

  return (
    <div className='dashboard'>
      Welcome {fullName}!<br />
      <br />
      <input
        type='button'
        onClick={signOutOnClickHandler}
        value='Logout'
        className='buttonOut'
      />
      <br />
      <div className='idlist'>{moviesElementsList}</div>
      <Footer />
    </div>
  );
};

export default Dashboard;
