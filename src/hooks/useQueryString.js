import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentSearchParams, setParams } from "../features/recipe/searchParamsSlice";

const useQueryString = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const extractParamsFromQueryString = () => {
        const searchParams = new URLSearchParams(location.search);

        return {
            query: searchParams.get("query") || "",
            currentId: searchParams.get("currentId") || "",
            page: searchParams.get("page") || 1,
            diet: searchParams.get("diet") || "",
            mealType: searchParams.get("mealType") || "",
            health: searchParams.getAll("health") || [],
            cuisineType: searchParams.getAll("cuisineType") || [],
            dishType: searchParams.getAll("dishType") || []
        };
    };

    const createQueryString = (searchParams) => {
        const oldSearchParams = { ...searchParams };
        const newSearchParams = new URLSearchParams();

        if (!oldSearchParams.query) {
            oldSearchParams.page = "";
            oldSearchParams.currentId = "";
        }

        for (let key in oldSearchParams) {
            if (Array.isArray(oldSearchParams[key])) {
                newSearchParams.delete(key);
                if (oldSearchParams[key].length > 0) {
                    oldSearchParams[key].forEach(value => newSearchParams.append(key, value));
                }
            } else {
                if (oldSearchParams[key]) {
                    newSearchParams.set(key, oldSearchParams[key]);
                } else {
                    newSearchParams.delete(key);
                }
            }
        }

        return newSearchParams.toString();
    };

    const searchParams = useSelector(selectCurrentSearchParams);

    useEffect(() => {
        dispatch(setParams(extractParamsFromQueryString()));
    }, [location.search]);

    useEffect(() => {
        const oldQueryString = new URLSearchParams(location.search).toString();
        const newQueryString = createQueryString(searchParams);

        if (oldQueryString !== newQueryString) {
            navigate(`?${newQueryString}`);
        }
    }, [searchParams]);

    return searchParams;
};

export default useQueryString;