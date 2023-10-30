import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Pagination } from "@mui/material";
import { useGetRecipesQuery } from "../searchApiSlice";
import { RecipeCard, RecipeDetail } from "./";
import { muiStyles } from "../../../styles/muiCustomStyles";
import { setParam } from "../searchParamsSlice";
import "../../../styles/css/recipe-result.css";

const RecipeResult = () => {
    const location = useLocation();
    const dispatch = useDispatch();

    const searchParams = new URLSearchParams(location.search);
    const currentId = searchParams.get("currentId");
    
    const {
        data: recipes,
        isLoading,
        isSuccess,
        isError
    } = useGetRecipesQuery(location.search, {
        skip: !searchParams.has("query")
    });

    useEffect(() => {
        if (isSuccess) {
            const { ids } = recipes;

            if (!currentId || !ids.includes(currentId)) {
                dispatch(setParam("currentId", ids[0]));
            }
        }
    }, [recipes]);

    const onChangePage = (event, value) => dispatch(setParam("page", value));

    const onClickLabel = (label) => dispatch(setParam("query", label));

    if (isSuccess) {
        const { ids, entities, count } = recipes;

        const totalPage = Math.ceil(count / 10);
        const page = Number(searchParams.get("page"));
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
                                    count={totalPage}
                                    page={page}
                                    onChange={onChangePage}
                                />
                            </div>
                        ) : (
                            <div className="recipe-result__not-found">
                                No recipe found
                            </div>
                        )}
                    </div>
                    <div className="recipe-result__detail-container">
                        <RecipeDetail recipe={entities[currentId]} />
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
                        <div className="recipe-result__no-card-container">
                            <h4>Search recipes by names</h4>
                            <div className="recipe-result__labels">
                                <div
                                    className="recipe-result__label recipe-result__pasta clickable-box"
                                    onClick={() => onClickLabel("pasta")}
                                >
                                    Pasta
                                </div>
                                <div
                                    className="recipe-result__label recipe-result__sandwich clickable-box"
                                    onClick={() => onClickLabel("sandwich")}
                                >
                                    Sandwich
                                </div>
                                <div
                                    className="recipe-result__label recipe-result__salad clickable-box"
                                    onClick={() => onClickLabel("salad")}
                                >
                                    Salad
                                </div>
                                <div
                                    className="recipe-result__label recipe-result__pizza clickable-box"
                                    onClick={() => onClickLabel("pizza")}
                                >
                                    Pizza
                                </div>
                                <div
                                    className="recipe-result__label recipe-result__burger clickable-box"
                                    onClick={() => onClickLabel("burger")}
                                >
                                    Burger
                                </div>
                                <div
                                    className="recipe-result__label recipe-result__stew clickable-box"
                                    onClick={() => onClickLabel("stew")}
                                >
                                    Stew
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="recipe-result__detail-container">
                        <div className="recipe-result__no-recipe">
                            <h4>Search recipes by ingredients</h4>
                            <div className="recipe-result__labels">
                                <div
                                    className="recipe-result__label recipe-result__egg clickable-box"
                                    onClick={() => onClickLabel("egg")}
                                >
                                    Egg
                                </div>
                                <div
                                    className="recipe-result__label recipe-result__beef clickable-box"
                                    onClick={() => onClickLabel("beef")}
                                >
                                    Beef
                                </div>
                                <div
                                    className="recipe-result__label recipe-result__cheese clickable-box"
                                    onClick={() => onClickLabel("cheese")}
                                >
                                    Cheese
                                </div>
                                <div
                                    className="recipe-result__label recipe-result__chicken clickable-box"
                                    onClick={() => onClickLabel("chicken")}
                                >
                                    Chicken
                                </div>
                                <div
                                    className="recipe-result__label recipe-result__potato clickable-box"
                                    onClick={() => onClickLabel("potato")}
                                >
                                    Potato
                                </div>
                                <div
                                    className="recipe-result__label recipe-result__onion clickable-box"
                                    onClick={() => onClickLabel("onion")}
                                >
                                    Onion
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default RecipeResult;