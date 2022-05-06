export type TCurrentUser = {
  _id: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
};

export interface IMovie {
  id: string;
  rank: string;
  title: string;
  fullTitle: string;
  year: string;
  image: string;
  crew: string;
  imDbRating: string;
  imDbRatingCount: string;
  onMovieRate: () => void;
}

export type TAuthAction = 'logging' | 'registering';
