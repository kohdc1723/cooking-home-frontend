import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import edamamApiSlice from "../../app/api/edamamApiSlice";

const getQueryStringOf = (name, params) => {
    let queryString = "";

    if (!params?.length) return queryString;

    params.forEach(param => {
        queryString += `&${name}=${param}`;
    });

    return queryString;
};

const createQueryString = (query, from, to, diet, health, cuisineType, mealType, dishType) => {
    const edamamAppId = process.env.REACT_APP_EDAMAM_APP_ID;
    const edamamApiKey = process.env.REACT_APP_EDAMAM_API_KEY;
    const authString = `&app_id=${edamamAppId}&app_key=${edamamApiKey}`;

    const queryString = query?.trim() ? `q=${query.trim()}` : "";
    const fromToString = `&from=${from}&to=${to}`;
    const dietString = diet ? `&diet=${diet}` : "";
    const healthString = getQueryStringOf("health", health);
    const cuisineTypeString = getQueryStringOf("cuisineType", cuisineType);
    const mealTypeString = mealType ? `&mealType=${mealType}` : "";
    const dishTypeString = getQueryStringOf("dishType", dishType);

    const url = `?${queryString}${dietString}${healthString}${mealTypeString}${cuisineTypeString}${dishTypeString}${fromToString}${authString}`;

    return url;
};

const recipesAdapter = createEntityAdapter({
    selectId: recipe => recipe.id
});

const initialState = recipesAdapter.getInitialState({
    count: 0
});

const recipeApiSlice = edamamApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRecipes: builder.query({
            query: ({ query, from, to, diet, health, cuisineType, mealType, dishType }) => {
                const url = createQueryString(query, from, to, diet, health, cuisineType, mealType, dishType);
                const validateStatus = (response, result) => response.status === 200 && !result.isError;
                console.log(url);

                return { url, validateStatus };
            },
            transformResponse: response => {
                const loadedRecipes = response?.hits?.map(hit => {
                    const recipeId = hit.recipe.uri.split("#recipe_")[1];
                    hit.recipe.id = recipeId;

                    return hit.recipe;
                });

                const count = response?.count;

                return {
                    ...recipesAdapter.setAll(initialState, loadedRecipes),
                    count
                };
            }
        })
    })
});

export const { useGetRecipesQuery } = recipeApiSlice;

export default recipeApiSlice;