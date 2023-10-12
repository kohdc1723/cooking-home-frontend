import { Link } from "react-router-dom";
import { AiOutlineLink } from "react-icons/ai";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RecipeDetail = ({ recipe }) => {
    if (recipe) {
        const {
            image,
            label,
            cuisineType,
            mealType,
            dishType,
            calories,
            yield: serving,
            ingredientLines,
            cautions,
            source,
            url,
            healthLabels,
            dietLabels
        } = recipe;

        return (
            <div className="recipe-detail">
                <div className="recipe-detail__row">
                    <img src={image} alt="food" width={300} height={300} />
                    <div className="recipe-detail__col">
                        <h1>{label}</h1>

                        <h6>Cuisine Type</h6>
                        <p>{cuisineType}</p>

                        <h6>Meal Type</h6>
                        <p>{mealType}</p>

                        <h6>Dish Type</h6>
                        <p>{dishType}</p>

                        <h6>Calorie</h6>
                        <p>{Math.floor(calories / serving)} kcal/serving</p>

                        <h6>Recipe Source</h6>
                        <Link to={url} target="_blank" rel="noopener noreferrer">
                            {source}
                            <AiOutlineLink />
                        </Link>
                    </div>
                </div>
                <div className="recipe-detail__row">
                    <div className="recipe-detail__col">
                        <h2>Ingredients</h2>
                        {ingredientLines.map(line => (
                            <p key={line}>
                                <FontAwesomeIcon icon={faCheck} color="#e0c879ff" /> {line}
                            </p>
                        ))}
                    </div>
                    <div className="recipe-detail__col">
                        <h2>Cautions</h2>
                        {cautions?.length ? (
                            cautions.map(caution => (
                                <p key={caution}>
                                    <FontAwesomeIcon icon={faCheck} color="#F95738" /> {caution}
                                </p>
                            ))
                        ) : (
                            <p>No cautions</p>
                        )}
                    </div>
                </div>
                <div className="recipe-detail__row">
                    <div className="recipe-detail__col">
                        <h2>Health Label</h2>
                        <div className="recipe-detail__chip-container">
                            {healthLabels.map(health => (
                                <div key={health} className="recipe-detail__chip">{health}</div>
                            ))}
                        </div>
                    </div>
                    <div className="recipe-detail__col">
                        <h2>Diet Label</h2>
                        <div className="recipe-detail__chip-container">
                            {dietLabels.map(diet => (
                                <div key={diet} className="recipe-detail__chip">
                                    {diet}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="recipe-detail__no-recipe">
                Recipe not selected
            </div>
        );
    }
};

export default RecipeDetail;