import { createSlice } from "@reduxjs/toolkit";

const getInitialStateFromQueryString = () => {
    const searchParams = new URLSearchParams(window.location.search);

    return {
        query: searchParams.get("query") || "",
        currentId: searchParams.get("currentId") || "",
        page: searchParams.get("page") || 1,
        diet: searchParams.get("diet") || "",
        mealType: searchParams.get("mealType") || "",
        health: searchParams.getAll("health") || [],
        cuisineType: searchParams.getAll("cuisineType") || [],
        dishType: searchParams.getAll("dishType") || []
    };
};

const initialState = getInitialStateFromQueryString();

const searchParamsSlice = createSlice({
    name: "searchParams",
    initialState,
    reducers: {
        setParams: (state, action) => {
            Object.assign(state, action.payload);
        },
        setParam: (state, action) => {
            const { key, value } = action.payload;
            state[key] = value;
        },
        reset: (state) => {
            //state.currentId = "";
            state.page = 1;
            state.diet = "";
            state.mealType = "";
            state.health = [];
            state.cuisineType = [];
            state.dishType = [];
        },
        init: (state) => {
            state.query = "";
            state.currentId = "";
            state.page = "";
            state.diet = "";
            state.mealType = "";
            state.health = [];
            state.cuisineType = [];
            state.dishType = [];
        }
    }
});

export const setParam = (key, value) => ({
    type: searchParamsSlice.actions.setParam.type,
    payload: { key, value }
});
export const { setParams, reset, init } = searchParamsSlice.actions;

export const selectCurrentSearchParams = state => state.searchParams;
export const selectCurrentId = state => state.searchParams.currentId;

export default searchParamsSlice.reducer;