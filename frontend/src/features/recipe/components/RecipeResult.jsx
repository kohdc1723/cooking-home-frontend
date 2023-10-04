import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Pagination, PaginationItem } from "@mui/material";
import { useGetRecipesQuery } from "../recipeApiSlice";
import { RecipeCard, RecipeDetail } from "./";

const RecipeResult = () => {
    const location = useLocation();

    const [queryParams, setQueryParams] = useState(() => {
        const queryParams = new URLSearchParams(location.search);

        return {
            currentId: queryParams.get("currentId"),
            query: queryParams.get("query"),
            page: queryParams.get("page"),
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
            currentId: queryParams.get("currentId"),
            query: queryParams.get("query"),
            page: queryParams.get("page"),
            diet: queryParams.get("diet"),
            mealType: queryParams.get("mealType"),
            health: queryParams.getAll("health"),
            cuisineType: queryParams.getAll("cuisineType"),
            dishType: queryParams.getAll("dishType")
        });
    }, [location.search]);

    if (isSuccess) {
        const { ids, entities, count } = recipes;
        const totalPage = Math.ceil(count / 10);
        const page = Number(new URLSearchParams(location.search).get("page"));
        const from = (page - 1) * 10 + 1;
        const to = page * 10;

        return (
            <div className="recipe-result">
                <div className="recipe-result__container">
                    <div className="recipe-result__list-container">
                        <div className="recipe-result__count">
                            {ids?.length ? (`${count} results (${from} - ${to})`) : ""}
                        </div>
                        {ids?.length ? (
                            <div className="recipe-result__card-container">
                                {ids?.map(id => (
                                    <RecipeCard key={id} recipe={entities[id]} queryParams={queryParams} />
                                ))}
                                <Pagination
                                    sx={{
                                        padding: "20px",
                                        display: "flex",
                                        justifyContent: "center"
                                    }}
                                    page={page}
                                    count={totalPage}
                                    renderItem={(item) => {
                                        const params = new URLSearchParams(location.search);
                                        params.set("page", item.page);
                                        const newQueryString = params.toString();

                                        return (
                                            <PaginationItem
                                                sx={{
                                                    "&.MuiButtonBase-root": {
                                                        color: "white"
                                                    },
                                                    "&.MuiButtonBase-root.Mui-selected": {
                                                        background: "gray"
                                                    }
                                                }}
                                                component={Link}
                                                to={`/recipes?${newQueryString}`}
                                                {...item}
                                            />
                                        );
                                    }}
                                />
                            </div>
                        ) : (
                            <div className="recipe-result__no-card-container">
                                No recipe found
                            </div>
                        )}
                    </div>
                    <div className="recipe-result__detail-container">
                        <RecipeDetail recipe={entities[queryParams.currentId]} />
                    </div>
                </div>
            </div>
        );
    } else if (isLoading) {
        return (
            <div className="recipe-result recipe-result__loading">
                Loading...
            </div>
        );
    } else if (isError) {
        return (
            <div className="recipe-result recipe-result__error">
                Ooops... there is an error
            </div>
        );
    } else {
        return (
            <div className="recipe-result">
                <div className="recipe-result__container">
                    <div className="recipe-result__list-container">
                        <div className="recipe-result__count"></div>
                        <div className="recipe-result__no-card-container">
                            Find recipes perfect for you here!
                        </div>
                    </div>
                    <div className="recipe-result__detail-container">
                        <div className="recipe-detail__no-recipe">
                            Click a recipe to see detail
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default RecipeResult;