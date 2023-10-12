import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import apiSlice from "../../app/api/apiSlice";

const usersAdapter = createEntityAdapter({});

const initialState = usersAdapter.getInitialState();

const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => ({
                url: "/users",
                validateStatus: (response, result) => response.status === 200 && !result.isError
            }),
            transformResponse: response => {
                const loadedUsers = response.map(user => {
                    user.id = user._id;
                    return user;
                });

                return usersAdapter.setAll(initialState, loadedUsers);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "User", id: "LIST" },
                        ...result.ids.map(id => ({ type: "User", id }))
                    ];
                } else {
                    return [{ type: "User", id: "LIST" }];
                }
            }
        }),
        createUser: builder.mutation({
            query: userData => ({
                url: "/users",
                method: "POST",
                body: { ...userData }
            }),
            invalidatesTags: [{ type: "User", id: "LIST" }]
        })
    })
});

export const {
    useGetUsersQuery,
    useCreateUserMutation
} = usersApiSlice;

export default usersApiSlice;