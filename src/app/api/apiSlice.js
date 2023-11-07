import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logout } from "../../features/auth/authSlice";

const baseUrl = process.env.REACT_APP_BACKEND_SERVER_URL;

const baseQuery = fetchBaseQuery({
    baseUrl,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if (token) headers.set("Authorization", `Bearer ${token}`);

        return headers;
    }
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
    // try the original query
    let result = await baseQuery(args, api, extraOptions);

    // if failed the original query
    if (result?.error?.originalStatus === 403) {
        // send refresh token to get new access token
        const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);
        console.log(refreshResult)
        if (refreshResult?.data) {
            // if refresh success
            const user = api.getState().auth.user;
            // store the new token
            api.dispatch(setCredentials({ ...refreshResult.data, user }));
            // retry the original query with new access token
            result = await baseQuery(args, api, extraOptions);
        } else {
            // if refresh fail, logout
            api.dispatch(logout());
        }
    }

    return result;
};

const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithReAuth,
    tagTypes: ["User", "Preference"],
    endpoints: builder => ({})
});

export default apiSlice;