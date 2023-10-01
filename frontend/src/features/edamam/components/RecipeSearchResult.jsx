import { useGetRecipesQuery } from "../edamamApiSlice";
import { RecipeCard } from "./";

const RecipeSearchResult = ({ queryParams }) => {
    const { query } = queryParams;

    const {
        data: recipes,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetRecipesQuery(queryParams, { skip: !query });

    console.log(recipes)

    if (isLoading) {
        return (
            <div className="result-container">
                <p>Loading...</p>
            </div>
        );
    } else if (isError) {
        return (
            <div className="result-container">
                <p>{error?.error}</p>
            </div>
        );
    } else if (isSuccess) {
        return recipes?.length ? (
            <div className="result-container">
                {recipes?.map((recipe) => (
                    <RecipeCard recipe={recipe} key={recipe.id} />
                ))}
            </div>
        ) : (
            <div className="result-container">
                <p>No recipe found</p>
            </div>
        );
    } else {
        return (
            <div className="result-container">
                <p>Recipe Container</p>
            </div>
        );
    }
};

export default RecipeSearchResult;