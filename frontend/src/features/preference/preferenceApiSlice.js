import { createEntityAdapter } from "@reduxjs/toolkit";
import apiSlice from "../../app/api/apiSlice";

const preferenceAdapter = createEntityAdapter();

const initialState = preferenceAdapter.getInitialState();

const preferenceApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPreference: builder.query({
            query: (userId) => ({
                url: `/preference/${userId}`,
                validateStatus: (response, result) => response.status === 200 && !result.isError
            }),
            transformResponse: response => {
                response.id = response._id;

                return preferenceAdapter.setOne(initialState, response);
            },
            providesTags: (result, error, arg) => {
                if (result) {
                    return [{ type: "Preference", id: result.id }];
                } else {
                    return [];
                }
            }
        })
    })
});

export const {
    useGetPreferenceQuery
} = preferenceApiSlice;

export default preferenceApiSlice;