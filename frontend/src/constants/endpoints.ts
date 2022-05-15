const BASE_URL = 'http://localhost:4000/api';

export const SIGN_IN_ENDPOINT_URL = BASE_URL + '/auth/signin';

export const SIGN_UP_ENDPOINT_URL = BASE_URL + '/auth/signup';

export const VERIFY_TOKEN_ENDPOINT_URL = BASE_URL + '/auth/verify-token';

export const CHANGE_NAME_SURNAME = BASE_URL + '/auth/change-name';

export const CHANGE_PASSWORD = BASE_URL + '/auth/change-password';

export const CHANGE_EMAIL = BASE_URL + '/auth/change-email';

export const GET_ALL_MOVIES = BASE_URL + '/movies';

export const LIKE_MOVIE = (ID: string) => BASE_URL + `/movies/${ID}`;
