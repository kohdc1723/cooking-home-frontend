import { InputLabel, MenuItem, FormControl, Select, useMediaQuery } from "@mui/material";
import { muiStyles } from "../../../styles/muiCustomStyles";

const SingleSelect = ({ label, labelsArray, value, changeHandler }) => {
    const isLarge = useMediaQuery("(min-width: 1024px)");
    const lowercaseLabel = label.toLowerCase().replace(" ", "-");

    return (
        <FormControl sx={isLarge && muiStyles.formControl}>
            <InputLabel id={`${lowercaseLabel}-label`} sx={muiStyles.inputLabel}>
                {label}
            </InputLabel>
            <Select
                sx={muiStyles.select}
                labelId={`${lowercaseLabel}-label`}
                id={`${lowercaseLabel}-single-select`}
                value={value}
                label={label}
                onChange={changeHandler}
            >
                <MenuItem value="">NONE</MenuItem>
                {labelsArray.map(label => (
                    <MenuItem key={label} value={label}>
                        {label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default SingleSelect