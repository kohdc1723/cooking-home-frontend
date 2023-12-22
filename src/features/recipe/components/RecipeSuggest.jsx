import { Oval } from "react-loader-spinner";
import { BiSolidError } from "react-icons/bi";
import { useGetPreferenceQuery } from "../../preference/preferenceApiSlice";
import useAuth from "../../../hooks/useAuth";
import { SuggestContainer } from "./";

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
            <div className="pt-[72px] pb-10 flex flex-col px-5 md:px-10 lg:px-20">
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
            <div className="pt-[64px] min-h-[calc(100vh-76px)] flex flex-col gap-1 justify-center items-center text-red-700">
                <BiSolidError className="text-5xl" />
                <p className="font-bold">Ooops... Error occurred...</p>
            </div>
        );
    } else {
        return (
            <div className="pt-[64px] min-h-[calc(100vh-76px)] flex flex-col gap-1 justify-center items-center text-red-700">
                <BiSolidError className="text-5xl" />
                <p className="font-bold">Ooops... Failed to load...</p>
            </div>
        );
    }
};

export default RecipeSuggest;