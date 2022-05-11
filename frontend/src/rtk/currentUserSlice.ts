import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import {
  CHANGE_EMAIL,
  CHANGE_NAME_SURNAME,
  CHANGE_PASSWORD,
  SIGN_IN_ENDPOINT_URL,
  SIGN_UP_ENDPOINT_URL,
  VERIFY_TOKEN_ENDPOINT_URL,
} from "../constants/endpoints";
import { AUTH_MESSAGES } from "../constants/messages";
import { TAuthAction, TCurrentUser } from "../types";
import { RootState } from "./store";

const { SIGN_IN_ERROR } = AUTH_MESSAGES;

interface CurrentUserInterface extends TCurrentUser {
  token: string;
  isLoading: boolean;
  error: string;
}

const initialState: CurrentUserInterface = {
  _id: "",
  email: "",
  firstName: "",
  lastName: "",
  token: localStorage.getItem("token") || "",
  isLoading: false,
  error: "",
};

// Authenticate
export const authenticate = createAsyncThunk(
  "currentUser/authenticate",
  async (payload: {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    authAction: TAuthAction;
  }) => {
    const { authAction } = payload;

    let url = "";
    let body;

    if (authAction === "logging") {
      url = SIGN_IN_ENDPOINT_URL;
      const { email, password } = payload;
      body = { email, password };
    }

    if (authAction === "registering") {
      url = SIGN_UP_ENDPOINT_URL;
      const { firstName, lastName, email, password } = payload;
      body = { firstName, lastName, email, password };
    }

    try {
      const { data }: AxiosResponse<{ user: TCurrentUser; token: string }> =
        await axios.post(url, body);

      return data;
    } catch ({ message }) {
      console.log(message);
      throw new Error();
    }
  },
);

export const changeNameSurname = createAsyncThunk(
  "currentUser/changeNameSurname",
  async (payload: { firstName?: string; lastName?: string; id?: string }) => {
    const url = CHANGE_NAME_SURNAME;
    const { firstName, lastName, id } = payload;
    const body = { firstName, lastName, id };

    try {
      const { data }: AxiosResponse<{ user: TCurrentUser; token: string }> =
        await axios.put(url, body);
      return data;
    } catch ({ message }) {
      throw new Error();
    }
  },
);

export const changePassword = createAsyncThunk(
  "currentUser/changePassword",
  async (payload: { password?: string; id?: string }) => {
    const url = CHANGE_PASSWORD;
    const { password, id } = payload;
    const body = { password, id };

    try {
      const { data }: AxiosResponse<{ user: TCurrentUser; token: string }> =
        await axios.put(url, body);
      return data;
    } catch ({ message }) {
      throw new Error();
    }
  },
);

export const changeEmail = createAsyncThunk(
  "currentUser/changeEmail",
  async (payload: { email?: string; id?: string }) => {
    const url = CHANGE_EMAIL;
    const { email, id } = payload;
    const body = { email, id };

    try {
      const { data }: AxiosResponse<{ user: TCurrentUser; token: string }> =
        await axios.put(url, body);
      return data;
    } catch ({ message }) {
      throw new Error();
    }
  },
);

// Verify token
export const verifyToken = createAsyncThunk<
  { user: TCurrentUser; token: string },
  void,
  { state: RootState }
>(
  "currentUser/verifyToken",
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
  },
);

/**
 * FIXME:
 * Find more elegant solution.
 */
const setCurrentUserState = (
  state: any,
  action: PayloadAction<{ user: TCurrentUser; token: string }>,
) => {
  state._id = action.payload.user._id;
  state.email = action.payload.user.email;
  state.firstName = action.payload.user.firstName;
  state.lastName = action.payload.user.lastName;
  state.token = action.payload.token;
};

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = "";
    },
    clearCurrentUser: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Authenticate
      .addCase(authenticate.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(authenticate.fulfilled, (state, action) => {
        state.isLoading = false;

        setCurrentUserState(state, action);
      })
      .addCase(authenticate.rejected, (state) => {
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

export const { clearError, clearCurrentUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;
