import React from 'react';
import { useSelector } from 'react-redux';
import MOVIES_DUMMY_DATA from '../../../src/top100movies.json';
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
      <img src={movie.image} alt={movie.title}
      /><br /><br />
      {movie.title}
    </div>

  ));

  return (
    <div className='dashboard'>
      <p>Welcome {fullName}!</p>
      <button>
        <input
          type='button'
          onClick={signOutOnClickHandler}
          value='Logout'
          className='buttonOut'
        />
        <br />
      </button>
      <div className="menu">
        <div className='category'>
          <ul>
            <li>Top 100</li>
            <li> Najwyżej oceniane</li>
            <li>Akcja</li>
            <li>Dla dzieci</li>
            <li>Dramaty</li>
            <li>Horrory</li>
            <li>Komedie</li>
            <li>Kryminalne</li>
          </ul>
        </div>
        <div className='idlist'>{moviesElementsList}</div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
