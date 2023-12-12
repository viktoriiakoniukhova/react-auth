import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/auth";
import userReducer from "./slice/user";

export default configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
  },
});
