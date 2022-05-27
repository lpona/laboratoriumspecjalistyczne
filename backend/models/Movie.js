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
  reviews: [
    {
      author: String,
      content: String,
    },
  ],
  interactions: {
    number: {
      type: Number,
      default: 0,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
