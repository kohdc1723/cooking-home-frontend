import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useGetRecipesQuery } from "../recipeApiSlice";

const RecipeResult = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [queryParams, setQueryParams] = useState(() => {
        const queryParams = new URLSearchParams(location.search);

        return {
            query: queryParams.get("query"),
            from: queryParams.get("from"),
            to: queryParams.get("to"),
            diet: queryParams.get("diet"),
            mealType: queryParams.get("mealType"),
            health: queryParams.getAll("health"),
            cuisineType: queryParams.getAll("cuisineType"),
            dishType: queryParams.getAll("dishType"),
        };
    });

    const { query } = queryParams;

    const {
        data: recipes,
        isLoading,
        isSuccess,
        isError,
    } = useGetRecipesQuery(queryParams, { skip: !query });

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);

        setQueryParams({
            query: queryParams.get("query"),
            from: queryParams.get("from"),
            to: queryParams.get("to"),
            diet: queryParams.get("diet"),
            mealType: queryParams.get("mealType"),
            health: queryParams.getAll("health"),
            cuisineType: queryParams.getAll("cuisineType"),
            dishType: queryParams.getAll("dishType"),
        });
    }, [location.search]);

    console.log(recipes);

    return (
        <div className="recipe-finder-body">
            <div className="result-container">
                <div className="scrollable-list">
                    <div>
                        result
                    </div>
                    <div>
                        {recipes?.ids?.map(id => (
                            <div>{recipes?.entities[id]?.label}</div>
                        ))}
                    </div>
                </div>
                <div className="scrollable-detail">
                    detail
                </div>
            </div>
        </div>
    );
};

export default RecipeResult;