import { Router } from 'express';
import {
  getAllMoviesController,
  getRankingController,
  updateMovieController,
} from '../controllers/movie.js';
import { verifyTokenMiddleware } from '../middleware/auth.js';

const router = Router();

// Get all movies.
router.get('/', verifyTokenMiddleware, getAllMoviesController);

// Like movie.
router.put('/:movieId', verifyTokenMiddleware, updateMovieController);

router.get('/ranking', verifyTokenMiddleware, getRankingController);

export default router;
