import { Link, useNavigate, useLocation } from "react-router-dom";

const capitalizeFirstLetter = (array) => {
    return array.map(ele => ele.charAt(0).toUpperCase() + ele.slice(1));
};

const formatCuisineType = (types) => {
    const capitalizedTypes = capitalizeFirstLetter(types);
    const cuisineString = capitalizedTypes.toString().replace(",", "/");

    return cuisineString;
};

const RecipeCard = ({ recipe }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const cuisineTypeString = formatCuisineType(recipe.cuisineType);

    const handleClickCard = () => {
        const queryParams = new URLSearchParams(location.search);
        queryParams.set("currentId", recipe?.id);
        navigate(`?${queryParams.toString()}`);
    };

    const isFocused = () => recipe?.id === queryParams.get("currentId");

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
                        {recipe?.source}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;