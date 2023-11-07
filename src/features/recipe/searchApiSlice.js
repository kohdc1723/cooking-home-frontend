import { createEntityAdapter } from "@reduxjs/toolkit";
import edamamApiSlice from "../../app/api/edamamApiSlice";
import { createQueryStringOldVersion } from "../../utils/recipeApiUtils";
import { setParam } from "./searchParamsSlice";

const searchAdapter = createEntityAdapter({
    selectId: recipe => recipe.id
});

const initialState = searchAdapter.getInitialState({ count: 0 });

const searchApiSlice = edamamApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRecipes: builder.query({
            query: (searchParamsString) => {
                const queryString = createQueryStringOldVersion(searchParamsString);
                const validateStatus = (response, result) => response.status === 200 && !result.isError;

                return {
                    url: `/search?${queryString}`,
                    validateStatus
                };
            },
            transformResponse: response => {
                const loadedRecipes = response?.hits?.map(hit => {
                    const recipeId = hit.recipe.uri.split("#recipe_")[1];
                    hit.recipe.id = recipeId;

                    return hit.recipe;
                });

                const count = Math.min(response?.count, 100);

                return {
                    ...searchAdapter.setAll(initialState, loadedRecipes),
                    count
                };
            }
        })
    })
});

export const { useGetRecipesQuery } = searchApiSlice;

export default searchApiSlice;