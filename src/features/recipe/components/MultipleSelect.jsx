import { OutlinedInput, InputLabel, MenuItem, FormControl, ListItemText, Select, Checkbox, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { muiStyles, MenuProps, getStyles } from "../../../styles/muiCustomStyles";

const MultipleSelect = ({ label, labelsArray, value, changeHandler }) => {
    const isLarge = useMediaQuery("(min-width: 1024px)");
    const theme = useTheme();
    const lowercaseLabel = label.toLowerCase().replace(" ", "-");

    return (
        <FormControl sx={isLarge && muiStyles.formControl}>
            <InputLabel id={`${lowercaseLabel}-label`} sx={muiStyles.inputLabel}>
                {label}
            </InputLabel>
            <Select
                sx={muiStyles.select}
                labelId={`${label}-label`}
                id={`${label}-multiple-select`}
                multiple
                value={value}
                input={<OutlinedInput label={label} />}
                renderValue={selected => selected.join(", ")}
                MenuProps={MenuProps}
                onChange={changeHandler}
            >
                {labelsArray.map(label => (
                    <MenuItem
                        key={label}
                        value={label}
                        style={getStyles(label, value, theme)}
                    >
                        <Checkbox checked={value.indexOf(label) > -1} />
                        <ListItemText primary={label} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default MultipleSelect;