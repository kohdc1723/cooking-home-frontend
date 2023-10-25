import { useEffect, useState } from "react";
import { useUpdatePreferenceMutation } from "../preferenceApiSlice";
import { GiCancel } from "react-icons/gi";

const PreferenceSettingForm = ({ id, favorites, ingredients }) => {
    const [favorite, setFavorite] = useState("");
    const [ingredient, setIngredient] = useState("");

    const [updatePreference] = useUpdatePreferenceMutation();

    const onChangeFavorite = e => setFavorite(e.target.value);
    const onChangeIngredient = e => setIngredient(e.target.value);
    const onClickAddFavorite = async () => {
        try {
            if (favorite) {
                await updatePreference({
                    id,
                    favorites: [...favorites, favorite],
                    ingredients
                });
                setFavorite("");
            }
        } catch (err) {
            console.error(err);
        }
    };
    const onClickAddIngredient = async () => {
        try {
            if (ingredient) {
                await updatePreference({
                    id,
                    favorites,
                    ingredients: [...ingredients, ingredient]
                });
                setIngredient("");
            }
        } catch (err) {
            console.error(err);
        }
    };
    const onClickFavoriteChip = async (indexToRemove) => {
        const updatedFavorites = favorites.filter((favorite, index) => index !== indexToRemove);
        await updatePreference({
            id,
            favorites: updatedFavorites,
            ingredients
        });
    };
    const onClickIngredientChip = async (indexToRemove) => {
        const updatedIngredients = ingredients.filter((ingredient, index) => index !== indexToRemove);
        await updatePreference({
            id,
            favorites,
            ingredients: updatedIngredients
        });
    };
    
    return (
        <div className="preference-setting">
            <h2>Preference Setting</h2>
            <div className="preference-setting__favorites">
                <h4>Favorites</h4>
                <div className="preference-setting__add">
                    <input
                        className="preference-setting__input"
                        type="text"
                        autoComplete="off"
                        value={favorite}
                        onChange={onChangeFavorite}
                        placeholder="ex) pasta, burger, salad"
                    />
                    <button
                        className="preference-setting__add-button"
                        onClick={onClickAddFavorite}
                    >
                        Add
                    </button>
                </div>
                <div className="preference-setting__chip-container">
                    {favorites.map((favorite, index) => (
                        <span
                            className="preference-setting__chip"
                            key={index}
                            onClick={() => onClickFavoriteChip(index)}
                        >
                            {favorite} <GiCancel />
                        </span>
                    ))}
                </div>
            </div>
            <div className="preference-setting__ingredients">
                <h4>Ingredients</h4>
                <div className="preference-setting__add">
                    <input
                        className="preference-setting__input"
                        type="text"
                        autoComplete="off"
                        value={ingredient}
                        onChange={onChangeIngredient}
                        placeholder="ex) egg, beef, pork"
                    />
                    <button
                        className="preference-setting__add-button"
                        onClick={onClickAddIngredient}
                    >
                        Add
                    </button>
                </div>
                <div className="preference-setting__chip-container">
                    {ingredients.map((ingredient, index) => (
                        <span
                            className="preference-setting__chip"
                            key={index}
                            onClick={() => onClickIngredientChip(index)}
                        >
                            {ingredient} <GiCancel />
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PreferenceSettingForm;