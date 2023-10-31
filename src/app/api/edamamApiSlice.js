import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://api.edamam.com";

const edamamApiSlice = createApi({
    reducerPath: "edamamApi",
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: builder => ({})
});

export default edamamApiSlice;