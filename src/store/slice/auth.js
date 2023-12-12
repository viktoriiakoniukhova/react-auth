import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const url = process.env.URL_CLIENT;
const purl = process.env.URL_SERVER;

//Actions
export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Accept: "application/json",
        },
      };
      const { data } = await axios.post(
        `${url}/auth/register`,
        {
          name,
          email,
          password,
        },
        config
      );
      window.location.href = `${purl}/login`;
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      };
      const response = await axios.post(
        `${url}/auth/login`,
        {
          email,
          password,
        },
        config
      );
      const { data } = response;
      window.location.href = `${purl}/profile`;
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (arg, { rejectWithValue }) => {
    try {
      const config = {
        withCredentials: true,
        headers: {
          Accept: "application/json",
        },
        credentials: "include",
      };
      const { data } = await axios.post(`${url}/auth/logout`, {}, config);
      window.location.href = purl;
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const initialState = {
  loading: false,
  data: null,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [registerUser.fulfilled]: (state) => {
      state.loading = false;
      state.success = true;
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [loginUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
      state.success = true;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [loginUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [logout.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [logout.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.isAuth = false;
    },
    [logout.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default authSlice.reducer;
