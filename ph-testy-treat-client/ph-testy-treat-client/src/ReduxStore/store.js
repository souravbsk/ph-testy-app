import { configureStore } from "@reduxjs/toolkit";
import baseApi from "./api/baseApi";
import coinSlice from "./slices/coinSlice";
import privateRecordPath from "./slices/privateRecordPath";

const store = configureStore({
  reducer: {
    coin: coinSlice,
    recordPath: privateRecordPath,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export default store;
