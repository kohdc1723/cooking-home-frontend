import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useTheme } from '@mui/material/styles';
import { Box, OutlinedInput, InputLabel, MenuItem, FormControl, Select, Chip } from "@mui/material";
import { RecipeSearchResult } from "./";
import { HEALTH_LABELS } from "../../../constants/labels";
import { muiStyles, MenuProps, getStyles } from "../../../styles/muiCustomStyles";

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;

// const MenuProps = {
//     PaperProps: {
//         style: {
//             maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//             width: 200
//         }
//     }
// };

// const getStyles = (health, healthLabel, theme) => {
//     return {
//         fontWeight:
//             healthLabel.indexOf(health) === -1
//                 ? theme.typography.fontWeightRegular
//                 : theme.typography.fontWeightMedium
//     };
// };

// const styles = {
//     select: {
//         ".MuiOutlinedInput-notchedOutline": {
//             borderColor: "white",
//             borderWidth: "2px"
//         },
//         "&:hover .MuiOutlinedInput-notchedOutline": {
//             borderColor: "white"
//         },
//         "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//             borderColor: "white"
//         },
//         ".MuiSvgIcon-root": {
//             color: "white"
//         }
//     },
//     inputLabel: {
//         "&.MuiInputLabel-outlined.Mui-focused": {
//             color: "white"
//         },
//         "&.MuiInputLabel-outlined": {
//             color: "white"
//         }
//     }
// };

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
    const handleChangeHealth = e => {
        const value = e.target.value;
        setHealth(typeof value === "string" ? value.split(",") : value);
    };

    return (
        <section className="recipe-search">
            <div>
                <h2 className="search-title">Search Recipes</h2>
                <p className="search-desc">Enter Ingredients and Find Recipes!</p>
            </div>

            <div className="search-container">
                <div className="search-bar-container">
                    <input
                        type="text"
                        className="search-bar"
                        value={tempInput}
                        onChange={handleChangeTempInput}
                    />
                    <button
                        onClick={handleClickSearch}
                        className="search-button"
                    >
                        <AiOutlineSearch />
                    </button>
                </div>
                <div className="filter-container">
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
                </div>
            </div>

            <RecipeSearchResult queryParams={queryParams} />
        </section>
    );
};

export default RecipeSearch;