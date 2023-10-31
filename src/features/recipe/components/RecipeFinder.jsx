import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdFoodBank } from "react-icons/md";
import { dietLabels, healthLabels, cuisineTypeLabels, mealTypeLabels, dishTypeLabels } from "../../../constants/labels";
import { RecipeResult, SingleSelect, MultipleSelect } from "./";
import { AuthButton } from "../../auth/components";
import useQueryString from "../../../hooks/useQueryString";
import { setParam, reset } from "../searchParamsSlice";
import { useDispatch } from "react-redux";
import "../../../styles/css/recipe-finder.css";

const RecipeFinder = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const queryRef = useRef();

    const searchParams = useQueryString();
    const [input, setInput] = useState(searchParams?.query || "");

    useEffect(() => {
        queryRef.current.focus();
    }, []);

    // event handlers
    const onClickHome = () => navigate("/");
    const onChangeInput = e => setInput(e.target.value);
    const onClickSearchButton = () => {
        if (input) {
            dispatch(setParam("query", input));
            dispatch(setParam("page", 1));
        }
    };
    const onChangeDiet = e => {
        dispatch(setParam("diet", e.target.value));
        dispatch(setParam("page", 1));
    };
    const onChangeMealType = e => {
        dispatch(setParam("mealType", e.target.value));
        dispatch(setParam("page", 1));
    };
    const onChangeHealth = e => {
        dispatch(setParam("health", e.target.value));
        dispatch(setParam("page", 1));
    }
    const onChangeCuisineType = e => {
        dispatch(setParam("cuisineType", e.target.value));
        dispatch(setParam("page", 1));
    }
    const onChangeDishType = e => {
        dispatch(setParam("dishType", e.target.value));
        dispatch(setParam("page", 1));
    }
    const onClickReset = () => dispatch(reset());

    return (
        <main className="recipe-finder">
            <header className="recipe-finder__header">
                <div className="recipe-finder__header-row">
                    <div className="recipe-finder__search-bar-container">
                        <h1 onClick={onClickHome}>
                            <MdFoodBank />
                        </h1>
                        <input
                            type="text"
                            className="recipe-finder__search-bar"
                            placeholder="egg, bacon, onion"
                            onChange={onChangeInput}
                            value={input}
                            ref={queryRef}
                        />
                        <button
                            className="recipe-finder__search-button"
                            onClick={onClickSearchButton}
                        >
                            Search
                        </button>
                    </div>
                    <AuthButton />
                </div>
                <div className="recipe-finder__header-row recipe-finder__filter-container">
                    <SingleSelect
                        label="Diet"
                        labelsArray={dietLabels}
                        value={searchParams.diet}
                        changeHandler={onChangeDiet}
                    />
                    <SingleSelect
                        label="Meal Type"
                        labelsArray={mealTypeLabels}
                        value={searchParams.mealType}
                        changeHandler={onChangeMealType}
                    />
                    <MultipleSelect
                        label="Health"
                        labelsArray={healthLabels}
                        value={searchParams.health}
                        changeHandler={onChangeHealth}
                    />
                    <MultipleSelect
                        label="Cuisine Type"
                        labelsArray={cuisineTypeLabels}
                        value={searchParams.cuisineType}
                        changeHandler={onChangeCuisineType}
                    />
                    <MultipleSelect
                        label="Dish Type"
                        labelsArray={dishTypeLabels}
                        value={searchParams.dishType}
                        changeHandler={onChangeDishType}
                    />
                    <div
                        className="recipe-finder__reset-button"
                        onClick={onClickReset}
                    >
                        Reset
                    </div>
                </div>
            </header>
            
            <RecipeResult />
        </main>
    );
};

export default RecipeFinder;