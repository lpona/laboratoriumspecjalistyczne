import Movie from '../models/Movie.js';

const getAllMoviesController = async (req, res) => res.json(await Movie.find());

const updateMovieController = async (req, res) => {
  const { movieId } = req.params;
  const { isLiked, rate, review } = req.body;

  const movie = await Movie.findById(movieId);

  movie.isTouched = true;
  movie.interactions.number++;
  movie.interactions.users?.push(req.currentUser._id);

  if (isLiked) movie.isLiked = !movie.isLiked;
  if (rate) movie.rate = rate;
  if (review)
    movie.reviews.push({
      content: review,
      author: `${req.currentUser.firstName} ${req.currentUser.lastName}`,
    });

  return res.json(await movie.save());
};

const getRankingController = (req, res) => {
  // const movies = await Movie.find().populate({
  //   path: 'interactions',
  //   populate: {
  //     path: 'users',
  //     model: 'User',
  //   },
  // });

  Movie.find()
    .populate({
      path: 'interactions',
      populate: {
        path: 'users',
        model: 'User',
      },
    })
    .exec(function (err, docs) {
      res.json(docs.map((doc) => doc.interactions.users));
    });
};

export { getAllMoviesController, updateMovieController, getRankingController };
