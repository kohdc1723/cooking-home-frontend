import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { OutlinedInput, InputLabel, MenuItem, FormControl, ListItemText, Select, Checkbox } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { muiStyles, MenuProps, getStyles } from "../../../styles/muiCustomStyles";
import { dietLabels, healthLabels, cuisineTypeLabels, mealTypeLabels, dishTypeLabels } from "../../../constants/labels";
import { RecipeResult } from "./";

// create query params
const createQueryParams = (currentId, query, page, diet, mealType, health, cuisineType, dishType) => {
    const queryParams = new URLSearchParams();
    
    currentId && queryParams.append("currentId", currentId);
    query && queryParams.append("query", query);
    diet && queryParams.append("diet", diet);
    mealType && queryParams.append("mealType", mealType);
    health?.length && health.map(h => queryParams.append("health", h));
    cuisineType?.length && cuisineType.map(ct => queryParams.append("cuisineType", ct));
    dishType?.length && dishType.map(dt => queryParams.append("dishType", dt));

    if (query) {
        queryParams.append("page", page);
    }

    return queryParams;
};

const RecipeFinder = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();

    const queryParams = new URLSearchParams(location.search);
    const [currentId, setCurrentId] = useState(queryParams.get("currentId") || "");
    const [query, setQuery] = useState(queryParams.get("query") || "");
    const [page, setPage] = useState(Number(queryParams.get("page")) || 1);
    const [diet, setDiet] = useState(queryParams.get("diet") || "");
    const [mealType, setMealType] = useState(queryParams.get("mealType") || "");
    const [health, setHealth] = useState(queryParams.getAll("health") || []);
    const [cuisineType, setCuisineType] = useState(queryParams.getAll("cuisineType") || []);
    const [dishType, setDishType] = useState(queryParams.getAll("dishType") || []);

    useEffect(() => {
        queryParams.set("currentId", currentId);
        queryParams.set("page", page);
        queryParams.set("diet", diet);
        queryParams.set("mealType", mealType);

        queryParams.delete("health");
        health.forEach(h => queryParams.append("health", h));
        
        queryParams.delete("cuisineType");
        cuisineType.forEach(ct => queryParams.append("cuisineType", ct));
        
        queryParams.delete("dishType");
        dishType.forEach(dt => queryParams.append("dishType", dt));

        const params = createQueryParams(currentId, query, page, diet, mealType, health, cuisineType, dishType);
        navigate(`?${params.toString()}`);
    }, [diet, mealType, health, cuisineType, dishType]);

    const handleClickSearch = () => {
        // only when there is input in search bar && query input has changed from the previous query input
        if (query && (queryParams.get("query") !== query)) {
            const params = createQueryParams(null, query, page, diet, mealType, health, cuisineType, dishType);
            navigate(`?${params.toString()}`);
        }
    }

    const handleChangeQuery = e => setQuery(e.target.value);
    const handleChangeDiet = e => setDiet(e.target.value);
    const handleChangeMealType = e => setMealType(e.target.value);
    const handleChangeHealth = e => {
        const value = e.target.value;
        setHealth(typeof value === "string" ? value.split(",") : value);
    };
    const handleChangeCuisineType = e => {
        const value = e.target.value;
        setCuisineType(typeof value === "string" ? value.split(",") : value);
    };
    const handleChangeDishType = e => {
        const value = e.target.value;
        setDishType(typeof value === "string" ? value.split(",") : value);
    };

    const dietSelect = (
        <FormControl sx={muiStyles.formControl}>
            <InputLabel id="diet-label" sx={muiStyles.inputLabel}>
                Diet
            </InputLabel>
            <Select
                sx={muiStyles.select}
                labelId="diet-label"
                id="diet-single-select"
                value={diet}
                label="Diet"
                onChange={handleChangeDiet}
            >
                <MenuItem value="">NONE</MenuItem>
                {dietLabels.map((dietLabel) => (
                    <MenuItem key={dietLabel} value={dietLabel}>
                        {dietLabel}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );

    const mealTypeSelect = (
        <FormControl sx={muiStyles.formControl}>
            <InputLabel id="meal-type-label" sx={muiStyles.inputLabel}>
                Meal Type
            </InputLabel>
            <Select
                sx={muiStyles.select}
                labelId="meal-type-label"
                id="meal-type-single-select"
                value={mealType}
                label="Meal Type"
                onChange={handleChangeMealType}
            >
                <MenuItem value="">NONE</MenuItem>
                {mealTypeLabels.map((mealTypeLabel) => (
                    <MenuItem key={mealTypeLabel} value={mealTypeLabel}>
                        {mealTypeLabel}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );

    const healthMultipleSelect = (
        <FormControl sx={muiStyles.formControl}>
            <InputLabel id="health-label" sx={muiStyles.inputLabel}>
                Health
            </InputLabel>
            <Select
                sx={muiStyles.select}
                labelId="health-label"
                id="health-multiple-select"
                multiple
                value={health}
                input={<OutlinedInput label="Health" />}
                renderValue={selected => selected.join(", ")}
                MenuProps={MenuProps}
                onChange={handleChangeHealth}
            >
                {healthLabels.map((healthLabel) => (
                    <MenuItem
                        key={healthLabel}
                        value={healthLabel}
                        style={getStyles(healthLabel, health, theme)}
                    >
                        <Checkbox checked={health.indexOf(healthLabel) > -1} />
                        <ListItemText primary={healthLabel} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );

    const cuisineTypeMultipleSelect = (
        <FormControl sx={muiStyles.formControl}>
            <InputLabel id="cuisine-type-label" sx={muiStyles.inputLabel}>
                Cuisine Type
            </InputLabel>
            <Select
                sx={muiStyles.select}
                labelId="cuisine-type-label"
                id="cuisine-type-multiple-select"
                multiple
                value={cuisineType}
                input={<OutlinedInput label="Cuisine Type" />}
                renderValue={selected => selected.join(", ")}
                MenuProps={MenuProps}
                onChange={handleChangeCuisineType}
            >
                {cuisineTypeLabels.map((cuisineTypeLabel) => (
                    <MenuItem
                        key={cuisineTypeLabel}
                        value={cuisineTypeLabel}
                        style={getStyles(cuisineTypeLabel, cuisineType, theme)}
                    >
                        <Checkbox checked={cuisineType.indexOf(cuisineTypeLabel) > -1} />
                        <ListItemText primary={cuisineTypeLabel} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );

    const dishTypeMultipleSelect = (
        <FormControl sx={muiStyles.formControl}>
            <InputLabel id="dish-type-label" sx={muiStyles.inputLabel}>
                Dish Type
            </InputLabel>
            <Select
                sx={muiStyles.select}
                labelId="dish-type-label"
                id="dish-type-multiple-select"
                multiple
                value={dishType}
                input={<OutlinedInput label="Dish Type" />}
                renderValue={selected => selected.join(", ")}
                MenuProps={MenuProps}
                onChange={handleChangeDishType}
            >
                {dishTypeLabels.map((dishTypeLabel) => (
                    <MenuItem
                        key={dishTypeLabel}
                        value={dishTypeLabel}
                        style={getStyles(dishTypeLabel, dishType, theme)}
                    >
                        <Checkbox checked={dishType.indexOf(dishTypeLabel) > -1} />
                        <ListItemText primary={dishTypeLabel} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );

    return (
        <main className="recipe-finder">
            <header className="recipe-finder-header">
                <div>
                    <div className="search-bar-container">
                        <h1>CH</h1>
                        <input
                            type="text"
                            className="search-bar"
                            placeholder="egg, bacon, onion"
                            onChange={handleChangeQuery}
                            value={query}
                        />
                        <button
                            className="search-button"
                            onClick={handleClickSearch}
                        >
                            Search
                        </button>
                    </div>
                    <Link className="login-button" to="/login">Sign In</Link>
                </div>
                <div className="search-filter-container">
                    {dietSelect}
                    {mealTypeSelect}
                    {healthMultipleSelect}
                    {cuisineTypeMultipleSelect}
                    {dishTypeMultipleSelect}
                </div>
            </header>
            
            <RecipeResult queryParams={queryParams} />
        </main>
    );
};

export default RecipeFinder;