import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Oval } from "react-loader-spinner";
import { Pagination, SwipeableDrawer, useMediaQuery } from "@mui/material";
import { IoArrowBack } from "react-icons/io5";
import { TbDatabaseSearch, TbError404 } from "react-icons/tb";
import { BiSolidError } from "react-icons/bi";
import { useGetRecipesQuery } from "../searchApiSlice";
import { RecipeCard, RecipeDetail } from "./";
import { muiStyles } from "../../../styles/muiCustomStyles";
import { setParam } from "../searchParamsSlice";

const RecipeResult = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const isLarge = useMediaQuery("(min-width: 1024px)");

    const [detailDrawerOpen, setDetailDrawerOpen] = useState(false);

    const searchParams = new URLSearchParams(location.search);
    const currentId = searchParams.get("currentId");

    const queryStringWithoutCurrentId = useMemo(() => {
        const params = new URLSearchParams(location.search);
        params.delete("currentId");
        return params.toString();
    }, [location.search]);
    
    const {
        data: recipes,
        isLoading,
        isSuccess,
        isError
    } = useGetRecipesQuery(queryStringWithoutCurrentId, {
        skip: !searchParams.has("query")
    });

    useEffect(() => {
        if (isSuccess) {
            const { ids } = recipes;

            if (!currentId || !ids.includes(currentId)) {
                dispatch(setParam("currentId", ids[0]));
            }
        }
    }, [recipes]);

    const onChangePage = (event, value) => dispatch(setParam("page", value));

    const toggleDetailDrawer = (open) => (event) => {
        if (event
            && event.type === 'keydown'
            && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setDetailDrawerOpen(open);
    };

    if (isSuccess) {
        const { ids, entities, count } = recipes;

        const totalPage = Math.ceil(count / 10);
        const page = Number(searchParams.get("page"));
        const from = (page - 1) * 10 + 1;
        const to = Math.min(page * 10, count);

        return (
            <div className="h-screen pt-[136px] lg:px-20 flex flex-1 justify-center bg-slate-100">
                {ids?.length ? (
                    <div className="flex shadow-lg flex-1">
                        <div className="flex flex-col flex-1">
                            <div className="bg-red-300 p-3 text-sm">
                                {ids?.length ? (`${count} results (${from} - ${to})`) : ""}
                            </div>
                            <div className="overflow-y-scroll">
                                {ids?.map(id => (
                                    <div key={id} onClick={toggleDetailDrawer(true)}>
                                        <RecipeCard recipe={entities[id]} />
                                    </div>
                                ))}
                                <Pagination
                                    sx={muiStyles.pagination}
                                    count={totalPage}
                                    page={page}
                                    onChange={onChangePage}
                                />
                            </div>
                        </div>
                        {isLarge ? (
                            <div className="flex-1 overflow-y-scroll">
                                <RecipeDetail recipe={entities[currentId]} />
                            </div>
                        ) : (
                            <SwipeableDrawer
                                anchor="bottom"
                                open={detailDrawerOpen}
                                onClose={toggleDetailDrawer(false)}
                                onOpen={toggleDetailDrawer(true)}
                            >
                                <div className="flex flex-col h-[90vh]">
                                    <div className="p-5">
                                        <button
                                            onClick={toggleDetailDrawer(false)}
                                            className="text-2xl hover:text-red-500"
                                        >
                                            <IoArrowBack />
                                        </button>
                                    </div>
                                    <RecipeDetail recipe={entities[currentId]} />
                                </div>
                            </SwipeableDrawer>
                        )}
                    </div>
                ) : (
                    <div className="flex justify-center items-center">
                        <p className="flex flex-col justify-center items-center gap-1 font-bold text-red-700">
                            <TbError404 className="text-5xl" />
                            Ooops... Recipe not found...
                        </p>
                    </div>
                )}
            </div>
        );
    } else if (isLoading) {
        return (
            <div className="pt-[136px] min-h-screen flex justify-center items-center flex-1">
                <Oval
                    height={60}
                    width={60}
                    visible={true}
                    color="#EF4444" // red-500
                    secondaryColor="#EF4444" // red-500
                    strokeWidth={3}
                    strokeWidthSecondary={3}
                />
            </div>
        );
    } else if (isError) {
        return (
            <div className="pt-[136px] min-h-screen flex justify-center items-center flex-1">
                <p className="flex flex-col justify-center items-center gap-1 font-bold text-red-700">
                    <BiSolidError className="text-5xl" />
                    Ooops... there is an error...
                </p>
            </div>
        );
    } else {
        return (
            <div className="pt-[136px] min-h-screen flex flex-col justify-center items-center flex-1 bg-white bg-no-repeat bg-cover">
                <p className="flex flex-col justify-center items-center text-red-500 gap-1 font-bold break-words">
                    <TbDatabaseSearch className="text-5xl" />
                    Search recipes by food names or ingredients</p>
            </div>
        );
    }
};

export default RecipeResult;