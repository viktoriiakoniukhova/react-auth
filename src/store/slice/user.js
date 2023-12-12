import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = process.env.URL_CLIENT;
const purl = process.env.URL_SERVER;

//Action
export const fetchUser = createAsyncThunk(
  "fetchUser",
  async (arg, { rejectWithValue }) => {
    try {
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      };
      const response = await axios.get(`${url}/users/profile`, config);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updateUser = createAsyncThunk(
  "updateUser",
  async ({ name }, { rejectWithValue }) => {
    try {
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      };
      const response = await axios.put(
        `${url}/users/profile-update`,
        {
          name,
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

const config = {
  withCredentials: true,
  credentials: "include",
};
export const uploadProfileImage = createAsyncThunk(
  "updateProfileImage",
  async (file, { rejectWithValue }) => {
    try {
      const formDataX = new FormData();
      formDataX.append(`file`, file);

      const response = await axios.post(
        `${url}/users/upload-image`,
        formDataX,
        config
      );
      const { data } = response;
      window.location.reload();
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

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    [fetchUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
      state.success = true;
    },
    [fetchUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.data = null;
      state.success = false;
    },
    [uploadProfileImage.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
      state.success = true;
    },
    [uploadProfileImage.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.data = null;
      state.success = false;
    },
  },
});

export default userSlice.reducer;
