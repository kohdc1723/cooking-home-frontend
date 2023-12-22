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
                <div className="flex gap-5 items-center">
                    {type === "favorites" ? (
                        <h4 className="text-red-500 font-bold text-xl">Since you like<br />"{query.toString()}"</h4>
                    ) : (
                        <h4 className="text-red-500 font-bold text-xl">Since you have<br />"{query.toString().replace(",", " and ")}"</h4>
                    )}
                    <button
                        className="bg-red-500 flex gap-1 justify-center items-center text-white px-3 py-1 rounded-lg hover:bg-red-700 text-sm"
                        onClick={onClickRefresh}
                    >
                        Reload
                        <BiRefresh />
                    </button>
                </div>
                <div className="flex gap-3 overflow-x-scroll p-2">
                    {ids.map(id => (
                        <SuggestCard recipe={entities[id]} key={id} />
                    ))}
                </div>
            </div>
        );
    } else if (isLoading) {
        return (
            <div className="flex flex-col gap-5 py-10">
                <div className="flex gap-5">
                    {type === "favorites" ? (
                        <h4 className="text-red-500 font-bold text-xl">Since you like "{query.toString()}"</h4>
                    ) : (
                        <h4 className="text-red-500 font-bold text-xl">Since you have "{query.toString().replace(",", " and ")}"</h4>
                    )}
                </div>
                <div className="flex justify-center items-center p-10">
                    <Oval
                        height={60}
                        width={60}
                        visible={true}
                        color="#EF4444" // red-500
                        secondaryColor="#EF4444" // red-500
                        strokeWidth={3}
                        strokeWidthSecondary={3}
                    />
                </div>
            </div>
        );
    } else if (isError) {
        return (
            <div className="flex flex-col gap-5 py-10">
                <div className="flex gap-5">
                    {type === "favorites" ? (
                        <h4 className="text-red-500 font-bold text-xl">Since you like "{query.toString()}"</h4>
                    ) : (
                        <h4 className="text-red-500 font-bold text-xl">Since you have "{query.toString().replace(",", " and ")}"</h4>
                    )}
                </div>
                <div className="flex justify-center items-center p-10">
                    <p className="text-red-700 font-bold">Ooops... Error occurred...</p>
                </div>
            </div>
        );
    } else {
        return (
            <div className="flex flex-col gap-5 py-10">
                <div className="flex gap-5">
                    {type === "favorites" ? (
                        <h4 className="text-red-500 font-bold text-xl">Since you like "{query.toString()}"</h4>
                    ) : (
                        <h4 className="text-red-500 font-bold text-xl">Since you have "{query.toString().replace(",", " and ")}"</h4>
                    )}
                </div>
                <div className="flex justify-center items-center p-10">
                    <p className="text-red-700 font-bold">Ooops... Failed to load...</p>
                </div>
            </div>
        );
    }
};

export default SuggestContainer;