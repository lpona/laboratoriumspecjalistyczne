import CloseIcon from '@mui/icons-material/Close';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MenuIcon from '@mui/icons-material/Menu';
import { Badge, Container, Grid } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import classNames from 'classnames';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import MOVIES_DUMMY_DATA from '../../../src/top100movies.json';
import useSignOut from '../../hooks/useSignOut';
import { RootState } from '../../rtk/store';
import Footer from '../Footer/Footer';
import styles from './Dashboard.module.scss';
import MovieCard from './MovieCard/MovieCard';

const Menu = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const signOutOnClickHandler = useSignOut();

  return (
    <>
      <div
        className={styles.closedMenu}
        onClick={() => setIsSidebarOpen((prevState) => !prevState)}
      >
        {!isSidebarOpen ? <MenuIcon /> : <CloseIcon />}
      </div>
      <div className={styles.menu}>
        <div
          className={classNames({
            [styles.category]: true,
            [styles.categoryVisible]: isSidebarOpen,
          })}
          onClick={() => setIsSidebarOpen(false)}
        >
          <ul>
            <li>Top 100</li>
            <li> Najwyżej oceniane</li>
            <li>Akcja</li>
            <li>Dla dzieci</li>
            <li>Dramaty</li>
            <li>Horrory</li>
            <li>Komedie</li>
          </ul>
          <input
            type='button'
            onClick={signOutOnClickHandler}
            value='Logout'
            className={styles.buttonOut}
          />
        </div>
      </div>
    </>
  );
};

const Dashboard = () => {
  const { firstName, lastName } = useSelector(
    (state: RootState) => state.currentUser
  );

  const [ratedMoviesCount, setRatedMoviesCount] = useState(
    JSON.parse(localStorage.getItem('movies')!)?.filter(
      (movie: any) => movie?.isTouched
    ).length +
      JSON.parse(localStorage.getItem('movies')!)?.filter(
        (movie: any) => movie?.rate !== 0
      ).length || 0
  );

  const onMovieRateHandler = () =>
    setRatedMoviesCount((prevState: number) => prevState + 1);

  const fullName = `${firstName} ${lastName}`;

  const movies = MOVIES_DUMMY_DATA;

  return (
    <div className={styles.dashboard}>
      <p className={styles.welcome}>Welcome {fullName}!</p>
      <Menu />
      <Container>
        <Grid
          position='sticky'
          top={0}
          style={{ height: 64, backgroundColor: '#000', zIndex: 999 }}
          container
          justifyContent='center'
          alignItems='center'
          columnGap={2}
          marginBottom={2}
        >
          <Badge
            badgeContent={Math.floor(ratedMoviesCount / 4)}
            color='secondary'
          >
            <EmojiEventsIcon className={styles.trophy} />
          </Badge>
          <LinearProgress
            className={styles.progress}
            variant='determinate'
            value={(ratedMoviesCount * 25) % 100}
            color='secondary'
          />
        </Grid>
        <Grid container spacing={2}>
          {movies.map((movie) => (
            <Grid key={movie.id} item xs={12} sm={6} md={4}>
              <MovieCard {...movie} onMovieRate={onMovieRateHandler} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};

export default Dashboard;
