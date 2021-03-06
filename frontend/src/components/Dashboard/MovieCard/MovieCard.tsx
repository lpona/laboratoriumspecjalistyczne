import FavoriteIcon from '@mui/icons-material/Favorite';
import RateReviewIcon from '@mui/icons-material/RateReview';
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Fade,
  Grid,
  IconButton,
  Modal,
  Rating,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useUpdateMovieMutation } from '../../../rtk/api';
import { RootState } from '../../../rtk/store';
import { IMovie } from '../../../types';
import styles from './MovieCard.module.scss';

const MovieCard = ({
  _id,
  title,
  year,
  image,
  crew,
  imDbRating,
  imDbRatingCount,
  isLiked,
  rate,
  reviews,
}: IMovie) => {
  // const [isTouched, setIsTouched] = useState(
  //   JSON.parse(localStorage.getItem('movies')!)?.find(
  //     (movie: any) => movie.id === id
  //   )?.isTouched || false
  // );
  // const [rate, setRate] = useState(
  //   JSON.parse(localStorage.getItem('movies')!)?.find(
  //     (movie: any) => movie.id === id
  //   )?.rate || 0
  // );

  // const saveToLocalStorage = useCallback(() => {
  //   let movies = JSON.parse(localStorage.getItem('movies')!);
  //   const movieObj = {
  //     id,
  //     rate,
  //     isLiked,
  //     isTouched,
  //   };
  //   if (!movies) {
  //     localStorage.setItem('movies', JSON.stringify([movieObj]));
  //     return;
  //   }
  //   movies = movies.filter((movie: any) => movie.id !== id);
  //   movies.push(movieObj);
  //   localStorage.setItem('movies', JSON.stringify(movies));
  // }, [id, rate, isLiked, isTouched]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const [reviews, setReviews] = useState<string[]>([]);

  // const isMounting = useRef(true);

  // useEffect(() => {
  //   if (isMounting.current) {
  //     isMounting.current = false;
  //     return;
  //   }
  //   saveToLocalStorage();
  // }, [saveToLocalStorage]);

  const [updateMovie] = useUpdateMovieMutation();

  const onLikeClickHandler = () => {
    // setIsTouched(true);
    // setIsLiked((prevState: boolean) => !prevState);
    // if (isTouched) return;
    // onMovieRate();
    updateMovie({ _id, isLiked: true });
  };

  const onRateChangeHandler = (
    event: React.SyntheticEvent<Element, Event>,
    rate: number | null
  ) => {
    // setRate(newValue!);
    // if (rate !== 0) return;
    // onMovieRate();
    updateMovie({ _id, rate });
  };

  const onAddReviewFormSubmitHandler = (event: any) => {
    event.preventDefault();
    updateMovie({ _id, review: event.target.elements.review.value });
  };

  return (
    <>
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
          <Box
            sx={{
              display: 'flex',
              gap: 1,
            }}
          >
            <IconButton
              aria-label='add to favorites'
              onClick={onLikeClickHandler}
              color={isLiked ? 'secondary' : 'default'}
            >
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label='add to favorites' onClick={handleOpen}>
              <RateReviewIcon />
            </IconButton>
          </Box>
          <Rating
            name='simple-controlled'
            value={rate}
            onChange={onRateChangeHandler}
          />
        </CardActions>
      </Card>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          sx: {
            backgroundColor: 'rgb(42 42 42 / 50%);',
            opacity: 0.5,
          },
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90%',
              maxWidth: 800,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
              color: 'text.primary',
            }}
          >
            <Box
              component='form'
              noValidate
              onSubmit={onAddReviewFormSubmitHandler}
            >
              <TextField
                id='review'
                label='Write review'
                multiline
                rows={4}
                fullWidth
                color='secondary'
              />
              <Button
                type='submit'
                variant='outlined'
                color='secondary'
                sx={{
                  mt: 3,
                }}
              >
                Add review
              </Button>
            </Box>
            {reviews?.map((review: any, index: number) => (
              <Grid
                container
                key={index}
                rowSpacing={3}
                sx={{
                  mb: 3,
                  '&:first-of-type': {
                    mt: 0,
                  },
                  '&:last-of-type': {
                    mb: 0,
                  },
                }}
              >
                <Grid item xs={12} md={1}>
                  <Avatar>
                    {review.author
                      .split(' ')
                      .map((name: any) => name[0])
                      .join('')}
                  </Avatar>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={11}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Typography>{review.content}</Typography>
                </Grid>
              </Grid>
            ))}
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default MovieCard;
