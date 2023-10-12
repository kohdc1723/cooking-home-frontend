import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { dietLabels, healthLabels, cuisineTypeLabels, mealTypeLabels, dishTypeLabels } from "../../../constants/labels";
import { RecipeResult, SingleSelect, MultipleSelect } from "./";

const RecipeFinder = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const queryRef = useRef();

    const searchParams = new URLSearchParams(location.search);
    const [query, setQuery] = useState(searchParams.get("query") || "");
    const [diet, setDiet] = useState(searchParams.get("diet") || "");
    const [mealType, setMealType] = useState(searchParams.get("mealType") || "");
    const [health, setHealth] = useState(searchParams.getAll("health") || []);
    const [cuisineType, setCuisineType] = useState(searchParams.getAll("cuisineType") || []);
    const [dishType, setDishType] = useState(searchParams.getAll("dishType") || []);

    useEffect(() => {
        queryRef.current.focus();
    }, []);

    // event handlers
    const handleClickHome = () => navigate("/");

    const handleClickSearch = () => {
        // only when there is input in search bar && query input has changed from the previous query input
        if (query && (searchParams.get("query") !== query)) {
            searchParams.set("query", query);
            searchParams.set("page", 1);
            navigate(`?${searchParams.toString()}`);
        }
    }

    const handleChangeQuery = e => setQuery(e.target.value);

    const handleChangeDiet = e => {
        const newDietValue = e.target.value;
        setDiet(newDietValue);
        searchParams.set("diet", newDietValue);
        if (!newDietValue) searchParams.delete("diet");
        navigate(`?${searchParams.toString()}`);
    }

    const handleChangeMealType = e => {
        const newMealTypeValue = e.target.value;
        setMealType(newMealTypeValue);
        searchParams.set("mealType", newMealTypeValue);
        if (!newMealTypeValue) searchParams.delete("mealType");
        navigate(`?${searchParams.toString()}`);
    }

    const handleChangeHealth = e => {
        const value = e.target.value;
        const newHealthValue = typeof value === "string" ? value.split(",") : value;
        setHealth(newHealthValue);
        searchParams.delete("health");
        newHealthValue.forEach(h => searchParams.append("health", h));
        navigate(`?${searchParams.toString()}`);
    };

    const handleChangeCuisineType = e => {
        const value = e.target.value;
        const newCuisineTypeValue = typeof value === "string" ? value.split(",") : value;
        setCuisineType(newCuisineTypeValue);
        searchParams.delete("cuisineType");
        newCuisineTypeValue.forEach(ct => searchParams.append("cuisineType", ct));
        navigate(`?${searchParams.toString()}`);
    };

    const handleChangeDishType = e => {
        const value = e.target.value;
        const newDishTypeValue = typeof value === "string" ? value.split(",") : value;
        setDishType(newDishTypeValue);
        searchParams.delete("dishType");
        newDishTypeValue.forEach(dt => searchParams.append("dishType", dt));
        navigate(`?${searchParams.toString()}`);
    };

    const handleClickReset = () => {
        setDiet("");
        setMealType("");
        setHealth([]);
        setCuisineType([]);
        setDishType([]);
        searchParams.delete("diet");
        searchParams.delete("mealType");
        searchParams.delete("health");
        searchParams.delete("cuisineType");
        searchParams.delete("dishType");
        searchParams.set("page", 1);
        navigate(`?${searchParams.toString()}`);
    };

    return (
        <main className="recipe-finder">
            <header className="recipe-finder__header">
                <div className="recipe-finder__header-row">
                    <div className="recipe-finder__search-bar-container">
                        <h1 onClick={handleClickHome}>
                            COOKING<br />HOME
                        </h1>
                        <input
                            type="text"
                            className="recipe-finder__search-bar"
                            placeholder="egg, bacon, onion"
                            onChange={handleChangeQuery}
                            value={query}
                            ref={queryRef}
                        />
                        <button
                            className="recipe-finder__search-button"
                            onClick={handleClickSearch}
                        >
                            Search
                        </button>
                    </div>
                    <Link
                        className="recipe-finder__login-button"
                        to="/login"
                        state={{ from: location }}
                    >
                        Sign In
                    </Link>
                </div>
                <div className="recipe-finder__header-row recipe-finder__filter-container">
                    <SingleSelect
                        label="Diet"
                        labelsArray={dietLabels}
                        value={diet}
                        changeHandler={handleChangeDiet}
                    />
                    <SingleSelect
                        label="Meal Type"
                        labelsArray={mealTypeLabels}
                        value={mealType}
                        changeHandler={handleChangeMealType}
                    />
                    <MultipleSelect
                        label="Health"
                        labelsArray={healthLabels}
                        value={health}
                        changeHandler={handleChangeHealth}
                    />
                    <MultipleSelect
                        label="Cuisine Type"
                        labelsArray={cuisineTypeLabels}
                        value={cuisineType}
                        changeHandler={handleChangeCuisineType}
                    />
                    <MultipleSelect
                        label="Dish Type"
                        labelsArray={dishTypeLabels}
                        value={dishType}
                        changeHandler={handleChangeDishType}
                    />
                    <div
                        className="recipe-finder__reset-button"
                        onClick={handleClickReset}
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