import { useEffect, useState } from "react";
import { useGetRandomRecipesQuery } from "../suggestApiSlice";
import { SuggestCard } from "./";

const SuggestContainer = ({ type, query }) => {
    const [randomQuery, setRandomQuery] = useState("");

    useEffect(() => {
        setRandomQuery(query.toString());
    }, []);

    const {
        data: recipes,
        isLoading,
        isSuccess,
        isError
    } = useGetRandomRecipesQuery(randomQuery, { skip: !randomQuery });

    if (isSuccess) {
        const { entities, ids } = recipes;

        return (
            <div className="suggest-container">
                {type === "favorites" ? (
                    <h4 className="suggest-container__title">Since you like {query.toString()}</h4>
                ) : (
                    <h4 className="suggest-container__title">Since you have {query.toString().replace(",", " and ")}</h4>
                )}
                <div className="suggest-container__scrollable">
                    {ids.map(id => (
                        <SuggestCard recipe={entities[id]} key={id} />
                    ))}
                </div>
            </div>
        );
    } else if (isLoading) {
        return (
            <div className="suggest-container__default">
                <p className="suggest-container__loading">Loading...</p>
            </div>
        );
    } else if (isError) {
        return (
            <div className="suggest-container__default">
                <p className="suggest-container__error">Ooops... Error occurred...</p>
            </div>
        );
    } else {
        return (
            <div className="suggest-container__default">
                <p className="suggest-container__error">Failed to load...</p>
            </div>
        );
    }
};

export default SuggestContainer;