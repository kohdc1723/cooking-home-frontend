import { createEntityAdapter } from "@reduxjs/toolkit";
import apiSlice from "../../app/api/apiSlice";

const usersAdapter = createEntityAdapter({
    selectId: user => user.id
});

const initialState = usersAdapter.getInitialState();

const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUser: builder.query({
            query: id => ({
                url: `/users/${id}`,
                validateStatus: (response, result) => response.status === 200 && !result.isError
            }),
            transformResponse: (response) => {
                const user = { ...response?.user, id: response.user._id };

                return usersAdapter.setOne(initialState, user);
            },
            providesTags: ["User"]
        }),
        createUser: builder.mutation({
            query: userData => ({
                url: "/users",
                method: "POST",
                body: { ...userData }
            }),
            invalidatesTags: [{ type: "User" }]
        }),
        updateUser: builder.mutation({
            query: userData => ({
                url: "/users",
                method: "PATCH",
                body: { ...userData }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "User", id: arg.id }
            ]
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: "/users",
                method: "DELETE",
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "User", id: arg.id }
            ]
        })
    })
});

export const {
    useGetUserQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation
} = usersApiSlice;

export default usersApiSlice;