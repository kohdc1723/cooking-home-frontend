import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import edamamApiSlice from "./api/edamamApiSlice";
import queryParamsReducer from "../features/recipe/queryParamsSlice";

const store = configureStore({
    reducer: {
        [edamamApiSlice.reducerPath]: edamamApiSlice.reducer,
        queryParams: queryParamsReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(edamamApiSlice.middleware),
    devTools: true
});

setupListeners(store.dispatch);

export default store;