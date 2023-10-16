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

    const isFocused = () => recipe?.id === currentId;

    return (
        <div className={`recipe-card ${isFocused() && "recipe-card__focused"}`} onClick={handleClickCard}>
            <img src={recipe?.image} alt="food" width={160} height={160} />
            <div className="recipe-card__desc">
                <h6>{recipe?.label}</h6>
                <div className="recipe-card__desc-row">
                    <p>{cuisineTypeString}</p>
                    <p>{recipe?.mealType}</p>
                </div>
                <div className="recipe-card__desc-row">
                    <p>{Math.floor(recipe?.calories / recipe?.yield)} kcal</p>
                    <p>{recipe?.ingredientLines?.length} ingredients</p>
                </div>
                <div>
                    {"Source: "}
                    <Link to={recipe?.url} target="_blank" rel="noopener noreferrer">
                        {recipe?.source}<AiOutlineLink />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;