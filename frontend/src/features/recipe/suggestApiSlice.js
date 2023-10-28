import { createEntityAdapter } from "@reduxjs/toolkit";
import edamamApiSlice from "../../app/api/edamamApiSlice";
import { createQueryStringNewVersion } from "../../utils/recipeApiUtils";

const suggestAdapter = createEntityAdapter({
    selectId: recipe => recipe.id
});

const initialState = suggestAdapter.getInitialState();

const suggestApiSlice = edamamApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRandomRecipes: builder.query({
            query: (query) => {
                const queryString = createQueryStringNewVersion(query);
                const validateStatus = (response, result) => response.status === 200 && !result.isError;

                return {
                    url: `/api/recipes/v2${queryString}`,
                    validateStatus
                };
            },
            transformResponse: response => {
                const loadedRecipes = response?.hits?.map(hit => {
                    const recipeId = hit.recipe.uri.split("#recipe_")[1];
                    hit.recipe.id = recipeId;

                    return hit.recipe;
                });

                return suggestAdapter.setAll(initialState, loadedRecipes);
            }
        })
    })
});

export const { useGetRandomRecipesQuery } = suggestApiSlice;

export default suggestApiSlice;