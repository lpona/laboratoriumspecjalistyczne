import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import {
  SIGN_IN_ENDPOINT_URL,
  VERIFY_TOKEN_ENDPOINT_URL,
} from '../constants/endpoints';
import { AUTH_MESSAGES } from '../constants/messages';
import { TCurrentUser } from '../types';
import { RootState } from './store';

const { SIGN_IN_ERROR } = AUTH_MESSAGES;

interface CurrentUserInterface extends TCurrentUser {
  token: string;
  isLoading: boolean;
  error: string;
}

const initialState: CurrentUserInterface = {
  _id: '',
  email: '',
  firstName: '',
  lastName: '',
  token: localStorage.getItem('token') || '',
  isLoading: false,
  error: '',
};

// Sign in
export const signIn = createAsyncThunk(
  'currentUser/signIn',
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const { data }: AxiosResponse<{ user: TCurrentUser; token: string }> =
        await axios.post(SIGN_IN_ENDPOINT_URL, {
          email,
          password,
        });

      return data;
    } catch ({ message }) {
      console.log(message);
      throw new Error();
    }
  }
);

// Verify token
export const verifyToken = createAsyncThunk<
  { user: TCurrentUser; token: string },
  void,
  { state: RootState }
>(
  'currentUser/verifyToken',
  async (_, { getState }) => {
    const token = getState().currentUser.token;

    try {
      const { data }: AxiosResponse<{ user: TCurrentUser; token: string }> =
        await axios.get(VERIFY_TOKEN_ENDPOINT_URL, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

      return data;
    } catch ({ message }) {
      console.log(message);
      throw new Error();
    }
  },
  {
    condition: (_, { getState }) => !!getState().currentUser.token,
  }
);

/**
 * FIXME:
 * Find more elegant solution.
 */
const setCurrentUserState = (
  state: any,
  action: PayloadAction<{ user: TCurrentUser; token: string }>
) => {
  state._id = action.payload.user._id;
  state.email = action.payload.user.email;
  state.firstName = action.payload.user.firstName;
  state.lastName = action.payload.user.lastName;
  state.token = action.payload.token;
};

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    clearCurrentUser: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Sign in
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false;

        setCurrentUserState(state, action);
      })
      .addCase(signIn.rejected, (state) => {
        state.isLoading = false;
        state.error = SIGN_IN_ERROR;
      })
      // Verify token
      .addCase(verifyToken.pending, (state) => {})
      .addCase(verifyToken.fulfilled, (state, action) => {
        setCurrentUserState(state, action);
      })
      .addCase(verifyToken.rejected, () => initialState);
  },
});

export const { clearCurrentUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;
