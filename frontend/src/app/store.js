import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import edamamApiSlice from "../features/edamam/edamamApiSlice";

const store = configureStore({
    reducer: {
        [edamamApiSlice.reducerPath]: edamamApiSlice.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(edamamApiSlice.middleware),
    devTools: true
});

setupListeners(store.dispatch);

export default store;