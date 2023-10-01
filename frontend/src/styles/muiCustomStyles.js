const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 200
        }
    }
};

const getStyles = (health, healthLabel, theme) => {
    return {
        fontWeight:
            healthLabel.indexOf(health) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium
    };
};

const muiStyles = {
    formControl: {
        marginTop: 3,
        width: 200
    },
    select: {
        ".MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
            borderWidth: "2px"
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "white"
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "white"
        },
        ".MuiSvgIcon-root": {
            color: "white"
        }
    },
    inputLabel: {
        "&.MuiInputLabel-outlined.Mui-focused": {
            color: "white"
        },
        "&.MuiInputLabel-outlined": {
            color: "white"
        }
    },
    box: {
        display: "flex",
        flexWrap: "wrap",
        gap: 1
    },
    chip: {
        background: "#a1cf6bff",
        fontWeight: "bold",
        color: "whitesmoke"
    }
};

export {
    muiStyles,
    MenuProps,
    getStyles
};