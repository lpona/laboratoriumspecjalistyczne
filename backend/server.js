import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { verifyTokenMiddleware } from './middleware/auth.js';
import routes from './routes/routes.js';

dotenv.config();

const app = express();

const port = process.env.PORT || 4000;

// Cors
app.use(cors());

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

app.listen(port, async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log('Server started on: ' + port);
  } catch (error) {
    console.error(error.message);
  }
});
