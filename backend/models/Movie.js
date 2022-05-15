import mongoose from 'mongoose';

const movieSchema = mongoose.Schema({
  rank: Number,
  title: String,
  fullTitle: String,
  year: Number,
  image: String,
  crew: String,
  imDbRating: Number,
  imDbRatingCount: Number,
  isLiked: Boolean,
  isTouched: Boolean,
  rate: Number,
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
