import Movie from '../models/Movie.js';

const getAllMoviesController = async (req, res) => res.json(await Movie.find());

const likeMovieController = async (req, res) => {
  const { movieId } = req.params;

  const movie = await Movie.findById(movieId);

  movie.isLiked = !movie.isLiked;
  movie.isTouched = true;

  return res.json(await movie.save());
};

export { getAllMoviesController, likeMovieController };
