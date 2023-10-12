import { useEffect, useState } from "react";
import { useGetRandomRecipesQuery } from "../../recipe/suggestApiSlice";

const ingredients = ["beef", "garlic", "tomato", "potato", "onion", "egg", "cheese", "carrot", "chicken", "shrimp"];

const getRandomTwo = (array) => {
    const randomlySortedArray = array.slice().sort(() => 0.5 - Math.random());
    return randomlySortedArray.slice(0, 2).toString();
};

const RecipeSuggest = () => {
    const [randomQuery, setRandomQuery] = useState("");

    const {
        data: recipes,
        isLoading,
        isSuccess,
        isError
    } = useGetRandomRecipesQuery(randomQuery, { skip: !randomQuery });

    useEffect(() => {
        setRandomQuery(getRandomTwo(ingredients));
    }, []);

    if (isLoading) {
        return <p>Loading...</p>;
    } else if (isError) {
        return <p>Error...</p>;
    } else if (isSuccess) {
        const { ids, entities } = recipes;

        return (
            <section>
                <h2>Since you have {randomQuery}</h2>
                {ids.map(id => (
                    <div>{`${entities[id].label}`}</div>
                ))}
            </section>
        );
    } else {
        return (
            <div>RecipeSuggest</div>
        );
    }
};

export default RecipeSuggest;