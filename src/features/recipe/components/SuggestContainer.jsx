import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { BiRefresh } from "react-icons/bi"
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
        isError,
        refetch
    } = useGetRandomRecipesQuery(randomQuery, { skip: !randomQuery });

    const onClickRefresh = () => refetch();

    if (isSuccess) {
        const { entities, ids } = recipes;

        return (
            <div className="flex flex-col gap-5 py-10">
                <div className="flex gap-5">
                    {type === "favorites" ? (
                        <h4 className="text-red-500 font-bold text-xl">Since you like "{query.toString()}"</h4>
                    ) : (
                        <h4 className="text-red-500 font-bold text-xl">Since you have "{query.toString().replace(",", " and ")}"</h4>
                    )}
                    <button
                        className="bg-red-500 flex gap-1 justify-center items-center text-slate-50 px-3 py-1 rounded-lg hover:bg-red-700"
                        onClick={onClickRefresh}
                    >
                        Refresh
                        <BiRefresh />
                    </button>
                </div>
                <div className="flex gap-3 overflow-x-scroll">
                    {ids.map(id => (
                        <SuggestCard recipe={entities[id]} key={id} />
                    ))}
                </div>
            </div>
        );
    } else if (isLoading) {
        return (
            <div className="suggest-container__loading">
                <div className="suggest-container__header">
                    {type === "favorites" ? (
                        <h4 className="suggest-container__title">Since you like {query.toString()}</h4>
                    ) : (
                        <h4 className="suggest-container__title">Since you have {query.toString().replace(",", " and ")}</h4>
                    )}
                    <button
                        className="suggest-container__refresh-button"
                        onClick={onClickRefresh}
                    >
                        <BiRefresh /> Refresh
                    </button>
                </div>
                <div className="suggest-container__scrollable-loading">
                    <Oval
                        height={80}
                        width={80}
                        visible={true}
                        color="#60935dff"
                        secondaryColor="#60935dff"
                        strokeWidth={2}
                        strokeWidthSecondary={2}
                    />
                </div>
            </div>
        );
    } else if (isError) {
        return (
            <div className="suggest-container__error">
                <div className="suggest-container__header">
                    {type === "favorites" ? (
                        <h4 className="suggest-container__title">Since you like {query.toString()}</h4>
                    ) : (
                        <h4 className="suggest-container__title">Since you have {query.toString().replace(",", " and ")}</h4>
                    )}
                    <button
                        className="suggest-container__refresh-button"
                        onClick={onClickRefresh}
                    >
                        <BiRefresh /> Refresh
                    </button>
                </div>
                <div className="suggest-container__scrollable-error">
                    Ooops... Error occurred...
                </div>
            </div>
        );
    } else {
        return (
            <div className="suggest-container__error">
                <div className="suggest-container__header">
                    {type === "favorites" ? (
                        <h4 className="suggest-container__title">Since you like {query.toString()}</h4>
                    ) : (
                        <h4 className="suggest-container__title">Since you have {query.toString().replace(",", " and ")}</h4>
                    )}
                    <button
                        className="suggest-container__refresh-button"
                        onClick={onClickRefresh}
                    >
                        <BiRefresh /> Refresh
                    </button>
                </div>
                <div className="suggest-container__scrollable-error">
                    Ooops... Failed to load...
                </div>
            </div>
        );
    }
};

export default SuggestContainer;