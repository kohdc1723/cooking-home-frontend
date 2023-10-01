import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

const baseUrl = "https://api.edamam.com/search";

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

// const recipesAdapter = createEntityAdapter({
//     selectId: recipe => recipe.uri
// });

// const initialState = recipesAdapter.getInitialState();

const edamamApiSlice = createApi({
    reducerPath: "edamamApi",
    baseQuery: fetchBaseQuery({ baseUrl }),
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

                return loadedRecipes;
            }
        })
    })
});

export const { useGetRecipesQuery } = edamamApiSlice;

export default edamamApiSlice;