import { useLocation, useNavigate, Link } from "react-router-dom";
import { Pagination, PaginationItem } from "@mui/material";
import { useGetRecipesQuery } from "../searchApiSlice";
import { RecipeCard, RecipeDetail } from "./";
import { muiStyles } from "../../../styles/muiCustomStyles";

const RecipeResult = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);

    const queryParams = {
        currentId: searchParams.get("currentId"),
        query: searchParams.get("query"),
        page: searchParams.get("page"),
        diet: searchParams.get("diet"),
        mealType: searchParams.get("mealType"),
        health: searchParams.getAll("health"),
        cuisineType: searchParams.getAll("cuisineType"),
        dishType: searchParams.getAll("dishType")
    };

    const { query } = queryParams;

    const {
        data: recipes,
        isLoading,
        isSuccess,
        isError,
    } = useGetRecipesQuery(queryParams, { skip: !query });

    if (isSuccess) {
        const { ids, entities, count } = recipes;

        if (!queryParams.currentId || !ids.includes(queryParams.currentId)) {
            searchParams.set("currentId", ids[0]);
            navigate(`?${searchParams.toString()}`);
        }

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
                                    <RecipeCard key={id} recipe={entities[id]} />
                                ))}
                                <Pagination
                                    sx={muiStyles.pagination}
                                    page={page}
                                    count={totalPage}
                                    renderItem={(item) => {
                                        const params = new URLSearchParams(location.search);
                                        params.set("page", item.page);

                                        return (
                                            <PaginationItem
                                                sx={muiStyles.paginationItem}
                                                component={Link}
                                                to={`/recipes?${params.toString()}`}
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
                        <RecipeDetail recipe={entities[queryParams.currentId]} recipeId={queryParams.currentId} />
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