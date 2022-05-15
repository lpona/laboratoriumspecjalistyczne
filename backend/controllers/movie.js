import Movie from '../models/Movie.js';

const getAllMoviesController = async (req, res) => res.json(await Movie.find());

const updateMovieController = async (req, res) => {
  const { movieId } = req.params;
  const { isLiked, rate, review } = req.body;

  const movie = await Movie.findById(movieId);

  movie.isTouched = true;

  if (isLiked) movie.isLiked = !movie.isLiked;
  if (rate) movie.rate = rate;
  if (review)
    movie.reviews.push({
      content: review,
      author: `${req.currentUser.firstName} ${req.currentUser.lastName}`,
    });

  return res.json(await movie.save());
};

export { getAllMoviesController, updateMovieController };
