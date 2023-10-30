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
        ".MuiSelect-select.MuiSelect-outlined.MuiSelect-multiple.MuiInputBase-input.MuiOutlinedInput-input": {
            padding: "10px 30px 10px 20px"
        },
        ".MuiSelect-select.MuiSelect-outlined.MuiInputBase-input.MuiOutlinedInput-input": {
            padding: "10px 30px 10px 20px"
        },
        ".MuiOutlinedInput-notchedOutline": {
            borderColor: "#FCFAF9",
            borderWidth: "1px",
            borderRadius: "28px",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#FCFAF9",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#FCFAF9"
        },
        ".MuiSvgIcon-root": {
            color: "#FCFAF9"
        },
        ".MuiSelect-select": {
            color: "#423E3B",
            fontSize: "small"
        },
        color: "#FCFAF9",
    },
    inputLabel: {
        "&.MuiInputLabel-outlined.Mui-focused": {
            color: "#FCFAF9"
        },
        "&.MuiInputLabel-outlined": {
            color: "#FCFAF9"
        },
        "&.MuiFormLabel-root.MuiInputLabel-root": {
            fontSize: "small",
            left: "5px",
            top: "-3px"
        }
    },
    box: {
        display: "flex",
        flexWrap: "wrap",
        gap: 1
    },
    pagination: {
        ".MuiPaginationItem-root": { color: "#FCFAF9" },
        ".MuiButtonBase-root": { color: "#232020", background: "#FCFAF9" },
        ".MuiPaginationItem-previousNext": { background: "#FCFAF9" },
        ".MuiPaginationItem-text": { color: "#232020" },
        "&.MuiPagination-root .Mui-selected": { background: "#60935dff" },
        ".MuiButtonBase-root.MuiPaginationItem-root:hover": { background: "#a1cf6bff" },
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        color: "#FCFAF9"
    }
};

export {
    muiStyles,
    MenuProps,
    getStyles
};