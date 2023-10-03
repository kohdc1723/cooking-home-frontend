import { useNavigate } from "react-router-dom";

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

    const cuisineTypeString = formatCuisineType(recipe.cuisineType);

    const handleClickCard = () => navigate(`/recipes/${recipe.id}`);

    return (
        <div className="recipe-card">
            <img src={recipe?.image} alt="recipe-image" width={300} height={168} className="recipe-image" />
            <p className="recipe-label">{recipe?.label}</p>
            <div className="recipe-type">
                <p className="cuisine-type">{cuisineTypeString}</p>
                <p className="meal-type">{recipe?.mealType}</p>
            </div>
        </div>
    );
};

export default RecipeCard;