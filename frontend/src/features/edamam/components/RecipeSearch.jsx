import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useTheme } from '@mui/material/styles';
import { Box, OutlinedInput, InputLabel, MenuItem, FormControl, Select, Chip } from "@mui/material";
import { RecipeSearchResult } from "./";
import { CUISINE_TYPE_LABELS, DIET_LABELS, DISH_TYPE_LABELS, HEALTH_LABELS, MEAL_TYPE_LABELS } from "../../../constants/labels";
import { muiStyles, MenuProps, getStyles } from "../../../styles/muiCustomStyles";

const RecipeSearch = () => {
    const theme = useTheme();

    // states
    const [tempInput, setTempInput] = useState("");
    const [query, setQuery] = useState("");
    const [from, setFrom] = useState(0);
    const [to, setTo] = useState(10);
    const [diet, setDiet] = useState("");
    const [health, setHealth] = useState([]);
    const [cuisineType, setCuisineType] = useState([]);
    const [mealType, setMealType] = useState("");
    const [dishType, setDishType] = useState([]);
    const queryParams = { query, from, to, diet, health, cuisineType, mealType, dishType };

    // handlers
    const handleClickSearch = () => setQuery(tempInput);
    const handleChangeTempInput = e => setTempInput(e.target.value);
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
    }

    const dietSelect = (
        <FormControl sx={muiStyles.singleSelectFormControl}>
            <InputLabel id="diet-label" sx={muiStyles.inputLabel}>Diet</InputLabel>
            <Select
                sx={muiStyles.select}
                labelId="diet-label"
                id="diet-single-select"
                value={diet}
                label="Diet"
                onChange={handleChangeDiet}
            >
                <MenuItem value="">NONE</MenuItem>
                {DIET_LABELS.map(dietLabel => (
                    <MenuItem key={dietLabel} value={dietLabel}>
                        {dietLabel}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );

    const mealTypeSelect = (
        <FormControl sx={muiStyles.singleSelectFormControl}>
            <InputLabel id="meal-type-label" sx={muiStyles.inputLabel}>Meal Type</InputLabel>
            <Select
                sx={muiStyles.select}
                labelId="meal-type-label"
                id="meal-type-single-select"
                value={mealType}
                label="Meal Type"
                onChange={handleChangeMealType}
            >
                <MenuItem value="">NONE</MenuItem>
                {MEAL_TYPE_LABELS.map(mealTypeLabel => (
                    <MenuItem key={mealTypeLabel} value={mealTypeLabel}>
                        {mealTypeLabel}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );

    const healthSelect = (
        <FormControl sx={muiStyles.formControl}>
            <InputLabel id="health-label" sx={muiStyles.inputLabel}>Health</InputLabel>
            <Select
                sx={muiStyles.select}
                labelId="health-label"
                id="health-multiple-select"
                multiple
                value={health}
                onChange={handleChangeHealth}
                input={<OutlinedInput id="select-multiple-health" label="Health" />}
                renderValue={(selected) => (
                    <Box sx={muiStyles.box}>
                        {selected.map(value => (
                            <Chip key={value} label={value} sx={muiStyles.chip} />
                        ))}
                    </Box>
                )}
                MenuProps={MenuProps}
            >
                {HEALTH_LABELS.map(healthLabel => (
                    <MenuItem
                        key={healthLabel}
                        value={healthLabel}
                        style={getStyles(healthLabel, health, theme)}
                    >
                        {healthLabel}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );

    const cuisineTypeSelect = (
        <FormControl sx={muiStyles.formControl}>
            <InputLabel id="cuisine-type-label" sx={muiStyles.inputLabel}>Cuisine Type</InputLabel>
            <Select
                sx={muiStyles.select}
                labelId="cuisine-type-label"
                id="cuisine-type-multiple-select"
                multiple
                value={cuisineType}
                onChange={handleChangeCuisineType}
                input={<OutlinedInput id="select-multiple-cuisine-type" label="Cuisine Type" />}
                renderValue={(selected) => (
                    <Box sx={muiStyles.box}>
                        {selected.map(value => (
                            <Chip key={value} label={value} sx={muiStyles.chip} />
                        ))}
                    </Box>
                )}
                MenuProps={MenuProps}
            >
                {CUISINE_TYPE_LABELS.map(cuisineTypeLabel => (
                    <MenuItem
                        key={cuisineTypeLabel}
                        value={cuisineTypeLabel}
                        style={getStyles(cuisineTypeLabel, cuisineType, theme)}
                    >
                        {cuisineTypeLabel}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );

    const dishTypeSelect = (
        <FormControl sx={muiStyles.formControl}>
            <InputLabel id="dish-type-label" sx={muiStyles.inputLabel}>Dish Type</InputLabel>
            <Select
                sx={muiStyles.select}
                labelId="dish-type-label"
                id="dish-type-multiple-select"
                multiple
                value={dishType}
                onChange={handleChangeDishType}
                input={<OutlinedInput id="select-multiple-dish-type" label="Dish Type" />}
                renderValue={(selected) => (
                    <Box sx={muiStyles.box}>
                        {selected.map(value => (
                            <Chip key={value} label={value} sx={muiStyles.chip} />
                        ))}
                    </Box>
                )}
                MenuProps={MenuProps}
            >
                {DISH_TYPE_LABELS.map(dishTypeLabel => (
                    <MenuItem
                        key={dishTypeLabel}
                        value={dishTypeLabel}
                        style={getStyles(dishTypeLabel, dishType, theme)}
                    >
                        {dishTypeLabel}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );

    return (
        <section className="recipe-search">
            <div className="search-bg">
                <div className="search-container">
                    <div className="search-title">
                        <h2>RECIPE FINDER</h2>
                        <p>Enter Ingredients and Find Recipes here!</p>
                    </div>
                    <div className="search-bar-container">
                        <input
                            type="text"
                            className="search-bar"
                            value={tempInput}
                            onChange={handleChangeTempInput}
                            placeholder="egg, bacon, onion"
                        />
                        <button
                            onClick={handleClickSearch}
                            className="search-button"
                        >
                            Search
                        </button>
                    </div>
                    <div className="filter-container">
                        <div className="single-select-group">
                            {dietSelect}
                            {mealTypeSelect}
                        </div>

                        {healthSelect}
                        {cuisineTypeSelect}
                        {dishTypeSelect}
                    </div>
                </div>
            </div>

            <RecipeSearchResult queryParams={queryParams} />
        </section>
    );
};

export default RecipeSearch;