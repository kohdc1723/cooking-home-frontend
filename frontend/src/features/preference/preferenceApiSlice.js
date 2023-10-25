import { createEntityAdapter } from "@reduxjs/toolkit";
import apiSlice from "../../app/api/apiSlice";

const preferenceAdapter = createEntityAdapter({
    selectId: preference => preference.id
});

const initialState = preferenceAdapter.getInitialState();

const preferenceApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPreference: builder.query({
            query: (userId) => ({
                url: `/preference/${userId}`,
                validateStatus: (response, result) => response.status === 200 && !result.isError
            }),
            transformResponse: response => {
                const preference = { ...response?.preference, id: response?.preference?._id };

                return preferenceAdapter.setOne(initialState, preference);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "Preference", id: "LIST" },
                        ...result.ids.map(id => ({ type: "Preference", id }))
                    ];
                } else {
                    return [{ type: "Preference", id: "LIST" }];
                }
            }
        }),
        createPreference: builder.mutation({
            query: userId => ({
                url: "/preference",
                method: "POST",
                body: { userId }
            }),
            invalidatesTags: [{ type: "Preference", id: "LIST" }]
        }),
        updatePreference: builder.mutation({
            query: preferenceData => ({
                url: "/preference",
                method: "PATCH",
                body: { ...preferenceData }
            }),
            invalidatesTags: (result, error, arg) => [{ type: "Preference", id: arg.id }]
        })
    })
});

export const {
    useGetPreferenceQuery,
    useCreatePreferenceMutation,
    useUpdatePreferenceMutation
} = preferenceApiSlice;

export default preferenceApiSlice;