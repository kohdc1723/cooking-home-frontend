import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineLink } from "react-icons/ai";
import { setParam, selectCurrentId } from "../searchParamsSlice";

const capitalizeFirstLetter = (array) => {
    return array.map(ele => ele.charAt(0).toUpperCase() + ele.slice(1));
};

const formatCuisineType = (types) => {
    const capitalizedTypes = capitalizeFirstLetter(types);
    const cuisineString = capitalizedTypes.toString().replace(",", "/");

    return cuisineString;
};

const RecipeCard = ({ recipe }) => {
    const dispatch = useDispatch();

    const cuisineTypeString = formatCuisineType(recipe.cuisineType);

    const currentId = useSelector(selectCurrentId);

    const handleClickCard = () => dispatch(setParam("currentId", recipe?.id));

    return (
        <div
            className={`p-3 flex gap-3 border hover:cursor-pointer hover:bg-slate-100 ${(recipe?.id === currentId) ? "bg-red-100" : "bg-white"}`}
            onClick={handleClickCard}
        >
            <img src={recipe?.image} alt="food" width={140} height={140} />
            <div className="flex flex-col flex-1 justify-between">
                <h6 className="text-red-500 text-lg font-bold">{recipe?.label}</h6>
                <div className="flex justify-between items-center">
                    <p>{cuisineTypeString}</p>
                    <p>{recipe?.mealType}</p>
                </div>
                <div className="flex justify-between items-center">
                    <p>{Math.floor(recipe?.calories / recipe?.yield)} kcal</p>
                    <p>{recipe?.ingredientLines?.length} ingredients</p>
                </div>
                <div className="flex items-center gap-1">
                    {"Source: "}
                    <Link to={recipe?.url} target="_blank" rel="noopener noreferrer" className="flex items-center font-bold text-orange-500 hover:text-orange-700">
                        {recipe?.source}<AiOutlineLink />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;