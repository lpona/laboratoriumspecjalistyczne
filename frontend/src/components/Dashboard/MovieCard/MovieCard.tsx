import FavoriteIcon from '@mui/icons-material/Favorite';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Rating,
  Typography,
} from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import { IMovie } from '../../../types';
import styles from './MovieCard.module.scss';

const MovieCard = ({
  id,
  title,
  year,
  image,
  crew,
  imDbRating,
  imDbRatingCount,
  onMovieRate,
}: IMovie) => {
  const [isTouched, setIsTouched] = useState(
    JSON.parse(localStorage.getItem('movies')!)?.find(
      (movie: any) => movie.id === id
    )?.isTouched || false
  );
  const [isLiked, setIsLiked] = useState(
    JSON.parse(localStorage.getItem('movies')!)?.find(
      (movie: any) => movie.id === id
    )?.isLiked || false
  );
  const [rate, setRate] = useState(
    JSON.parse(localStorage.getItem('movies')!)?.find(
      (movie: any) => movie.id === id
    )?.rate || 0
  );

  const saveToLocalStorage = useCallback(() => {
    let movies = JSON.parse(localStorage.getItem('movies')!);
    const movieObj = {
      id,
      rate,
      isLiked,
      isTouched,
    };
    if (!movies) {
      localStorage.setItem('movies', JSON.stringify([movieObj]));
      return;
    }
    movies = movies.filter((movie: any) => movie.id !== id);
    movies.push(movieObj);
    localStorage.setItem('movies', JSON.stringify(movies));
  }, [id, rate, isLiked, isTouched]);

  const isMounting = useRef(true);

  useEffect(() => {
    if (isMounting.current) {
      isMounting.current = false;
      return;
    }
    saveToLocalStorage();
  }, [saveToLocalStorage]);

  const onLikeClickHandler = () => {
    setIsTouched(true);
    setIsLiked((prevState: boolean) => !prevState);
    if (isTouched) return;
    onMovieRate();
  };

  const onRateChangeHandler = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: number | null
  ) => {
    setRate(newValue!);
    if (rate !== 0) return;
    onMovieRate();
  };

  return (
    <Card className={styles.card}>
      <CardHeader
        className={styles.cardHeader}
        title={title}
        subheader={year}
      />
      <CardMedia
        className={styles.cardMedia}
        component='img'
        image={image}
        alt='movie'
      />
      <CardContent className={styles.cardContent}>
        <Typography
          className={styles.cardContentTypography}
          variant='body2'
          color='text.secondary'
        >
          <b>Crew:</b> {crew}
        </Typography>
        <Typography
          className={styles.cardContentTypography}
          variant='body2'
          color='text.secondary'
        >
          <b>IMDb Rating:</b> {imDbRating} / 10
        </Typography>
        <Typography
          className={styles.cardContentTypography}
          variant='body2'
          color='text.secondary'
        >
          <b>IMDb Rating Count:</b> {imDbRatingCount}
        </Typography>
      </CardContent>
      <CardActions className={styles.cardActions}>
        <IconButton
          aria-label='add to favorites'
          onClick={onLikeClickHandler}
          color={isLiked ? 'secondary' : 'default'}
        >
          <FavoriteIcon />
        </IconButton>
        <Rating
          name='simple-controlled'
          value={rate}
          onChange={onRateChangeHandler}
        />
      </CardActions>
    </Card>
  );
};

export default MovieCard;
