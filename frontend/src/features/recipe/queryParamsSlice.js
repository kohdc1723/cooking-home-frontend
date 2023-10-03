import { createSlice } from "@reduxjs/toolkit";

const queryParamsSlice = createSlice({
    name: "queryParams",
    initialState: {
        query: "",
        to: 10,
        diet: "",
        mealType: "",
        health: [],
        cuisineType: [],
        dishType: []
    },
    reducers: {
        setQueryParams: (state, action) => {
            const { query, to, diet, mealType, health, cuisineType, dishType } = action.payload;
            
            state.query = query;
            state.to = to;
            state.diet = diet;
            state.mealType = mealType;
            state.health = health;
            state.cuisineType = cuisineType;
            state.dishType = dishType;
        },
        initQueryParams: state => {
            state.query = "";
            state.to = 10;
            state.diet = "";
            state.mealType = "";
            state.health = [];
            state.cuisineType = [];
            state.dishType = [];
        }
    }
});

export const { setQueryParams, initQueryParams } = queryParamsSlice.actions;

export const selectQueryParams = state => state.queryParams;

export default queryParamsSlice.reducer;