import { Oval } from "react-loader-spinner";
import { useGetPreferenceQuery } from "../../preference/preferenceApiSlice";
import useAuth from "../../../hooks/useAuth";
import { SuggestContainer } from "./";
// import "../../../styles/css/recipe-suggest.css";

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
            <div className="pt-[72px] pb-10 flex flex-col gap-10 px-5 md:px-10 lg:px-20">
                <SuggestContainer type="favorites" query={shuffledFavorites[0]} />
                <SuggestContainer type="favorites" query={shuffledFavorites[1]} />
                <SuggestContainer type="ingredients" query={shuffledIngredients.slice(0, 2)} />
                <SuggestContainer type="ingredients" query={shuffledIngredients.slice(2, 4)} />
            </div>
        );
    } else if (isLoading) {
        return (
            <div className="pt-[72px] min-h-[calc(100vh-72px)] flex justify-center items-center">
                <Oval
                    height={60}
                    width={60}
                    visible={true}
                    color="#EF4444"
                    secondaryColor="#EF4444"
                    strokeWidth={3}
                    strokeWidthSecondary={3}
                />
            </div>
        );
    } else if (isError) {
        return (
            <div className="pt-[72px] min-h-[calc(100vh-72px)] flex justify-center items-center">
                <p className="text-red-700 font-bold">Ooops... Error occurred...</p>
            </div>
        );
    } else {
        return (
            <div className="pt-[72px] min-h-[calc(100vh-72px)] flex justify-center items-center">
                <p className="text-red-700 font-bold">Ooops... Failed to load...</p>
            </div>
        );
    }
};

export default RecipeSuggest;