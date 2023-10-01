import { useEffect } from "react";
import { useGetRecipesQuery } from "../edamamApiSlice";
import { RecipeCard } from "./";

const RecipeSearchResult = ({ queryParams }) => {
    const { query } = queryParams;

    const {
        data: recipes,
        isLoading,
        isSuccess,
        isError
    } = useGetRecipesQuery(queryParams, { skip: !query });

    console.log(recipes)

    if (isLoading) {
        return (
            <div className="no-result-container">
                <p className="search-loading">Loading...</p>
            </div>
        );
    } else if (isError) {
        return (
            <div className="no-result-container">
                <p className="search-error">Ooops... There is an error</p>
            </div>
        );
    } else if (isSuccess) {
        return recipes?.length ? (
            <div className="result-container">
                {recipes?.map((recipe) => (
                    <RecipeCard recipe={recipe} key={recipe?.id} />
                ))}
            </div>
        ) : (
            <div className="no-result-container">
                <p className="search-notfound">Ooops... No recipe found</p>
            </div>
        );
    } else {
        return (
            <div className="no-result-container">
                <p className="search-message">Search recipes perfect for you</p>
            </div>
        );
    }
};

export default RecipeSearchResult;