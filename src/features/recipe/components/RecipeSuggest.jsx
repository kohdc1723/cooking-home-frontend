import { useGetPreferenceQuery } from "../../preference/preferenceApiSlice";
import useAuth from "../../../hooks/useAuth";
import { SuggestContainer } from "./";
import "../../../styles/css/recipe-suggest.css";

const RecipeSuggest = () => {
    const { id } = useAuth();

    const {
        data: preference,
        isLoading,
        isSuccess,
        isError
    } = useGetPreferenceQuery(id);

    if (isSuccess) {
        const { entities, ids } = preference;
        const currentPreference = entities[ids[0]];
        const favorites = currentPreference?.favorites;
        const ingredients = currentPreference?.ingredients;

        const shuffledFavorites = favorites.slice().sort(() => 0.5 - Math.random());
        const shuffledIngredients = ingredients.slice().sort(() => 0.5 - Math.random());

        return (
            <div className="recipe-suggest">
                <SuggestContainer type="favorites" query={shuffledFavorites[0]} />
                <SuggestContainer type="favorites" query={shuffledFavorites[1]} />
                <SuggestContainer type="ingredients" query={shuffledIngredients.slice(0, 2)} />
                <SuggestContainer type="ingredients" query={shuffledIngredients.slice(2, 4)} />
            </div>
        );
    } else if (isLoading) {
        return (
            <div className="recipe-suggest recipe-suggest__msg loading">
                <p>Loading...</p>
            </div>
        );
    } else if (isError) {
        return (
            <div className="recipe-suggest recipe-suggest__msg error">
                <p>Ooops... Error occurred...</p>
            </div>
        );
    } else {
        return (
            <div className="recipe-suggest recipe-suggest__msg error">
                <p>Ooops... Failed to load...</p>
            </div>
        );
    }
};

export default RecipeSuggest;