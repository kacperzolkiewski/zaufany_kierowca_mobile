import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { baseApi } from "./api/baseApi";
import authReducer from "./features/authSlice";
import userReducer from "./features/userSlice";

const appReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  userState: userReducer,
  authState: authReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "reset") {
    baseApi.util.resetApiState();
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
