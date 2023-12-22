const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: "fit-content",
            fontFamily: "'Ubuntu', sans-serif",
            background: "white"
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
            borderColor: "#EF4444",
            borderWidth: "2px",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#EF4444",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#EF4444"
        },
        ".MuiSvgIcon-root": {
            color: "#EF4444"
        },
        ".MuiSelect-select": {
            color: "#EF4444",
        },
        color: "#EF4444",
        background: "white",
        // flex: 1,
        // minWidth: "160px",
    },
    inputLabel: {
        "&.MuiInputLabel-outlined.Mui-focused": {
            color: "#EF4444"
        },
        "&.MuiInputLabel-outlined": {
            color: "#EF4444"
        },
        fontFamily: "'Ubuntu', sans-serif",
    },
    box: {
        display: "flex",
        flexWrap: "wrap",
        gap: 1
    },
    pagination: {
        ".MuiButtonBase-root": { background: "white" },
        ".MuiPaginationItem-previousNext": { background: "white" },
        ".MuiPaginationItem-text": { color: "black" },
        "&.MuiPagination-root .Mui-selected": { background: "#EF4444" },
        ".MuiButtonBase-root.MuiPaginationItem-root:hover": { background: "#FCA5A5" },
        padding: "10px",
        display: "flex",
        justifyContent: "center",
        color: "#FCFAF9",
        background: "white",
        fontFamily: "'Ubuntu', sans-serif",
    }
};

export {
    muiStyles,
    MenuProps,
    getStyles
};