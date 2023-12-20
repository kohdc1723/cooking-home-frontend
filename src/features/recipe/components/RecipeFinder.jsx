import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Divider, SwipeableDrawer, useMediaQuery } from "@mui/material";
import { dietLabels, healthLabels, cuisineTypeLabels, mealTypeLabels, dishTypeLabels } from "../../../constants/labels";
import { RecipeResult, SingleSelect, MultipleSelect } from "./";
import useQueryString from "../../../hooks/useQueryString";
import { setParam, reset } from "../searchParamsSlice";
import { useDispatch } from "react-redux";
import Logo from "../../../images/logo.png";
import { IoFilterSharp, IoSearch } from "react-icons/io5";

const RecipeFinder = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const queryRef = useRef();
    const isLarge = useMediaQuery("(min-width: 1024px)");

    const searchParams = useQueryString();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [input, setInput] = useState(searchParams?.query || "");

    useEffect(() => {
        queryRef.current.focus();
    }, []);

    // event handlers
    const onClickHome = () => navigate("/");
    const onChangeInput = e => setInput(e.target.value);
    const onClickSearchButton = () => {
        if (input) {
            dispatch(setParam("query", input));
            dispatch(setParam("page", 1));
        }
    };
    const onChangeDiet = e => {
        dispatch(setParam("diet", e.target.value));
        dispatch(setParam("page", 1));
    };
    const onChangeMealType = e => {
        dispatch(setParam("mealType", e.target.value));
        dispatch(setParam("page", 1));
    };
    const onChangeHealth = e => {
        dispatch(setParam("health", e.target.value));
        dispatch(setParam("page", 1));
    }
    const onChangeCuisineType = e => {
        dispatch(setParam("cuisineType", e.target.value));
        dispatch(setParam("page", 1));
    }
    const onChangeDishType = e => {
        dispatch(setParam("dishType", e.target.value));
        dispatch(setParam("page", 1));
    }
    const onClickReset = () => dispatch(reset());

    const toggleDrawer = (open) => (event) => {
        if (event
            && event.type === 'keydown'
            && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setDrawerOpen(open);
    };

    return (
        <div className="h-screen">
            <header className="bg-white fixed top-0 w-full px-5 py-3 flex flex-col gap-3 shadow-md z-50">
                <div className="flex justify-start items-center gap-3">
                    <h1 className="hover:cursor-pointer" onClick={onClickHome}>
                        <img
                            src={Logo}
                            alt="cooking-home"
                            width={40}
                            height={40}
                        />
                    </h1>
                    <div className="flex max-w-3xl flex-1">
                        <input
                            type="text"
                            className="bg-red-50 border-2 border-red-500 border-r-0 rounded-l-lg px-3 py-2 flex-1"
                            placeholder="Search recipes by "
                            onChange={onChangeInput}
                            value={input}
                            ref={queryRef}
                        />
                        <button
                            className="bg-red-500 hover:bg-red-700 border-2 border-red-500 hover:border-red-700 text-white hover:text-white py-2 px-4 rounded-r-lg shadow-sm"
                            onClick={onClickSearchButton}
                        >
                            <IoSearch className="text-xl" />
                        </button>
                    </div>
                </div>

                <div className="">
                    {isLarge ? (
                        <div className="flex items-center gap-3 bg-white">
                            <SingleSelect
                                label="Diet"
                                labelsArray={dietLabels}
                                value={searchParams.diet}
                                changeHandler={onChangeDiet}
                            />
                            <SingleSelect
                                label="Meal Type"
                                labelsArray={mealTypeLabels}
                                value={searchParams.mealType}
                                changeHandler={onChangeMealType}
                            />
                            <Divider orientation="vertical" variant="middle" flexItem />
                            <MultipleSelect
                                label="Health"
                                labelsArray={healthLabels}
                                value={searchParams.health}
                                changeHandler={onChangeHealth}
                            />
                            <MultipleSelect
                                label="Cuisine Type"
                                labelsArray={cuisineTypeLabels}
                                value={searchParams.cuisineType}
                                changeHandler={onChangeCuisineType}
                            />
                            <MultipleSelect
                                label="Dish Type"
                                labelsArray={dishTypeLabels}
                                value={searchParams.dishType}
                                changeHandler={onChangeDishType}
                            />
                            <Divider orientation="vertical" variant="middle" flexItem />
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white py-3 px-5 rounded-lg"
                                onClick={onClickReset}
                            >
                                Clear
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center justify-end h-[56px] bg-white">
                            <button
                                onClick={toggleDrawer(true)}
                                className="flex items-center justify-center gap-3 py-3 px-5 bg-red-500 hover:bg-red-700 text-white rounded-lg"
                            >
                                <IoFilterSharp /> Filters
                            </button>
                            <SwipeableDrawer
                                anchor="right"
                                open={drawerOpen}
                                onClose={toggleDrawer(false)}
                                onOpen={toggleDrawer(true)}
                            >
                                <div
                                    className="w-60 h-full bg-white p-3 flex flex-col gap-3"
                                    onKeyDown={toggleDrawer(false)}
                                >
                                    <h6 className="font-bold text-center text-xl py-3 text-red-500">Filters</h6>
                                    <SingleSelect
                                        label="Diet"
                                        labelsArray={dietLabels}
                                        value={searchParams.diet}
                                        changeHandler={onChangeDiet}
                                    />
                                    <SingleSelect
                                        label="Meal Type"
                                        labelsArray={mealTypeLabels}
                                        value={searchParams.mealType}
                                        changeHandler={onChangeMealType}
                                    />
                                    <Divider orientation="horizontal" variant="middle" flexItem />
                                    <MultipleSelect
                                        label="Health"
                                        labelsArray={healthLabels}
                                        value={searchParams.health}
                                        changeHandler={onChangeHealth}
                                    />
                                    <MultipleSelect
                                        label="Cuisine Type"
                                        labelsArray={cuisineTypeLabels}
                                        value={searchParams.cuisineType}
                                        changeHandler={onChangeCuisineType}
                                    />
                                    <MultipleSelect
                                        label="Dish Type"
                                        labelsArray={dishTypeLabels}
                                        value={searchParams.dishType}
                                        changeHandler={onChangeDishType}
                                    />
                                    <Divider orientation="horizontal" variant="middle" flexItem />
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white py-3 px-5 rounded-lg"
                                        onClick={onClickReset}
                                    >
                                        Clear
                                    </button>
                                </div>
                            </SwipeableDrawer>
                        </div>
                    )}
                </div>
            </header>

            <RecipeResult />
        </div>
    );
};

export default RecipeFinder;