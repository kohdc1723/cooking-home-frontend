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

const getStyles = (labelsArray, label, theme) => {
    return {
        fontWeight:
            label.indexOf(labelsArray) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium
    };
};

const muiStyles = {
    formControl: {
        flex: 1
    },
    select: {
        ".MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
            borderWidth: "2px",
            borderRadius: "28px",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "white"
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "white"
        },
        ".MuiSvgIcon-root": {
            color: "white"
        },
        ".MuiSelect-select": {
            color: "#7ac74fff",
            fontWeight: "bold"
        },
        color: "white"
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
        background: "#7ac74fff",
        fontWeight: "bold",
        color: "whitesmoke"
    },
    pagination: {
        padding: "20px",
        display: "flex",
        justifyContent: "center",
    },
    paginationItem: {
        "&.MuiButtonBase-root": {
            color: "white"
        },
        "&.MuiButtonBase-root.Mui-selected": {
            background: "gray"
        }
    }
};

export {
    muiStyles,
    MenuProps,
    getStyles
};