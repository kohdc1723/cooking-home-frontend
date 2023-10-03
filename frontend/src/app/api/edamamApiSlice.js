import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://api.edamam.com/search";

const edamamApiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: builder => ({})
});

export default edamamApiSlice;