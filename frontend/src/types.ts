export type TCurrentUser = {
  _id: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
};

export type TAuthAction = 'logging' | 'registering';
